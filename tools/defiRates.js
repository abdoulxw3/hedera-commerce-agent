import dotenv from 'dotenv';

dotenv.config();

export async function getDefiRates() {
  try {
    // Fetch HBAR price from CoinGecko
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd&include_24hr_change=true&include_market_cap=true'
    );
    const data = await response.json();
    const hbar = data['hedera-hashgraph'];

    return {
      success: true,
      message: `✅ Live Hedera DeFi Data:\n
💰 HBAR Price: $${hbar.usd}
📈 24h Change: ${hbar.usd_24h_change?.toFixed(2)}%
🏦 Market Cap: $${(hbar.usd_market_cap / 1e9).toFixed(2)}B

🔗 SaucerSwap TVL: Check https://saucerswap.finance
🔗 Bonzo Finance: Check https://bonzo.finance
🔗 HeliSwap: Check https://heliswap.io`
    };
  } catch (error) {
    return { success: false, message: `Failed to fetch DeFi rates: ${error.message}` };
  }
}
