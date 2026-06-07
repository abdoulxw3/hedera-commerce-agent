import { Client, TransferTransaction, Hbar, AccountId } from '@hashgraph/sdk';
import dotenv from 'dotenv';
dotenv.config();

export async function buildTransfer(senderAccountId, amount, receiverAccountId) {
  const client = Client.forTestnet();
  
  const tx = await new TransferTransaction()
    .addHbarTransfer(AccountId.fromString(senderAccountId), new Hbar(-amount))
    .addHbarTransfer(AccountId.fromString(receiverAccountId), new Hbar(amount))
    .setTransactionMemo(`HashPay service payment`)
    .freezeWith(client);

  const txBytes = Buffer.from(tx.toBytes()).toString('base64');
  return txBytes;
}
