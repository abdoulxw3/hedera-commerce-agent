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
  
  // Verify payment from Mirror Node (handles server restarts)
  if (!hasPaid(accountId, serviceId)) {
    const service_check = services[serviceId];
    const check = await verifyTransaction(accountId, process.env.ACCOUNT_ID, service_check.requiredHbar, usedTxIds);
    if (!check.verified) return res.status(402).json({ error: 'Payment required for ' + service_check.name });
    markPaid(accountId, serviceId, check.txId);
  }
  
  try {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const hederaServices = ['hcs-logger', 'token-creator', 'nft-minter'];
    
    if (hederaServices.includes(serviceId)) {
      // Use Hedera Agent Kit for on-chain services
      const { runHederaAgent } = await import('./tools/hederaAgent.js');
      const reply = await runHederaAgent(lastMessage, accountId || '1');
      res.json({ reply });
    } else {
      // Use Groq for data/info services
      const llm = new ChatGroq({ model: 'llama-3.1-8b-instant', apiKey: process.env.GROQ_API_KEY });
      const response = await llm.invoke([
        { role: 'system', content: `You are HashPay agent. User paid for ${services[serviceId]?.name}. Be helpful and concise.` },
        ...messages
      ]);
      res.json({ reply: response.content });
    }
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
