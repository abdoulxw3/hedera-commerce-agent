const MIRROR = 'https://testnet.mirrornode.hedera.com/api/v1';

async function exploreAccount(accountId) {
  const [accRes, txRes] = await Promise.all([
    fetch(`${MIRROR}/accounts/${accountId}`),
    fetch(`${MIRROR}/transactions?account.id=${accountId}&limit=10&order=desc`)
  ]);
  const acc = await accRes.json();
  const txs = await txRes.json();
  return {
    account: acc.account,
    balance: ((acc.balance?.balance || 0) / 1e8).toFixed(2) + ' HBAR',
    created: acc.created_timestamp,
    transactions: (txs.transactions || []).map(t => ({
      id: t.transaction_id,
      type: t.name,
      result: t.result,
      time: t.consensus_timestamp,
      fee: ((t.charged_tx_fee || 0) / 1e8).toFixed(4) + ' HBAR'
    }))
  };
}

async function exploreTransaction(txId) {
  const res = await fetch(`${MIRROR}/transactions/${txId}`);
  const data = await res.json();
  const tx = data.transactions?.[0];
  if (!tx) return { error: 'Transaction not found' };
  return {
    id: tx.transaction_id,
    type: tx.name,
    result: tx.result,
    time: tx.consensus_timestamp,
    fee: ((tx.charged_tx_fee || 0) / 1e8).toFixed(4) + ' HBAR',
    transfers: tx.transfers?.map(t => ({
      account: t.account,
      amount: (t.amount / 1e8).toFixed(4) + ' HBAR'
    }))
  };
}

async function exploreToken(tokenId) {
  const res = await fetch(`${MIRROR}/tokens/${tokenId}`);
  const data = await res.json();
  return {
    id: data.token_id,
    name: data.name,
    symbol: data.symbol,
    type: data.type,
    totalSupply: data.total_supply,
    decimals: data.decimals,
    treasury: data.treasury_account_id,
    created: data.created_timestamp
  };
}

module.exports = { exploreAccount, exploreTransaction, exploreToken };
