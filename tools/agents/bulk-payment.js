const { Client, TransferTransaction, AccountId, Hbar } = require('@hashgraph/sdk');

function getClient() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.ACCOUNT_ID || '0.0.9100611',
    process.env.PRIVATE_KEY || ''
  );
  return client;
}

async function sendBulkHBAR(payments, memo = 'HashPay Bulk Payment') {
  try {
    const client = getClient();
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const tx = new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(process.env.ACCOUNT_ID || '0.0.9100611'), new Hbar(-totalAmount));

    payments.forEach(p => {
      tx.addHbarTransfer(AccountId.fromString(p.account), new Hbar(p.amount));
    });

    tx.setTransactionMemo(memo);
    const result = await tx.execute(client);
    const receipt = await result.getReceipt(client);
    return {
      status: receipt.status.toString(),
      transactionId: result.transactionId.toString(),
      totalSent: totalAmount + ' HBAR',
      recipients: payments.length,
      memo
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { sendBulkHBAR };
