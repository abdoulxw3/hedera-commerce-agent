import { Client, PrivateKey, TokenCreateTransaction, TokenType } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

export async function createToken(name, symbol, supply) {
  try {
    const tokenTx = await new TokenCreateTransaction()
      .setTokenName(name || 'CommerceToken')
      .setTokenSymbol(symbol || 'CMT')
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(2)
      .setInitialSupply(supply || 1000)
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setAdminKey(PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY))
      .execute(client);

    const receipt = await tokenTx.getReceipt(client);
    const tokenId = receipt.tokenId;

    return {
      success: true,
      tokenId: tokenId.toString(),
      message: `✅ Token created on Hedera!\nToken ID: ${tokenId}\nName: ${name}\nSymbol: ${symbol}\nSupply: ${supply}\nView on HashScan: https://hashscan.io/testnet/token/${tokenId}`
    };
  } catch (error) {
    return { success: false, message: `Token creation failed: ${error.message}` };
  }
}
