import express from 'express';
import { services, grantAccess } from './tools/grantAccess.js';
import { logToHCS } from './tools/hcsLogger.js';
import { createToken } from './tools/tokenCreator.js';
import { mintNFT } from './tools/nftMinter.js';
import { getDefiRates } from './tools/defiRates.js';
import { verifyPayment } from './tools/verifyPayment.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

app.get('/services', (req, res) => {
  const serviceList = Object.entries(services).map(([id, s]) => ({
    id, name: s.name, cost: `${s.requiredHbar} HBAR`
  }));
  res.json(serviceList);
});

app.post('/access', async (req, res) => {
  const { serviceId, accountId, extra } = req.body;
  if (!serviceId || !accountId) return res.status(400).json({ error: 'serviceId and accountId are required' });
  const service = services[serviceId];
  if (!service) return res.status(404).json({ error: 'Service not found' });
  const payment = await verifyPayment(accountId, service.requiredHbar);
  if (!payment.verified) return res.status(402).json({ error: payment.message });
  let result;
  if (serviceId === 'hcs-logger') result = await logToHCS(extra || 'Hello Hedera');
  else if (serviceId === 'token-creator') { const [name, symbol, supply] = (extra || 'MyToken,MTK,1000').split(','); result = await createToken(name?.trim(), symbol?.trim(), parseInt(supply)); }
  else if (serviceId === 'nft-minter') { const [name, symbol] = (extra || 'MyNFT,MNFT').split(','); result = await mintNFT(name?.trim(), symbol?.trim()); }
  else if (serviceId === 'defi-rates') result = await getDefiRates();
  else result = grantAccess(serviceId, true);
  res.json({ success: true, result: result.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🛒 HashPay running on port ${PORT}`));
