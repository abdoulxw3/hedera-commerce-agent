import dotenv from 'dotenv';
dotenv.config();

export async function verifyTransaction(senderAccountId, receiverAccountId, requiredHbar, windowSeconds = 3600) {
  try {
    // Query transactions for the RECEIVER account
    const url = `https://testnet.mirrornode.hedera.com/api/v1/transactions?account.id=${receiverAccountId}&type=credit&limit=25&order=desc`;
    const response = await fetch(url);
    const data = await response.json();

    const transactions = data.transactions || [];
    const now = Date.now() / 1000;
    const requiredTinybars = requiredHbar * 100_000_000;

    for (const tx of transactions) {
      const txTime = parseFloat(tx.consensus_timestamp);
      if (now - txTime > windowSeconds) continue;

      for (const transfer of tx.transfers || []) {
        if (
          transfer.account === receiverAccountId &&
          transfer.amount >= requiredTinybars
        ) {
          return {
            verified: true,
            txId: tx.transaction_id,
            amount: transfer.amount / 100_000_000,
            message: `Transaction verified: ${transfer.amount / 100_000_000} HBAR received`
          };
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
