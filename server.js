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
  res.json(await verifyTransaction(senderAccountId, process.env.ACCOUNT_ID, service.requiredHbar));
});

app.post('/chat', async (req, res) => {
  const { messages, serviceId } = req.body;
  if (!messages || !serviceId) return res.status(400).json({ error: 'Missing fields' });
  try {
    const llm = new ChatGroq({ model: 'llama-3.1-8b-instant', apiKey: process.env.GROQ_API_KEY });
    const response = await llm.invoke([
      { role: 'system', content: `You are HashPay agent. User paid for ${services[serviceId]?.name}. Be helpful and concise.` },
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
  const verified = await verifyTransaction(accountId, process.env.ACCOUNT_ID, service.requiredHbar);
  if (!verified.verified) return res.status(402).json({ error: verified.message });
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
