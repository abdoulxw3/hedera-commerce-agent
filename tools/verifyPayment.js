import { Client, PrivateKey, AccountBalanceQuery } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

export async function verifyPayment(accountId, requiredHbar) {
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountId)
      .execute(client);

    const hbarBalance = balance.hbars.toBigNumber().toNumber();
    const hasPaid = hbarBalance >= requiredHbar;

    return {
      accountId,
      balance: hbarBalance,
      required: requiredHbar,
      verified: hasPaid,
      message: hasPaid
        ? `Payment verified. Balance: ${hbarBalance} HBAR`
        : `Insufficient balance. Has ${hbarBalance}, needs ${requiredHbar} HBAR`
    };
  } catch (error) {
    return { verified: false, message: `Verification failed: ${error.message}` };
  }
}

