const { Client, ScheduleCreateTransaction, TransferTransaction, AccountId, Hbar, ScheduleSignTransaction } = require('@hashgraph/sdk');

function getClient() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.ACCOUNT_ID || '0.0.9100611',
    process.env.PRIVATE_KEY || ''
  );
  return client;
}

async function createScheduledPayment(toAccountId, amount, memo) {
  try {
    const client = getClient();
    const transfer = new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(process.env.ACCOUNT_ID || '0.0.9100611'), new Hbar(-amount))
      .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amount));

    const scheduled = await new ScheduleCreateTransaction()
      .setScheduledTransaction(transfer)
      .setScheduleMemo(memo || 'HashPay Recurring Payment')
      .execute(client);

    const receipt = await scheduled.getReceipt(client);
    return {
      status: receipt.status.toString(),
      scheduleId: receipt.scheduleId?.toString(),
      transactionId: scheduled.transactionId.toString(),
      amount: amount + ' HBAR',
      to: toAccountId
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { createScheduledPayment };
