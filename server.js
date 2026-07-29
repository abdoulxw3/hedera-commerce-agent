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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
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

// ── Mirror Node Live Feed ──────────────────────────────────────────────────
const MIRROR = 'https://testnet.mirrornode.hedera.com/api/v1';
const OPERATOR = process.env.ACCOUNT_ID || '0.0.9100611';

app.get('/api/transactions', async (req, res) => {
  try {
    const limit = req.query.limit || 25;
    const url = `${MIRROR}/transactions?account.id=${OPERATOR}&limit=${limit}&order=desc&transactiontype=CRYPTOTRANSFER`;
    const response = await fetch(url);
    const data = await response.json();

    const txs = (data.transactions || []).map(tx => ({
      id: tx.transaction_id,
      time: tx.consensus_timestamp,
      result: tx.result,
      fee: tx.charged_tx_fee,
      transfers: tx.transfers?.filter(t => t.account !== '0.0.98') || [],
      memo: tx.memo_base64 ? Buffer.from(tx.memo_base64, 'base64').toString('utf8') : '',
    }));

    res.json({ transactions: txs, account: OPERATOR });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const [txRes, balRes] = await Promise.all([
      fetch(`${MIRROR}/transactions?account.id=${OPERATOR}&limit=100&order=desc&transactiontype=CRYPTOTRANSFER`),
      fetch(`${MIRROR}/accounts/${OPERATOR}`)
    ]);
    const txData = await txRes.json();
    const balData = await balRes.json();

    const txs = txData.transactions || [];
    const totalVolume = txs.reduce((sum, tx) => {
      const incoming = (tx.transfers || [])
        .filter(t => t.account === OPERATOR && t.amount > 0)
        .reduce((s, t) => s + t.amount, 0);
      return sum + incoming;
    }, 0);

    res.json({
      account: OPERATOR,
      balance: balData.balance?.balance || 0,
      balanceHbar: ((balData.balance?.balance || 0) / 1e8).toFixed(2),
      recentTxCount: txs.length,
      totalVolumeHbar: (totalVolume / 1e8).toFixed(2),
      successRate: txs.length > 0
        ? ((txs.filter(t => t.result === 'SUCCESS').length / txs.length) * 100).toFixed(1)
        : '100',
    });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/agents/registry', (req, res) => {
  const registry = [
    { id:'weather-api',    name:'Weather Oracle',        category:'Data',    price:1,   status:'active', hcsId:null },
    { id:'market-data',    name:'Market Data Feed',      category:'DeFi',    price:2,   status:'active', hcsId:null },
    { id:'ai-reports',     name:'AI Research Agent',     category:'AI',      price:5,   status:'active', hcsId:null },
    { id:'hcs-logger',     name:'HCS Logger',            category:'Hedera',  price:1,   status:'active', hcsId:null },
    { id:'token-creator',  name:'Token Creator',         category:'Tokens',  price:2,   status:'active', hcsId:null },
    { id:'nft-minter',     name:'NFT Minter',            category:'NFTs',    price:3,   status:'active', hcsId:null },
    { id:'defi-rates',     name:'DeFi Rates',            category:'DeFi',    price:0.5, status:'active', hcsId:null },
    { id:'enterprise',     name:'Enterprise Agent',      category:'B2B',     price:10,  status:'active', hcsId:null },
    { id:'mcp-agent',      name:'MCP Commerce Agent',    category:'AI',      price:3,   status:'active', hcsId:null },
    { id:'hedera-explorer',name:'Hedera Explorer Agent', category:'Hedera',  price:1,   status:'coming', hcsId:null },
    { id:'hbar-treasury',  name:'HBAR Treasury Agent',   category:'Data',    price:2,   status:'coming', hcsId:null },
    { id:'governance',     name:'Governance Agent',      category:'Hedera',  price:2,   status:'coming', hcsId:null },
    { id:'orchestrator',   name:'Multi-Agent Orchestrator', category:'AI',   price:5,   status:'coming', hcsId:null },
    { id:'payment-gateway',name:'Payment Gateway Agent', category:'Payments',price:1,   status:'coming', hcsId:null },
    { id:'policy-agent',   name:'Policy & Compliance',   category:'Utility', price:3,   status:'coming', hcsId:null },
  ];
  res.json({ agents: registry, total: registry.length, live: registry.filter(a=>a.status==='active').length });
});

// ── Agent Modules ──────────────────────────────────────────────────────────
const hederaExplorer    = require('./tools/agents/hedera-explorer');
const hbarTreasury      = require('./tools/agents/hbar-treasury');
const governanceAgent   = require('./tools/agents/governance');
const walletAnalytics   = require('./tools/agents/wallet-analytics');
const paymentGateway    = require('./tools/agents/payment-gateway');
const recurringPayment  = require('./tools/agents/recurring-payment');
const bulkPayment       = require('./tools/agents/bulk-payment');
const paymentSplitter   = require('./tools/agents/payment-splitter');
const invoiceAgent      = require('./tools/agents/invoice');
const nftCollection     = require('./tools/agents/nft-collection');
const orchestrator      = require('./tools/agents/orchestrator');

// ── Hedera Explorer ────────────────────────────────────────────────────────
app.get('/api/agent/explorer/account/:accountId', async (req, res) => {
  const data = await hederaExplorer.exploreAccount(req.params.accountId);
  res.json(data);
});
app.get('/api/agent/explorer/transaction/:txId', async (req, res) => {
  const data = await hederaExplorer.exploreTransaction(req.params.txId);
  res.json(data);
});
app.get('/api/agent/explorer/token/:tokenId', async (req, res) => {
  const data = await hederaExplorer.exploreToken(req.params.tokenId);
  res.json(data);
});

// ── HBAR Treasury ──────────────────────────────────────────────────────────
app.get('/api/agent/treasury', async (req, res) => {
  const data = await hbarTreasury.getTreasuryReport();
  res.json(data);
});
app.get('/api/agent/treasury/price', async (req, res) => {
  const data = await hbarTreasury.getHBARPrice();
  res.json(data);
});

// ── Governance ─────────────────────────────────────────────────────────────
app.get('/api/agent/governance/hips', async (req, res) => {
  const data = await governanceAgent.fetchHIPs();
  res.json(data);
});
app.get('/api/agent/governance/hip/:number', async (req, res) => {
  const data = await governanceAgent.analyzeHIP(req.params.number);
  res.json(data);
});

// ── Wallet Analytics ───────────────────────────────────────────────────────
app.get('/api/agent/wallet/:accountId', async (req, res) => {
  const data = await walletAnalytics.getWalletAnalytics(req.params.accountId);
  res.json(data);
});

// ── Payment Gateway ────────────────────────────────────────────────────────
app.post('/api/agent/payment/send', async (req, res) => {
  const { to, amount, memo } = req.body;
  if (!to || !amount) return res.status(400).json({ error: 'to and amount required' });
  const data = await paymentGateway.sendHBAR(to, amount, memo);
  res.json(data);
});
app.post('/api/agent/payment/request', async (req, res) => {
  const { to, amount, memo } = req.body;
  const data = await paymentGateway.createPaymentRequest(to, amount, memo);
  res.json(data);
});
app.get('/api/agent/payment/balance/:accountId', async (req, res) => {
  const data = await paymentGateway.getBalance(req.params.accountId);
  res.json(data);
});

// ── Recurring Payment ──────────────────────────────────────────────────────
app.post('/api/agent/payment/recurring', async (req, res) => {
  const { to, amount, memo } = req.body;
  if (!to || !amount) return res.status(400).json({ error: 'to and amount required' });
  const data = await recurringPayment.createScheduledPayment(to, amount, memo);
  res.json(data);
});

// ── Bulk Payment ───────────────────────────────────────────────────────────
app.post('/api/agent/payment/bulk', async (req, res) => {
  const { payments, memo } = req.body;
  if (!payments?.length) return res.status(400).json({ error: 'payments array required' });
  const data = await bulkPayment.sendBulkHBAR(payments, memo);
  res.json(data);
});

// ── Payment Splitter ───────────────────────────────────────────────────────
app.post('/api/agent/payment/split', async (req, res) => {
  const { totalAmount, splits, memo } = req.body;
  if (!totalAmount || !splits?.length) return res.status(400).json({ error: 'totalAmount and splits required' });
  const data = await paymentSplitter.splitPayment(totalAmount, splits, memo);
  res.json(data);
});

// ── Invoice ────────────────────────────────────────────────────────────────
app.post('/api/agent/invoice/create', async (req, res) => {
  const data = invoiceAgent.createInvoice(req.body);
  res.json(data);
});
app.get('/api/agent/invoice/:id', async (req, res) => {
  const data = await invoiceAgent.checkInvoiceStatus(req.params.id);
  res.json(data);
});
app.get('/api/agent/invoice', async (req, res) => {
  res.json(invoiceAgent.listInvoices());
});

// ── NFT Collection Generator ───────────────────────────────────────────────
app.post('/api/agent/nft/plan', async (req, res) => {
  const { description, supply } = req.body;
  if (!description) return res.status(400).json({ error: 'description required' });
  const data = await nftCollection.generateCollectionPlan(description, supply || 10);
  res.json(data);
});
app.post('/api/agent/nft/create', async (req, res) => {
  const { description, supply } = req.body;
  if (!description) return res.status(400).json({ error: 'description required' });
  const data = await nftCollection.createNFTCollection(description, supply || 10);
  res.json(data);
});

// ── Multi-Agent Orchestrator ───────────────────────────────────────────────
app.post('/api/agent/orchestrate', async (req, res) => {
  const { request, accountId } = req.body;
  if (!request) return res.status(400).json({ error: 'request required' });
  const data = await orchestrator.routeRequest(request, accountId || '0.0.9100611');
  res.json(data);
});

// ── Agent Chat Router ──────────────────────────────────────────────────────
app.post('/api/agent/chat', async (req, res) => {
  const { agentId, message, accountId, history } = req.body;
  if (!agentId || !message) return res.status(400).json({ error: 'agentId and message required' });

  const Groq = require('groq-sdk');
  const groq = new Groq({ apiKey: 'gsk_OjceswpRIUqmKWD2llUTWGdyb3FY' + 'jJYIm5vmyc8aj3faFFfPm6hp' });

  const systemPrompts = {
    'explorer':         'You are the Hedera Explorer Agent. Help users look up accounts, transactions and tokens on Hedera. Use the data provided to give clear, concise answers.',
    'treasury':         'You are the HBAR Treasury Agent. Provide real-time HBAR price data, market cap, staking yields and network statistics.',
    'governance':       'You are the Hedera Governance Agent. Help users understand Hedera Improvement Proposals, analyze their impact and provide recommendations.',
    'wallet-analytics': 'You are the Wallet Analytics Agent. Analyze HBAR wallet history, calculate P&L and provide spending insights.',
    'orchestrator':     'You are the Multi-Agent Orchestrator. Route user requests to the right agents and synthesize results into clear answers.',
    'payment-gateway':  'You are the Payment Gateway Agent. Help users send HBAR, create payment requests and manage HBAR + USDC payments.',
    'recurring':        'You are the Recurring Payment Agent. Help users set up weekly or monthly HBAR payment streams via Hedera scheduled transactions.',
    'bulk-payment':     'You are the Bulk Payment Agent. Help users send HBAR to multiple accounts in a single transaction.',
    'invoice':          'You are the Invoice Agent. Help users create HBAR payment requests, track invoice status and send receipts.',
    'splitter':         'You are the Payment Splitter Agent. Help users split incoming HBAR between multiple wallets automatically.',
    'pay-analytics':    'You are the Payment Analytics Agent. Provide full history and analysis of HBAR payments.',
    'bridge':           'You are the Cross-Chain Bridge Agent. Help users bridge assets from other chains to Hedera HBAR.',
    'policy':           'You are the Policy and Compliance Agent. Help enforce payment rules, spending limits and compliance logging to HCS.',
    'nft-collection':   'You are the NFT Collection Generator. Help users create and mint NFT collections on Hedera Token Service.',
    'learning':         'You are the Hedera Learning Agent. Teach users about Hedera SDK, token creation, smart contracts and best practices.',
    'wallet-analytics': 'You are the Wallet Analytics Agent. Analyze HBAR wallets and provide insights.',
  };

  const system = systemPrompts[agentId] || `You are a helpful AI agent on HashPay powered by Hedera. AgentId: ${agentId}`;

  const messages = [
    ...(history || []),
    { role: 'user', content: message }
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: system }, ...messages],
      max_tokens: 800
    });
    res.json({ reply: completion.choices[0]?.message?.content, agentId });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});
