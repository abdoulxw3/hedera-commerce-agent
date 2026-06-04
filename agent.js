import { Client, PrivateKey } from '@hashgraph/sdk';
import { HederaLangchainToolkit, AgentMode } from 'hedera-agent-kit';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
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

const tools = toolkit.getTools();

const llm = new ChatGroq({
  model: 'llama3-70b-8192',
  apiKey: process.env.GROQ_API_KEY,
});

export const agent = createReactAgent({
  llm,
  tools,
  checkpointSaver: new MemorySaver(),
  messageModifier: `You are a Hedera commerce agent. 
  You help users access payment-gated services on the Hedera network.
  Before granting access to any service, verify the user has paid the required HBAR amount.`
});
