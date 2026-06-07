window.connectHashPack = function() {
  // Try deep link first — opens HashPack app if installed
  const deeplink = document.createElement('a');
  deeplink.href = 'hashpack://';
  deeplink.click();
  
  // Fallback to web after 1.5s if app not installed
  setTimeout(() => {
    window.open('https://www.hashpack.app/download', '_blank');
  }, 1500);
  
  showNotify('Opening HashPack — then enter your account ID below');
  showManualInput();
}

window.openHashPack = function() {
  if (!currentService) return;
  const amount = currentService.costNum;
  const receiver = '0.0.9100611';
  
  // Try HashPack deep link for payment
  const deeplink = document.createElement('a');
  deeplink.href = `hashpack://transfer?to=${receiver}&amount=${amount}&memo=HashPay-${currentService.id}`;
  deeplink.click();
  
  // Fallback to HashPack web
  setTimeout(() => {
    window.open(`https://wallet.hashpack.app`, '_blank');
  }, 1500);
  
  showNotify('Complete payment in HashPack, then click Verify');
}
