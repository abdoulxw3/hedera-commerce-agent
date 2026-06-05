import { Client, PrivateKey } from '@hashgraph/sdk';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { verifyPayment } from './tools/verifyPayment.js';
import { grantAccess, services } from './tools/grantAccess.js';
import dotenv from 'dotenv';

dotenv.config();

const checkPaymentTool = tool(
  async ({ accountId, serviceId }) => {
    const service = services[serviceId];
    if (!service) return 'Service not found.';
    const result = await verifyPayment(accountId, service.requiredHbar);
    const access = grantAccess(serviceId, result.verified);
    return access.message;
  },
  {
    name: 'check_payment_and_grant_access',
    description: 'Verify HBAR payment and grant access to a service',
    schema: z.object({
      accountId: z.string().describe('Hedera account ID e.g. 0.0.12345'),
      serviceId: z.string().describe('Service ID: weather-api, market-data, or ai-reports')
    })
  }
);

const llm = new ChatGroq({
  model: 'llama-3.1-8b-instant',
  apiKey: process.env.GROQ_API_KEY,
});

export const agent = createReactAgent({
  llm,
  tools: [checkPaymentTool],
  checkpointSaver: new MemorySaver(),
  messageModifier: `You are a payment-gated commerce agent on Hedera. Available services: weather-api (1 HBAR), market-data (2 HBAR), ai-reports (5 HBAR). When a user wants to access a service, ALWAYS call the check_payment_and_grant_access tool immediately with their account ID and the service ID. Do not ask questions, just call the tool.`
});
