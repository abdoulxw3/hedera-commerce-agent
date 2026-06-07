const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.wcProvider = null;

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

    const session = await window.wcProvider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction', 'hedera_getNodeAddresses'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    });

    const accounts = session?.namespaces?.hedera?.accounts;
    if (accounts && accounts.length > 0) {
      const accountId = accounts[0].split(':').pop();
      window.setConnectedAccount(accountId);
    }

  } catch(e) {
    document.getElementById('qrContainer').innerHTML =
      `<p style="color:#f87171;font-size:13px">Error: ${e.message}</p>`;
  }
}

window.signAndPay = async function(serviceId, costNum, receiverAccount) {
  if (!window.wcProvider) {
    window.showNotify('Please connect wallet first');
    return false;
  }

  try {
    const { TransferTransaction, Hbar, AccountId } =
      await import('https://esm.sh/@hashgraph/sdk@2.50.0');

    const senderId = AccountId.fromString(window.connectedAccount);
    const receiverId = AccountId.fromString(receiverAccount);

    const tx = new TransferTransaction()
      .addHbarTransfer(senderEntry, Hbar.fromTinybars(-Math.floor(costNum * 100_000_000)))
      .addHbarTransfer(receiverId, Hbar.fromTinybars(Math.floor(costNum * 100_000_000)));

    const txBytes = Buffer.from(tx.toBytes()).toString('base64');

    const result = await window.wcProvider.request({
      topic: window.wcProvider.session?.topic,
      chainId: 'hedera:testnet',
      request: {
        method: 'hedera_signAndExecuteTransaction',
        params: { transactionList: txBytes }
      }
    });

    return result;
  } catch(e) {
    window.showNotify('Transaction failed: ' + e.message);
    return false;
  }
}
