let providerModule = null;

export async function getWCUri() {
  if (!providerModule) {
    providerModule = await import('@walletconnect/universal-provider');
  }
  
  const UniversalProvider = providerModule.default || providerModule.UniversalProvider;
  
  const provider = await UniversalProvider.init({
    projectId: '1eb25284f2c2cc52088780c04246372d',
    metadata: {
      name: 'HashPay',
      description: 'Payment-Gated Services on Hedera',
      url: 'https://hashpay.up.railway.app',
      icons: ['https://avatars.githubusercontent.com/u/116641441']
    }
  });

  return new Promise((resolve, reject) => {
    provider.on('display_uri', (uri) => resolve(uri));
    provider.connect({
      optionalNamespaces: {
        hedera: {
          methods: ['hedera_signAndExecuteTransaction'],
          chains: ['hedera:testnet'],
          events: []
        }
      }
    }).catch(reject);
    setTimeout(() => reject(new Error('Timeout')), 10000);
  });
}
