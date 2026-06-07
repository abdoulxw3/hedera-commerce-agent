import { Client, PrivateKey, TokenCreateTransaction, TokenType } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

function getClient() {
  const key = process.env.PRIVATE_KEY?.replace('0x', '');
  return Client.forTestnet().setOperator(
    process.env.ACCOUNT_ID,
    PrivateKey.fromStringECDSA(key)
  );
}

export async function createToken(name, symbol, supply) {
  try {
    const client = getClient();
    const privateKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY?.replace('0x', ''));
    const tokenTx = await new TokenCreateTransaction()
      .setTokenName(name || 'CommerceToken')
      .setTokenSymbol(symbol || 'CMT')
      .setTokenType(TokenType.FungibleCommon)
      .setDecimals(2)
      .setInitialSupply(supply || 1000)
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setAdminKey(privateKey)
      .execute(client);
    const receipt = await tokenTx.getReceipt(client);
    const tokenId = receipt.tokenId;
    return {
      success: true,
      message: `✅ Token created!\nToken ID: ${tokenId}\nName: ${name}\nSymbol: ${symbol}\nView: https://hashscan.io/testnet/token/${tokenId}`
    };
  } catch (error) {
    return { success: false, message: `Token creation failed: ${error.message}` };
  }
}
