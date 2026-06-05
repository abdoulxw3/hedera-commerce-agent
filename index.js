import { ChatGroq } from '@langchain/groq';
import { verifyPayment } from './tools/verifyPayment.js';
import { grantAccess, services } from './tools/grantAccess.js';
import * as readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

const llm = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
});

async function parseIntent(input) {
  const serviceIds = Object.keys(services);
  const foundService = serviceIds.find(id => input.toLowerCase().includes(id));
  const accountMatch = input.match(/0\.0\.\d+/);
  return {
    serviceId: foundService || null,
    accountId: accountMatch ? accountMatch[0] : null
  };
}

async function main() {
  console.log('\n🛒 Hedera Commerce Agent');
  console.log('========================');
  console.log('Available services:');
  Object.entries(services).forEach(([id, s]) => {
    console.log(`  - ${id}: ${s.name} (${s.requiredHbar} HBAR)`);
  });
  console.log('');

  let pendingService = null;

  while (true) {
    const userInput = await ask('You: ');
    if (userInput.toLowerCase() === 'exit') break;

    const { serviceId, accountId } = await parseIntent(userInput);

    if (serviceId) pendingService = serviceId;

    if (pendingService && accountId) {
      console.log(`\nAgent: Checking payment for ${pendingService}...\n`);
      const service = services[pendingService];
      const payment = await verifyPayment(accountId, service.requiredHbar);
      const access = grantAccess(pendingService, payment.verified);
      console.log(`Agent: ${access.message}\n`);
      pendingService = null;
    } else if (pendingService && !accountId) {
      console.log(`\nAgent: Please provide your Hedera account ID (e.g. 0.0.12345) to access ${pendingService}.\n`);
    } else {
      const res = await llm.invoke([{ role: 'user', content: userInput }]);
      console.log(`\nAgent: ${res.content}\n`);
    }
  }

  rl.close();
}

main();
