import { agent } from './agent.js';
import { verifyPayment } from './tools/verifyPayment.js';
import { grantAccess, services } from './tools/grantAccess.js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('\n🛒 Hedera Commerce Agent');
  console.log('========================');
  console.log('Available services:');
  Object.entries(services).forEach(([id, s]) => {
    console.log(`  - ${id}: ${s.name} (${s.requiredHbar} HBAR)`);
  });
  console.log('');

  while (true) {
    const userInput = await ask('You: ');
    if (userInput.toLowerCase() === 'exit') break;

    try {
      const response = await agent.invoke(
        { messages: [{ role: 'user', content: userInput }] },
        { configurable: { thread_id: '1' } }
      );
      const reply = response.messages[response.messages.length - 1].content;
      console.log(`\nAgent: ${reply}\n`);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  rl.close();
}

main();
