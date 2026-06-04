const services = {
  'weather-api': {
    name: 'Weather API',
    requiredHbar: 1,
    content: 'ACCESS GRANTED: Weather API Key: WX-2024-HEDERA-PREMIUM-KEY'
  },
  'market-data': {
    name: 'Market Data Feed',
    requiredHbar: 2,
    content: 'ACCESS GRANTED: Market Data Endpoint: https://data.hedera-commerce.io/feed'
  },
  'ai-reports': {
    name: 'AI Research Reports',
    requiredHbar: 5,
    content: 'ACCESS GRANTED: Your AI report is ready. Token: RPT-HEDERA-2024-PREMIUM'
  }
};

export function getService(serviceId) {
  return services[serviceId] || null;
}

export function grantAccess(serviceId, paymentVerified) {
  const service = services[serviceId];

  if (!service) {
    return { success: false, message: 'Service not found.' };
  }

  if (!paymentVerified) {
    return {
      success: false,
      message: `Access denied. This service requires ${service.requiredHbar} HBAR.`
    };
  }

  return {
    success: true,
    service: service.name,
    message: service.content
  };
}

export { services };
