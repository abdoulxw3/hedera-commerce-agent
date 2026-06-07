import { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenMintTransaction } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

function getClient() {
  const key = process.env.PRIVATE_KEY?.replace('0x', '');
  return Client.forTestnet().setOperator(
    process.env.ACCOUNT_ID,
    PrivateKey.fromStringECDSA(key)
  );
}

export async function mintNFT(name, symbol) {
  try {
    const client = getClient();
    const privateKey = PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY?.replace('0x', ''));
    const nftTx = await new TokenCreateTransaction()
      .setTokenName(name || 'CommerceNFT')
      .setTokenSymbol(symbol || 'CNFT')
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setAdminKey(privateKey)
      .setSupplyKey(privateKey)
      .execute(client);
    const nftReceipt = await nftTx.getReceipt(client);
    const tokenId = nftReceipt.tokenId;
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .addMetadata(Buffer.from('HashPay NFT #1'))
      .execute(client);
    await mintTx.getReceipt(client);
    return {
      success: true,
      message: `✅ NFT minted!\nCollection ID: ${tokenId}\nNFT: #1\nView: https://hashscan.io/testnet/token/${tokenId}`
    };
  } catch (error) {
    return { success: false, message: `NFT minting failed: ${error.message}` };
  }
}
