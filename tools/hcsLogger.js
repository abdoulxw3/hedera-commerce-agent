import { Client, PrivateKey, TopicCreateTransaction, TopicMessageSubmitTransaction } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

export async function logToHCS(message) {
  try {
    // Create a new topic
    const topicTx = await new TopicCreateTransaction().execute(client);
    const topicReceipt = await topicTx.getReceipt(client);
    const topicId = topicReceipt.topicId;

    // Submit message to topic
    const msgTx = await new TopicMessageSubmitTransaction({
      topicId,
      message
    }).execute(client);

    await msgTx.getReceipt(client);

    return {
      success: true,
      topicId: topicId.toString(),
      message: `✅ Message stored permanently on Hedera!\nTopic ID: ${topicId}\nView on HashScan: https://hashscan.io/testnet/topic/${topicId}`
    };
  } catch (error) {
    return { success: false, message: `HCS logging failed: ${error.message}` };
  }
}
