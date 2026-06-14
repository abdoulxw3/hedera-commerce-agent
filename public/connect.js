const PROJECT_ID = '1eb25284f2c2cc52088780c04246372d';
window.wcSession = null;
window.wcProvider = null;

window.connectWallet = async function() {
  if (window.openAppKit) {
    window.openAppKit();
  } else {
    document.getElementById('wcModal').classList.add('open');
  }
}

window.signAndPay = async function(costNum) {
  try {
    // Get provider from AppKit
    const provider = window.appKitModal?.getWalletProvider();
    
    if (!provider) {
      window.showNotify('Please connect wallet first');
      return false;
    }

    const account = window.connectedEvmAddress || window.connectedAccount;
    
    // Get receiver EVM address
    const evmRes = await fetch('/evm-address/0.0.9100611');
    const { evmAddress } = await evmRes.json();
    
    // Send transaction via provider
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account,
        to: evmAddress,
        value: '0x' + (BigInt(Math.round(costNum * 1e8)) * (10n ** 10n)).toString(16),
        gasLimit: '0x5208'
      }]
    });

    return txHash;
  } catch(e) {
    window.showNotify('Error: ' + e.message);
    return false;
  }
}
