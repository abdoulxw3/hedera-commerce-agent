import express from 'express';
import { services, grantAccess } from './tools/grantAccess.js';
import { logToHCS } from './tools/hcsLogger.js';
import { createToken } from './tools/tokenCreator.js';
import { mintNFT } from './tools/nftMinter.js';
import { getDefiRates } from './tools/defiRates.js';
import { verifyTransaction } from './tools/verifyTransaction.js';
import { ChatGroq } from '@langchain/groq';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

const llm = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
});

app.get('/services', (req, res) => {
  const serviceList = Object.entries(services).map(([id, s]) => ({
    id, name: s.name, cost: `${s.requiredHbar} HBAR`, costNum: s.requiredHbar
  }));
  res.json(serviceList);
});

app.post('/verify-payment', async (req, res) => {
  const { senderAccountId, serviceId } = req.body;
  if (!senderAccountId || !serviceId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const result = await verifyTransaction(senderAccountId, process.env.ACCOUNT_ID, service.requiredHbar);
  res.json(result);
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
  else if (serviceId === 'token-creator') { const [name, symbol, supply] = (extra || 'MyToken,MTK,1000').split(','); result = await createToken(name?.trim(), symbol?.trim(), parseInt(supply)); }
  else if (serviceId === 'nft-minter') { const [name, symbol] = (extra || 'MyNFT,MNFT').split(','); result = await mintNFT(name?.trim(), symbol?.trim()); }
  else if (serviceId === 'defi-rates') result = await getDefiRates();
  else result = grantAccess(serviceId, true);
  res.json({ success: true, result: result.message });
});

app.post('/chat', async (req, res) => {
  const { messages, serviceId, accountId } = req.body;
  if (!messages || !serviceId || !accountId) return res.status(400).json({ error: 'Missing fields' });
  const service = services[serviceId];
  const systemPrompt = `You are HashPay, a Hedera commerce agent. The user has paid for ${service?.name}. Help them use this service. Be concise and helpful.`;
  try {
    const response = await llm.invoke([
      { role: 'system', content: systemPrompt },
      ...messages
    ]);
    res.json({ reply: response.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/wc-uri', async (req, res) => {
  try {
    const { default: UniversalProvider } = await import('@walletconnect/universal-provider');
    const provider = await UniversalProvider.init({
      projectId: '1eb25284f2c2cc52088780c04246372d',
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    let uri = null;
    provider.on('display_uri', (u) => { uri = u; });

    provider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    }).catch(() => {});

    await new Promise(resolve => setTimeout(resolve, 2000));
    if (uri) {
      res.json({ uri });
    } else {
      res.status(500).json({ error: 'Failed to generate URI' });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🛒 HashPay running on port ${PORT}`));
