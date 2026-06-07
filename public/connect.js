const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.wcProvider = null;
window.wcSession = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Generating QR code...</p>';

  try {
    const { UniversalProvider } = await import('https://esm.sh/@walletconnect/universal-provider@2.17.0');

    window.wcProvider = await UniversalProvider.init({
      projectId: PROJECT_ID,
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    window.wcProvider.on('display_uri', (uri) => {
      document.getElementById('qrContainer').innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}"
             style="border-radius:12px;width:200px;height:200px"/>
        <p style="color:#666;font-size:11px;margin-top:8px">Scan with HashPack</p>`;
      const btn = document.getElementById('deepLinkBtn');
      btn.href = uri;
      btn.style.display = 'block';
    });

    window.wcSession = await window.wcProvider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction', 'hedera_getNodeAddresses'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    const accounts = window.wcSession?.namespaces?.hedera?.accounts;
    if (accounts && accounts.length > 0) {
      const accountId = accounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    document.getElementById('qrContainer').innerHTML =
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}

window.signAndPay = async function(costNum) {
  if (!window.wcProvider || !window.wcSession) {
    window.showNotify('Please connect wallet first');
    return false;
  }

  try {
    // Build transaction bytes using Hedera SDK
    const { TransferTransaction, Hbar, AccountId, Client } =
      await import('https://esm.sh/@hashgraph/sdk@2.50.0');

    const client = Client.forTestnet();
    const sender = AccountId.fromString(window.connectedAccount);
    const receiver = AccountId.fromString('0.0.9100611');
    const amount = new Hbar(costNum);

    const tx = await new TransferTransaction()
      .addHbarTransfer(sender, amount.negated())
      .addHbarTransfer(receiver, amount)
      .freezeWith(client);

    const txBytes = Buffer.from(tx.toBytes()).toString('base64');

    // Send signing request through WalletConnect
    const result = await window.wcProvider.request({
      topic: window.wcSession.topic,
      chainId: 'hedera:testnet',
      request: {
        method: 'hedera_signAndExecuteTransaction',
        params: { transactionList: txBytes }
      }
    });

    return result;
  } catch(e) {
    window.showNotify('Error: ' + e.message);
    return false;
  }
}
