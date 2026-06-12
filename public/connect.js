const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.dAppConnector = null;
window.wcSession = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrBox').innerHTML = '<p style="color:rgba(255,255,255,0.3);font-size:13px">Initializing...</p>';

  try {
    const { default: UniversalProvider } = await import('/wc.bundle.js');

    window.dAppConnector = await UniversalProvider.init({
      projectId: PROJECT_ID,
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    window.dAppConnector.on('display_uri', (uri) => {
      document.getElementById('qrBox').innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}"
             style="border-radius:12px;width:200px;height:200px"/>
        <p style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:8px">Scan with HashPack</p>`;
      const btn = document.getElementById('openHpBtn');
      btn.href = `hashpack://wc?uri=${encodeURIComponent(uri)}`;
      btn.style.display = 'block';
    });

    window.wcSession = await window.dAppConnector.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction', 'hedera_getNodeAddresses'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    const accounts = window.wcSession?.namespaces?.hedera?.accounts;
    if (accounts?.length > 0) {
      const accountId = accounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    document.getElementById('qrBox').innerHTML =
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}

window.signAndPay = async function(costNum) {
  if (!window.dAppConnector || !window.wcSession) {
    window.showNotify('Please connect via WalletConnect QR first');
    return false;
  }

  try {
    // Get serialized transaction from backend
    const res = await fetch('/build-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderAccountId: window.connectedAccount,
        amount: costNum
      })
    });
    const { txBytes, error } = await res.json();
    if (error) throw new Error(error);

    // Use HIP-820 native Hedera signing
    const network = 'testnet';
    const signerAccountId = `hedera:${network}:${window.connectedAccount}`;

    const result = await window.dAppConnector.request({
      topic: window.wcSession.topic,
      chainId: `hedera:${network}`,
      request: {
        method: 'hedera_signAndExecuteTransaction',
        params: {
          signerAccountId,
          transactionList: txBytes
        }
      }
    });

    return result;
  } catch(e) {
    window.showNotify('Error: ' + e.message);
    return false;
  }
}
