import { Client, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

function getClient() {
  const key = process.env.PRIVATE_KEY?.replace('0x', '');
  const client = Client.forTestnet().setOperator(
    process.env.ACCOUNT_ID,
    PrivateKey.fromStringECDSA(key)
  );
  return client;
}

export async function logToHCS(message) {
  try {
    const client = getClient();
    const topicTx = await new TopicCreateTransaction().execute(client);
    const topicReceipt = await topicTx.getReceipt(client);
    const topicId = topicReceipt.topicId;
    const msgTx = await new TopicMessageSubmitTransaction({ topicId, message }).execute(client);
    await msgTx.getReceipt(client);
    return {
      success: true,
      message: `✅ Message stored permanently on Hedera!\nTopic ID: ${topicId}\nView on HashScan: https://hashscan.io/testnet/topic/${topicId}`
    };
  } catch (error) {
    return { success: false, message: `HCS logging failed: ${error.message}` };
  }
}
