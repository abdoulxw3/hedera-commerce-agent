const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.wcProvider = null;
window.wcSession = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Initializing...</p>';

  try {
    const { default: UniversalProvider } = await import('/wc.bundle.js');

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
      if(btn){ btn.href = uri; btn.style.display = 'block'; }
    });

    window.wcSession = await window.wcProvider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    console.log('WC Session:', JSON.stringify(window.wcSession?.namespaces));

    const hederaAccounts = window.wcSession?.namespaces?.hedera?.accounts;
    if (hederaAccounts?.length > 0) {
      const accountId = hederaAccounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    console.error('WC Error:', e);
    document.getElementById('qrContainer').innerHTML =
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}

window.signAndPay = async function(costNum) {
  console.log('signAndPay called:', costNum, window.connectedAccount, !!window.wcProvider, !!window.wcSession);

  if (!window.wcProvider) {
    window.showNotify('Wallet not connected via WalletConnect. Please reconnect.');
    return false;
  }

  if (!window.wcSession) {
    window.showNotify('No active session. Please reconnect wallet.');
    return false;
  }

  try {
    const res = await fetch('/build-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderAccountId: window.connectedAccount,
        amount: costNum
      })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const result = await window.wcProvider.request({
      topic: window.wcSession.topic,
      chainId: 'hedera:testnet',
      request: {
        method: 'hedera_signAndExecuteTransaction',
        params: { transactionList: data.txBytes }
      }
    });

    console.log('TX Result:', result);
    return result;

  } catch(e) {
    console.error('signAndPay error:', e);
    window.showNotify('Error: ' + e.message);
    return false;
  }
}
