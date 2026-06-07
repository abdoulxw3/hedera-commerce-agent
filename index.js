import { ChatGroq } from '@langchain/groq';
import { services, grantAccess } from './tools/grantAccess.js';
import { logToHCS } from './tools/hcsLogger.js';
import { createToken } from './tools/tokenCreator.js';
import { mintNFT } from './tools/nftMinter.js';
import { getDefiRates } from './tools/defiRates.js';
import { verifyPayment } from './tools/verifyPayment.js';
import * as readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const llm = new ChatGroq({ model: 'llama-3.1-8b-instant', apiKey: process.env.GROQ_API_KEY });

function ask(q) { return new Promise(r => rl.question(q, r)); }

function parseIntent(input) {
  const serviceId = Object.keys(services).find(id => input.toLowerCase().includes(id));
  const accountId = (input.match(/0\.0\.\d+/) || [])[0] || null;
  const message = (input.match(/"([^"]+)"/) || [])[1] || null;
  return { serviceId, accountId, message };
}

async function executeService(serviceId, extra) {
  if (serviceId === 'hcs-logger') return (await logToHCS(extra || 'Hello Hedera')).message;
  if (serviceId === 'token-creator') {
    const [name, symbol, supply] = (extra || 'MyToken,MTK,1000').split(',');
    return (await createToken(name?.trim(), symbol?.trim(), parseInt(supply))).message;
  }
  if (serviceId === 'nft-minter') {
    const [name, symbol] = (extra || 'MyNFT,MNFT').split(',');
    return (await mintNFT(name?.trim(), symbol?.trim())).message;
  }
  if (serviceId === 'defi-rates') return (await getDefiRates()).message;
  return grantAccess(serviceId, true).message;
}

async function main() {
  console.log('\n🛒 HashPay');
  console.log('========================');
  Object.entries(services).forEach(([id, s]) => {
    console.log(`  - ${id}: ${s.name} (${s.requiredHbar} HBAR)`);
  });
  console.log('');

  let pendingService = null;

  while (true) {
    const input = await ask('You: ');
    if (input.toLowerCase() === 'exit') break;

    const { serviceId, accountId, message } = parseIntent(input);
    if (serviceId) pendingService = serviceId;

    if (pendingService && accountId) {
      const service = services[pendingService];
      console.log(`\nAgent: Checking payment for ${pendingService}...`);
      const payment = await verifyPayment(accountId, service.requiredHbar);
      if (payment.verified) {
        console.log(`Agent: Payment verified! Executing ${pendingService}...\n`);
        const result = await executeService(pendingService, message);
        console.log(`Agent: ${result}\n`);
      } else {
        console.log(`Agent: ${payment.message}\n`);
      }
      pendingService = null;
    } else if (pendingService && !accountId) {
      console.log(`\nAgent: Please provide your Hedera account ID to access ${pendingService}.\n`);
    } else {
      const res = await llm.invoke([{ role: 'user', content: input }]);
      console.log(`\nAgent: ${res.content}\n`);
    }
  }
  rl.close();
}

main();
