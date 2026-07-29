const MIRROR = 'https://testnet.mirrornode.hedera.com/api/v1';

async function getWalletAnalytics(accountId) {
  try {
    const [accRes, txRes, tokenRes] = await Promise.all([
      fetch(`${MIRROR}/accounts/${accountId}`),
      fetch(`${MIRROR}/transactions?account.id=${accountId}&limit=100&order=desc&transactiontype=CRYPTOTRANSFER`),
      fetch(`${MIRROR}/accounts/${accountId}/tokens?limit=10`)
    ]);
    const acc = await accRes.json();
    const txData = await txRes.json();
    const tokenData = await tokenRes.json();
    const txs = txData.transactions || [];

    let totalIn = 0, totalOut = 0;
    const dailyVolume = {};

    txs.forEach(tx => {
      const date = new Date(tx.consensus_timestamp * 1000).toISOString().split('T')[0];
      if (!dailyVolume[date]) dailyVolume[date] = { in: 0, out: 0 };
      (tx.transfers || []).forEach(t => {
        if (t.account === accountId) {
          if (t.amount > 0) { totalIn += t.amount; dailyVolume[date].in += t.amount; }
          else { totalOut += Math.abs(t.amount); dailyVolume[date].out += Math.abs(t.amount); }
        }
      });
    });

    return {
      account: accountId,
      balance: ((acc.balance?.balance || 0) / 1e8).toFixed(2) + ' HBAR',
      totalReceived: (totalIn / 1e8).toFixed(2) + ' HBAR',
      totalSent: (totalOut / 1e8).toFixed(2) + ' HBAR',
      netFlow: ((totalIn - totalOut) / 1e8).toFixed(2) + ' HBAR',
      transactionCount: txs.length,
      tokens: tokenData.tokens || [],
      dailyVolume: Object.entries(dailyVolume).slice(-7).map(([date, v]) => ({
        date,
        in: (v.in / 1e8).toFixed(2),
        out: (v.out / 1e8).toFixed(2)
      }))
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { getWalletAnalytics };
