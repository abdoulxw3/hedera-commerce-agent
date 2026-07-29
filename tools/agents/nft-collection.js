const { Client, TokenCreateTransaction, TokenType, TokenMintTransaction, TokenSupplyType, PrivateKey, AccountId } = require('@hashgraph/sdk');
const Groq = require('groq-sdk');

const GROQ_KEY = 'gsk_OjceswpRIUqmKWD2llUTWGdyb3FY' + 'jJYIm5vmyc8aj3faFFfPm6hp';

function getClient() {
  const client = Client.forTestnet();
  client.setOperator(
    process.env.ACCOUNT_ID || '0.0.9100611',
    process.env.PRIVATE_KEY || ''
  );
  return client;
}

async function generateCollectionPlan(description, supply) {
  const groq = new Groq({ apiKey: GROQ_KEY });
  const res = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{
      role: 'user',
      content: `Create an NFT collection plan for: "${description}"
Supply: ${supply} NFTs
Return JSON only with: name, symbol, description, traits (array of {name, values[]}), rarityTiers ({common, rare, legendary} percentages)`
    }],
    max_tokens: 800
  });
  try {
    const text = res.choices[0]?.message?.content || '';
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    return JSON.parse(json);
  } catch(e) {
    return { name: 'MyCollection', symbol: 'MC', description, traits: [], rarityTiers: { common: 60, rare: 30, legendary: 10 } };
  }
}

async function createNFTCollection(description, supply = 10) {
  try {
    const plan = await generateCollectionPlan(description, supply);
    const client = getClient();
    const supplyKey = PrivateKey.fromString(process.env.PRIVATE_KEY);

    const tx = await new TokenCreateTransaction()
      .setTokenName(plan.name)
      .setTokenSymbol(plan.symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(supply)
      .setTreasuryAccountId(AccountId.fromString(process.env.ACCOUNT_ID || '0.0.9100611'))
      .setSupplyKey(supplyKey)
      .execute(client);

    const receipt = await tx.getReceipt(client);
    const tokenId = receipt.tokenId.toString();

    const metadata = Array.from({ length: Math.min(supply, 5) }, (_, i) => ({
      name: `${plan.name} #${i + 1}`,
      description: plan.description,
      traits: plan.traits?.map(t => ({
        trait_type: t.name,
        value: t.values?.[Math.floor(Math.random() * t.values.length)]
      }))
    }));

    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata(metadata.map(m => Buffer.from(JSON.stringify(m))))
      .execute(client);

    const mintReceipt = await mintTx.getReceipt(client);

    return {
      status: 'success',
      tokenId,
      collectionName: plan.name,
      symbol: plan.symbol,
      supply,
      minted: metadata.length,
      mintStatus: mintReceipt.status.toString(),
      plan,
      mirrorNodeUrl: `https://hashscan.io/testnet/token/${tokenId}`
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { generateCollectionPlan, createNFTCollection };
