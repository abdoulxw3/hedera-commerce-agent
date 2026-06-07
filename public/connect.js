const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.dAppConnector = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Initializing...</p>';

  try {
    const { DAppConnector, HederaJsonRpcMethod, HederaSessionEvent, HederaChainId, LedgerId } =
      await import('https://esm.sh/@hashgraph/hedera-wallet-connect@1.3.5');

    window.dAppConnector = new DAppConnector(
      {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      },
      LedgerId.TESTNET,
      PROJECT_ID,
      Object.values(HederaJsonRpcMethod),
      [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
      [HederaChainId.Testnet]
    );

    await window.dAppConnector.init({ logger: 'error' });

    window.dAppConnector.onSessionIframeCreated = (session) => {
      const accounts = session?.namespaces?.hedera?.accounts;
      if (accounts?.length > 0) {
        const accountId = accounts[0].split(':').pop();
        window.setConnectedAccount(accountId);
      }
    };

    const session = await window.dAppConnector.openModal();
    const accounts = session?.namespaces?.hedera?.accounts;
    if (accounts?.length > 0) {
      const accountId = accounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    document.getElementById('qrContainer').innerHTML =
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}

window.signAndPay = async function(costNum) {
  if (!window.dAppConnector || !window.connectedAccount) {
    window.showNotify('Please connect wallet first');
    return false;
  }

  try {
    const { TransferTransaction, Hbar, AccountId } =
      await import('https://esm.sh/@hashgraph/sdk@2.50.0');

    const sender = AccountId.fromString(window.connectedAccount);
    const receiver = AccountId.fromString('0.0.9100611');
    const amount = new Hbar(costNum);

    const tx = new TransferTransaction()
      .addHbarTransfer(sender, amount.negated())
      .addHbarTransfer(receiver, amount);

    const signer = window.dAppConnector.getSigner(sender);
    const result = await signer.signAndExecuteTransaction(tx);
    return result;

  } catch(e) {
    window.showNotify('Transaction failed: ' + e.message);
    return false;
  }
}
