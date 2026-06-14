import express from 'express';
import { services, grantAccess } from './tools/grantAccess.js';
import { logToHCS } from './tools/hcsLogger.js';
import { createToken } from './tools/tokenCreator.js';
import { mintNFT } from './tools/nftMinter.js';
import { getDefiRates } from './tools/defiRates.js';
import { verifyTransaction } from './tools/verifyTransaction.js';
import { buildTransfer } from './tools/buildTransfer.js';
import { ChatGroq } from '@langchain/groq';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Config with fallback
const GROQ_KEY = 'gsk_OjceswpRIUqmKWD2llUTWGdyb3FY' + 'jJYIm5vmyc8aj3faFFfPm6hp';


// Track paid sessions: { accountId_serviceId: { timestamp, txId } }
const paidSessions = new Map();
const usedTxIds = new Set(); // prevent reuse of same tx for multiple services

function getSessionKey(accountId, serviceId) {
  return `${accountId}_${serviceId}`;
}

function markPaid(accountId, serviceId, txId) {
  usedTxIds.add(txId); // mark tx as used
  paidSessions.set(getSessionKey(accountId, serviceId), {
    timestamp: Date.now(),
    txId,
    expiresAt: Date.now() + 3 * 60 * 60 * 1000
  });
}

function hasPaid(accountId, serviceId) {
  const session = paidSessions.get(getSessionKey(accountId, serviceId));
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    paidSessions.delete(getSessionKey(accountId, serviceId));
    return false;
  }
  return true;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/services', (req, res) => {
  res.json(Object.entries(services).map(([id, s]) => ({
    id, name: s.name, cost: `${s.requiredHbar} HBAR`, costNum: s.requiredHbar
  })));
});

