const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.dAppConnector = null;
window.wcSession = null;

async function initReownAppKit() {
  // Load Reown AppKit from CDN
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = `
    import { createAppKit } from 'https://cdn.jsdelivr.net/npm/@reown/appkit@1.6.8/+esm';
    
    const modal = createAppKit({
      projectId: '${PROJECT_ID}',
      networks: [{
        id: 296,
        name: 'Hedera Testnet',
        nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 8 },
        rpcUrls: { default: { http: ['https://testnet.hashio.io/api'] } },
        blockExplorers: { default: { name: 'HashScan', url: 'https://hashscan.io/testnet' } },
        caipNetworkId: 'eip155:296',
        chainNamespace: 'eip155'
      }],
      metadata: {
        name: 'HashPay',
        description: 'Payment-Gated Services on Hedera',
        url: 'https://hashpay.up.railway.app',
        icons: ['https://avatars.githubusercontent.com/u/116641441']
      }
    });

    window.appKitModal = modal;

    modal.subscribeAccount(account => {
      if (account?.address) {
        window.connectedEvmAddress = account.address;
        window.setConnectedAccount(account.address);
      }
    });

    window.openAppKit = () => modal.open();
  `;
  document.head.appendChild(script);
}

window.connectWallet = async function() {
  if (window.openAppKit) {
    window.openAppKit();
  } else {
    // Fallback to manual input
    document.getElementById('wcModal').classList.add('open');
  }
}

window.signAndPay = async function(costNum) {
  if (!window.appKitModal) {
    window.showNotify('Please connect wallet first');
    return false;
  }

  try {
    const provider = window.appKitModal.getWalletProvider();
    if (!provider) {
      window.showNotify('Wallet not connected');
      return false;
    }

    const account = window.connectedAccount || window.connectedEvmAddress;
    const res = await fetch('/build-transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderAccountId: account, amount: costNum })
    });
    const { txBytes, error } = await res.json();
    if (error) throw new Error(error);

    const result = await provider.request({
      method: 'eth_sendTransaction',
      params: [{
        from: window.connectedEvmAddress,
        to: '0x0000000000000000000000000000000000000000', // will be replaced
        value: '0x' + Math.floor(costNum * 1e8).toString(16),
        data: '0x'
      }]
    });

    return result;
  } catch(e) {
    window.showNotify('Error: ' + e.message);
    return false;
  }
}

// Initialize on load
initReownAppKit();
