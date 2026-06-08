const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.dAppConnector = null;
window.wcSession = null;

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Initializing...</p>';

  try {
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

    window.wcSession = await provider.connect({
      optionalNamespaces: {
        eip155: {
          methods: ['eth_sendTransaction', 'personal_sign'],
          chains: ['eip155:296'],
          events: ['accountsChanged', 'chainChanged']
        },
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    // Try to get Hedera account first, fall back to EVM address
    const hederaAccounts = window.wcSession?.namespaces?.hedera?.accounts;
    const evmAccounts = window.wcSession?.namespaces?.eip155?.accounts;

    if (hederaAccounts?.length > 0) {
      const accountId = hederaAccounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    } else if (evmAccounts?.length > 0) {
      const evmAddress = evmAccounts[0].split(':').pop();
      window.setConnectedAccount(evmAddress);
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
    const account = window.connectedAccount;
    const isHederaAccount = account.includes('.');

    if (isHederaAccount) {
      // Native Hedera transfer
      const res = await fetch('/build-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderAccountId: account, amount: costNum })
      });
      const { txBytes, error } = await res.json();
      if (error) throw new Error(error);

      const result = await window.dAppConnector.request({
        topic: window.wcSession.topic,
        chainId: 'hedera:testnet',
        request: {
          method: 'hedera_signAndExecuteTransaction',
          params: { transactionList: txBytes }
        }
      });
      return result;

    } else {
      // EVM transfer (HBAR on Hedera EVM)
      const tinybars = Math.floor(costNum * 100_000_000);
      const receiverRes = await fetch('/evm-address/0.0.9100611');
      const { evmAddress } = await receiverRes.json();

      const result = await window.dAppConnector.request({
        topic: window.wcSession.topic,
        chainId: 'eip155:296',
        request: {
          method: 'eth_sendTransaction',
          params: [{
            from: account,
            to: evmAddress,
            value: '0x' + tinybars.toString(16),
            gas: '0x5208'
          }]
        }
      });
      return result;
    }

  } catch(e) {
    window.showNotify('Error: ' + e.message);
    return false;
  }
}
