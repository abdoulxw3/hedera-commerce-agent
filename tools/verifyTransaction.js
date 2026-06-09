import dotenv from 'dotenv';
dotenv.config();

export async function verifyTransaction(senderAccountId, receiverAccountId, requiredHbar, usedTxIds = new Set(), windowSeconds = 3600) {
  try {
    const url = `https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=${receiverAccountId}&type=credit&limit=25&order=desc`;
    const response = await fetch(url);
    const data = await response.json();

    const transactions = data.transactions || [];
    const now = Date.now() / 1000;
    const requiredTinybars = requiredHbar * 100_000_000;

    for (const tx of transactions) {
      const txTime = parseFloat(tx.consensus_timestamp);
      if (now - txTime > windowSeconds) continue;
      if (usedTxIds.has(tx.transaction_id)) continue; // skip already used

      for (const transfer of tx.transfers || []) {
        if (transfer.account === receiverAccountId && transfer.amount >= requiredTinybars) {
          const senderTransfer = tx.transfers.find(t =>
            t.account === senderAccountId && t.amount < 0
          );
          if (senderTransfer) {
            return {
              verified: true,
              txId: tx.transaction_id,
              amount: transfer.amount / 100_000_000,
              message: `Payment verified: ${transfer.amount / 100_000_000} HBAR received`
            };
          }
        }
      }
    }

    return {
      verified: false,
      message: `No payment found. Please send ${requiredHbar} HBAR to ${receiverAccountId} first.`
    };
  } catch (error) {
    return { verified: false, message: `Verification failed: ${error.message}` };
  }
}
