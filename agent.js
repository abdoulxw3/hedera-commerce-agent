import { Client, PrivateKey } from '@hashgraph/sdk';
import { HederaLangchainToolkit, AgentMode } from 'hedera-agent-kit';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { grantAccess, services } from './tools/grantAccess.js';
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
  async ({ serviceId, paid }) => {
    const access = grantAccess(serviceId, paid);
    return access.message;
  },
  {
    name: 'unlock_service',
    description: 'Unlock a service after payment is confirmed',
    schema: z.object({
      serviceId: z.string().describe('Service ID: weather-api, market-data, or ai-reports'),
      paid: z.boolean().describe('Whether payment was confirmed')
    })
  }
);

const allTools = [...hederaTools, unlockServiceTool];

const llm = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
});

const serviceList = Object.entries(services)
  .map(([id, s]) => `${id} costs ${s.requiredHbar} HBAR`)
  .join(', ');

export const agent = createReactAgent({
  llm,
  tools: allTools,
  checkpointSaver: new MemorySaver(),
  messageModifier: `You are a Hedera payment-gated commerce agent. Services: ${serviceList}. 
  Your operator account is ${process.env.ACCOUNT_ID}.
  When a user wants to access a service:
  1. Use get_hbar_balance to check their account balance
  2. If they have enough HBAR, use transfer_hbar to collect payment to your account
  3. Use unlock_service with paid=true to grant access
  4. If insufficient balance, use unlock_service with paid=false`
});
