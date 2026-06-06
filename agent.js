import { Client, PrivateKey } from '@hashgraph/sdk';
import { HederaLangchainToolkit, AgentMode } from 'hedera-agent-kit';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { grantAccess, services } from './tools/grantAccess.js';
import { logToHCS } from './tools/hcsLogger.js';
import { createToken } from './tools/tokenCreator.js';
import { mintNFT } from './tools/nftMinter.js';
import { getDefiRates } from './tools/defiRates.js';
import dotenv from 'dotenv';

dotenv.config();

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

const toolkit = new HederaLangchainToolkit({
  client,
  configuration: {
    context: { mode: AgentMode.AUTONOMOUS }
  }
});

const hederaTools = toolkit.getTools();

const unlockServiceTool = tool(
  async ({ serviceId, paid, extra }) => {
    if (!paid) return grantAccess(serviceId, false).message;

    if (serviceId === 'hcs-logger') {
      const result = await logToHCS(extra || 'Hello from Hedera Commerce Agent');
      return result.message;
    }
    if (serviceId === 'token-creator') {
      const [name, symbol, supply] = (extra || 'MyToken,MTK,1000').split(',');
      const result = await createToken(name.trim(), symbol.trim(), parseInt(supply));
      return result.message;
    }
    if (serviceId === 'nft-minter') {
      const [name, symbol] = (extra || 'MyNFT,MNFT').split(',');
      const result = await mintNFT(name.trim(), symbol.trim());
      return result.message;
    }
    if (serviceId === 'defi-rates') {
      const result = await getDefiRates();
      return result.message;
    }

    return grantAccess(serviceId, true).message;
  },
  {
    name: 'unlock_service',
    description: 'Unlock a service after payment is confirmed',
    schema: z.object({
      serviceId: z.string().describe('Service ID: weather-api, market-data, ai-reports, hcs-logger, token-creator, nft-minter, defi-rates'),
      paid: z.boolean().describe('Whether payment was confirmed'),
      extra: z.string().optional().describe('Extra params e.g. token name,symbol,supply or message for HCS')
    })
  }
);

const allTools = [...hederaTools, unlockServiceTool];

const llm = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
});

const serviceList = Object.entries(services)
  .map(([id, s]) => `${id} (${s.requiredHbar} HBAR)`)
  .join(', ');

export const agent = createReactAgent({
  llm,
  tools: allTools,
  checkpointSaver: new MemorySaver(),
  messageModifier: `You are a Hedera payment-gated commerce agent. 
  Services: ${serviceList}.
  Your operator account is ${process.env.ACCOUNT_ID}.
  When a user wants to access a service:
  1. Use get_hbar_balance to check their account balance
  2. If they have enough HBAR, use transfer_hbar to collect payment to your account
  3. Use unlock_service with paid=true to execute and grant access
  4. If insufficient balance, use unlock_service with paid=false
  For token-creator ask for token name, symbol and supply.
  For hcs-logger ask for the message to store.
  For nft-minter ask for collection name and symbol.`
});
