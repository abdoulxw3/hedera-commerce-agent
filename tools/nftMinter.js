import { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenMintTransaction } from '@hashgraph/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = Client.forTestnet().setOperator(
  process.env.ACCOUNT_ID,
  PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY)
);

export async function mintNFT(name, symbol) {
  try {
    // Create NFT collection
    const nftTx = await new TokenCreateTransaction()
      .setTokenName(name || 'CommerceNFT')
      .setTokenSymbol(symbol || 'CNFT')
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(process.env.ACCOUNT_ID)
      .setAdminKey(PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY))
      .setSupplyKey(PrivateKey.fromStringECDSA(process.env.PRIVATE_KEY))
      .execute(client);

    const nftReceipt = await nftTx.getReceipt(client);
    const tokenId = nftReceipt.tokenId;

    // Mint 1 NFT
    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .addMetadata(Buffer.from('Hedera Commerce NFT #1'))
      .execute(client);

    await mintTx.getReceipt(client);

    return {
      success: true,
      tokenId: tokenId.toString(),
      message: `✅ NFT minted on Hedera!\nCollection ID: ${tokenId}\nNFT: #1\nName: ${name}\nView on HashScan: https://hashscan.io/testnet/token/${tokenId}`
    };
  } catch (error) {
    return { success: false, message: `NFT minting failed: ${error.message}` };
  }
}
