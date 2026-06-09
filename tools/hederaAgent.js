import { Client, PrivateKey } from '@hashgraph/sdk';
import { HederaLangchainToolkit, AgentMode } from 'hedera-agent-kit';
import { ChatGroq } from '@langchain/groq';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import dotenv from 'dotenv';

dotenv.config();

let agentInstance = null;

export function getHederaAgent() {
  if (agentInstance) return agentInstance;

  const client = Client.forTestnet().setOperator(
    process.env.ACCOUNT_ID,
    PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY?.replace('0x', ''))
  );

  const toolkit = new HederaLangchainToolkit({
    client,
    configuration: {
      context: { mode: AgentMode.AUTONOMOUS }
    }
  });

  const tools = toolkit.getTools();

  const llm = new ChatGroq({
    model: 'llama-3.1-8b-instant',
    apiKey: process.env.GROQ_API_KEY,
  });

  agentInstance = createReactAgent({
    llm,
    tools,
    checkpointSaver: new MemorySaver(),
    messageModifier: `You are HashPay, a Hedera commerce agent. 
    You help users access payment-gated services on Hedera.
    You can create tokens, log messages to HCS, mint NFTs, and check balances.
    Always be concise and helpful.`
  });

  return agentInstance;
}

export async function runHederaAgent(userMessage, threadId = '1') {
  const agent = getHederaAgent();
  const response = await agent.invoke(
    { messages: [{ role: 'user', content: userMessage }] },
    { configurable: { thread_id: threadId } }
  );
  return response.messages[response.messages.length - 1].content;
}