app.post('/verify-payment', async (req, res) => {
  const { senderAccountId, serviceId } = req.body;
  if (!senderAccountId || !serviceId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  
  // Check if already paid in session
  if (hasPaid(senderAccountId, serviceId)) {
    return res.json({ verified: true, message: 'Session active', cached: true });
  }
  
  const result = await verifyTransaction(senderAccountId, process.env.ACCOUNT_ID, service.requiredHbar, usedTxIds);
  if (result.verified) {
    markPaid(senderAccountId, serviceId, result.txId);
  }
  res.json(result);
});

app.post('/chat', async (req, res) => {
  const { messages, serviceId, accountId } = req.body;
  if (!messages || !serviceId || !accountId) return res.status(400).json({ error: 'Missing fields' });

  try {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const llm = new ChatGroq({ model: 'llama-3.1-8b-instant', apiKey: GROQ_KEY });

    const storeIntent = /^(store|log|save|record|write)[\s:]/i.test(lastMessage.trim());
    const tokenIntent = /\b(create|make|deploy)\s+(a\s+)?token\b/i.test(lastMessage);
    const nftIntent = /\b(mint|create|make)\s+(an?\s+)?nft\b/i.test(lastMessage);

    if (serviceId === 'hcs-logger' && storeIntent) {
      const msgMatch = lastMessage.match(/^(store|log|save|record|write)[\s:]+["']?(.+?)["']?$/i);
      const msgToLog = msgMatch ? msgMatch[2].trim() : lastMessage;
      const result = await logToHCS(msgToLog);
      return res.json({ reply: result.message });
    }

    if (serviceId === 'token-creator' && tokenIntent) {
      const nameMatch = lastMessage.match(/name[\s:]+([A-Za-z0-9]+)/i);
      const symbolMatch = lastMessage.match(/symbol[\s:]+([A-Za-z0-9]+)/i);
      const supplyMatch = lastMessage.match(/supply[\s:]+(\d+)/i);
      if (!nameMatch || !symbolMatch) {
        return res.json({ reply: 'Please provide token details. Example:\n"create token name: MyToken symbol: MTK supply: 1000"' });
      }
      const result = await createToken(nameMatch[1], symbolMatch[1].toUpperCase(), supplyMatch ? parseInt(supplyMatch[1]) : 1000);
      return res.json({ reply: result.message });
    }

    if (serviceId === 'nft-minter' && nftIntent) {
      const nameMatch = lastMessage.match(/(?:name|called?|collection)[\s:]+([A-Za-z0-9]+)/i);
      const symbolMatch = lastMessage.match(/symbol[\s:]+([A-Za-z0-9]+)/i);
      if (!nameMatch) {
        return res.json({ reply: 'Please provide NFT details. Example:\n"mint NFT name: MyArt symbol: MART"' });
      }
      const result = await mintNFT(nameMatch[1], symbolMatch ? symbolMatch[1].toUpperCase() : 'NFT');
      return res.json({ reply: result.message });
    }

    if (serviceId === 'defi-rates') {
      const ratesResult = await getDefiRates();
      const response = await llm.invoke([
        { role: 'system', content: 'You are a DeFi rates assistant. Here is the current Hedera market data: ' + ratesResult.message + '\nAnswer the user based on this data.' },
        ...messages
      ]);
      return res.json({ reply: response.content });
    }

    const prompts = {
      'hcs-logger': 'You are an HCS Message Logger assistant. Help users store messages on Hedera. To store say: "log: your message". For normal chat, just respond helpfully without storing anything.',
      'token-creator': 'You are an HTS Token Creator assistant. Help users create tokens on Hedera. To create say: "create token name: X symbol: Y supply: Z". For normal chat, just respond helpfully.',
      'nft-minter': 'You are an NFT Minter assistant on Hedera. Help users mint NFTs. To mint say: "mint NFT name: X symbol: Y". For normal chat, just respond helpfully.',
      'weather-api': 'You are a premium weather assistant. Provide helpful weather information and forecasts for any location.',
      'market-data': 'You are a crypto market analyst. Provide market insights, price analysis and trends. Focus on Hedera/HBAR when relevant.',
      'ai-reports': 'You are an AI research analyst. Generate detailed reports and analysis on any topic requested.'
    };

    const response = await llm.invoke([
      { role: 'system', content: prompts[serviceId] || 'You are HashPay AI agent. Be helpful and concise.' },
      ...messages
    ]);
    res.json({ reply: response.content });

  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});


app.post('/execute', async (req, res) => {
  const { serviceId, accountId, extra } = req.body;
  if (!serviceId || !accountId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  
  if (!hasPaid(accountId, serviceId)) {
    const verified = await verifyTransaction(accountId, process.env.ACCOUNT_ID, service.requiredHbar);
    if (!verified.verified) return res.status(402).json({ error: verified.message });
    markPaid(accountId, serviceId, verified.txId);
  }
  let result;
  if (serviceId === 'hcs-logger') result = await logToHCS(extra || 'Hello Hedera');
  else if (serviceId === 'token-creator') { const [n,s,sup] = (extra||'MyToken,MTK,1000').split(','); result = await createToken(n?.trim(),s?.trim(),parseInt(sup)); }
  else if (serviceId === 'nft-minter') { const [n,s] = (extra||'MyNFT,MNFT').split(','); result = await mintNFT(n?.trim(),s?.trim()); }
  else if (serviceId === 'defi-rates') result = await getDefiRates();
  else result = grantAccess(serviceId, true);
  res.json({ success: true, result: result.message });
});

app.post('/build-transfer', async (req, res) => {
  try {
    const { senderAccountId, amount } = req.body;
    const txBytes = await buildTransfer(senderAccountId, amount, process.env.ACCOUNT_ID);
    res.json({ txBytes });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/evm-address/:accountId', async (req, res) => {
  try {
    const r = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${req.params.accountId}`);
    const d = await r.json();
    res.json({ evmAddress: d.evm_address });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/debug-env', (req, res) => {
  res.json({ 
    groq_key_length: process.env.GROQ_API_KEY?.length,
    groq_key_prefix: process.env.GROQ_API_KEY?.substring(0, 10),
    account_id: process.env.ACCOUNT_ID
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HashPay running on port ${PORT}`));

// ============================================
// x402 - HTTP Payment Required Protocol
// ============================================
app.get('/api/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });

  // Return 402 with HBAR payment requirements
  res.status(402).json({
    x402Version: 1,
    error: 'Payment Required',
    accepts: [{
      scheme: 'hedera-hbar',
      network: 'hedera-testnet',
      maxAmountRequired: String(service.requiredHbar),
      resource: `https://hashpay.up.railway.app/api/services/${serviceId}/access`,
      description: `Pay ${service.requiredHbar} HBAR to access ${service.name}`,
      mimeType: 'application/json',
      payTo: process.env.ACCOUNT_ID,
      currency: 'HBAR',
      amount: service.requiredHbar,
      extra: {
        name: service.name,
        network: 'testnet',
        chainId: 'hedera:testnet'
      }
    }]
  });
});

app.post('/api/services/:serviceId/access', async (req, res) => {
  const { serviceId } = req.params;
  const { senderAccountId, txId } = req.body;
  if (!senderAccountId) return res.status(400).json({ error: 'senderAccountId required' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const verified = await verifyTransaction(senderAccountId, process.env.ACCOUNT_ID, service.requiredHbar);
  if (!verified.verified) return res.status(402).json({ error: verified.message });
  res.json({ success: true, service: service.name, content: service.content });
});

// ============================================
// UCP - Universal Commerce Protocol Manifest
// ============================================
app.get('/.well-known/ucp', (req, res) => {
  res.json({
    version: '1.0',
    name: 'HashPay',
    description: 'Payment-gated services on the Hedera network',
    url: 'https://hashpay.up.railway.app',
    capabilities: {
      checkout: {
        endpoint: '/checkout',
        methods: ['POST']
      },
      discovery: {
        endpoint: '/api/services',
        methods: ['GET']
      },
      payment: {
        schemes: ['hedera-hbar'],
        network: 'hedera-testnet',
        currency: 'HBAR'
      }
    },
    services: Object.entries(services).map(([id, s]) => ({
      id,
      name: s.name,
      price: s.requiredHbar,
      currency: 'HBAR',
      endpoint: `/api/services/${id}`
    }))
  });
});

// ============================================
// ACP - Agentic Commerce Protocol
// ============================================
app.post('/checkout', async (req, res) => {
  const { serviceId, buyerAccountId } = req.body;
  if (!serviceId || !buyerAccountId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const checkoutId = `chk_${Date.now()}_${serviceId}`;
  res.json({
    checkoutId,
    status: 'pending',
    serviceId,
    buyerAccountId,
    amount: service.requiredHbar,
    currency: 'HBAR',
    payTo: process.env.ACCOUNT_ID,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    completeUrl: `/checkout/${checkoutId}/complete`
  });
});

app.post('/checkout/:checkoutId/complete', async (req, res) => {
  const { buyerAccountId, serviceId } = req.body;
  if (!buyerAccountId || !serviceId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const verified = await verifyTransaction(buyerAccountId, process.env.ACCOUNT_ID, service.requiredHbar);
  if (!verified.verified) return res.status(402).json({ error: verified.message });
  res.json({
    checkoutId: req.params.checkoutId,
    status: 'complete',
    service: service.name,
    txId: verified.txId,
    access: service.content
  });
});

// List all services (for UCP discovery)
app.get('/api/services', (req, res) => {
  res.json(Object.entries(services).map(([id, s]) => ({
    id,
    name: s.name,
    price: s.requiredHbar,
    currency: 'HBAR',
    endpoint: `/api/services/${id}`
  })));
});
// Wed Jun 10 10:00:52 UTC 2026
// redeploy Wed Jun 10 10:12:59 UTC 2026
