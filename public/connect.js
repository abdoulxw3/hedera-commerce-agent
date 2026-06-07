const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.dAppConnector = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Initializing...</p>';

  try {
    // Use UniversalProvider which works in browsers
    const { default: UniversalProvider } = await import('/wc.bundle.js');

    const provider = await UniversalProvider.init({
      projectId: PROJECT_ID,
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    window.dAppConnector = provider;

    provider.on('display_uri', (uri) => {
      document.getElementById('qrContainer').innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}"
             style="border-radius:12px;width:200px;height:200px"/>
        <p style="color:#666;font-size:11px;margin-top:8px">Scan with HashPack</p>`;
      const btn = document.getElementById('deepLinkBtn');
      btn.href = uri;
      btn.style.display = 'block';
    });

    const session = await provider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    window.wcSession = session;
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
  if (!window.dAppConnector || !window.wcSession) {
    window.showNotify('Please connect wallet first');
    return false;
  }

  try {
    // Get transaction bytes from backend
    const res = await fetch('/build-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderAccountId: window.connectedAccount,
        amount: costNum
      })
    });
    const { txBytes } = await res.json();

    // Send to wallet for signing
    const result = await window.dAppConnector.request({
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
