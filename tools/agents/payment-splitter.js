const { Client, TransferTransaction, AccountId, Hbar } = require('@hashgraph/sdk');

function getClient() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.ACCOUNT_ID || '0.0.9100611',
    process.env.PRIVATE_KEY || ''
  );
  return client;
}

async function splitPayment(totalAmount, splits, memo = 'HashPay Split Payment') {
  try {
    const client = getClient();
    const tx = new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(process.env.ACCOUNT_ID || '0.0.9100611'), new Hbar(-totalAmount));

    splits.forEach(s => {
      const amount = (totalAmount * s.percentage) / 100;
      tx.addHbarTransfer(AccountId.fromString(s.account), new Hbar(amount));
    });

    tx.setTransactionMemo(memo);
    const result = await tx.execute(client);
    const receipt = await result.getReceipt(client);
    return {
      status: receipt.status.toString(),
      transactionId: result.transactionId.toString(),
      totalAmount: totalAmount + ' HBAR',
      splits: splits.map(s => ({
        account: s.account,
        percentage: s.percentage + '%',
        amount: ((totalAmount * s.percentage) / 100).toFixed(4) + ' HBAR'
      }))
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { splitPayment };
