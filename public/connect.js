const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';

window.connectWallet = async function() {
  document.getElementById('wcModal').classList.add('open');
  document.getElementById('qrContainer').innerHTML = '<p style="color:#888;font-size:13px">Generating QR code...</p>';

  try {
    const { UniversalProvider } = await import('https://esm.sh/@walletconnect/universal-provider@2.17.0');
    
    const provider = await UniversalProvider.init({
      projectId: PROJECT_ID,
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    provider.on('display_uri', (uri) => {
      // Show QR code
      document.getElementById('qrContainer').innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}" 
             style="border-radius:12px;width:200px;height:200px"/>
        <p style="color:#666;font-size:11px;margin-top:8px">Scan with HashPack</p>`;
      
      // Deep link button
      const btn = document.getElementById('deepLinkBtn');
      btn.href = uri;
      btn.style.display = 'block';
    });

    await provider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    // Get connected account
    const accounts = provider.session?.namespaces?.hedera?.accounts;
    if (accounts && accounts.length > 0) {
      const accountId = accounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    document.getElementById('qrContainer').innerHTML = 
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}
