const MIRROR = 'https://testnet.mirrornode.hedera.com/api/v1';

async function getHBARPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd&include_24hr_change=true&include_market_cap=true');
    const data = await res.json();
    const hbar = data['hedera-hashgraph'];
    return {
      price: hbar?.usd,
      change24h: hbar?.usd_24h_change?.toFixed(2),
      marketCap: hbar?.usd_market_cap
    };
  } catch(e) {
    return { price: null, error: e.message };
  }
}

async function getNetworkStats() {
  try {
    const [supplyRes, nodesRes] = await Promise.all([
      fetch(`${MIRROR}/network/supply`),
      fetch(`${MIRROR}/network/nodes?limit=5`)
    ]);
    const supply = await supplyRes.json();
    const nodes = await nodesRes.json();
    return {
      totalSupply: ((supply.total_supply || 0) / 1e8).toFixed(0) + ' HBAR',
      circulatingSupply: ((supply.released_supply || 0) / 1e8).toFixed(0) + ' HBAR',
      nodeCount: nodes.nodes?.length || 0,
    };
  } catch(e) {
    return { error: e.message };
  }
}

async function getTreasuryReport() {
  const [price, network] = await Promise.all([getHBARPrice(), getNetworkStats()]);
  return { price, network, timestamp: new Date().toISOString() };
}

module.exports = { getHBARPrice, getNetworkStats, getTreasuryReport };
