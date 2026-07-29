const { Client, TransferTransaction, AccountBalanceQuery, Hbar, AccountId } = require('@hashgraph/sdk');

function getClient() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.ACCOUNT_ID || '0.0.9100611',
    process.env.PRIVATE_KEY || ''
  );
  return client;
}

async function sendHBAR(toAccountId, amount, memo = 'HashPay Payment') {
  try {
    const client = getClient();
    const tx = await new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(process.env.ACCOUNT_ID || '0.0.9100611'), new Hbar(-amount))
      .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amount))
      .setTransactionMemo(memo)
      .execute(client);
    const receipt = await tx.getReceipt(client);
    return {
      status: receipt.status.toString(),
      transactionId: tx.transactionId.toString(),
      amount: amount + ' HBAR',
      to: toAccountId,
      memo
    };
  } catch(e) {
    return { error: e.message };
  }
}

async function getBalance(accountId) {
  try {
    const client = getClient();
    const balance = await new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(accountId))
      .execute(client);
    return {
      hbar: balance.hbars.toString(),
      tokens: balance.tokens?.toString()
    };
  } catch(e) {
    return { error: e.message };
  }
}

async function createPaymentRequest(toAccountId, amount, memo) {
  return {
    to: toAccountId,
    amount: amount + ' HBAR',
    memo,
    deepLink: `hashpack://transfer?to=${toAccountId}&amount=${amount}&memo=${encodeURIComponent(memo)}`,
    manualInstructions: `Send ${amount} HBAR to ${toAccountId} with memo: ${memo}`
  };
}

module.exports = { sendHBAR, getBalance, createPaymentRequest };
