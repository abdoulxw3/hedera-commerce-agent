const Groq = require('groq-sdk');
const explorer = require('./hedera-explorer');
const treasury = require('./hbar-treasury');
const walletAnalytics = require('./wallet-analytics');
const governance = require('./governance');
const paymentGateway = require('./payment-gateway');
const invoice = require('./invoice');

const GROQ_KEY = 'gsk_OjceswpRIUqmKWD2llUTWGdyb3FY' + 'jJYIm5vmyc8aj3faFFfPm6hp';

const AGENT_DESCRIPTIONS = {
  'hedera-explorer': 'Look up accounts, transactions or tokens on Hedera',
  'hbar-treasury': 'Get HBAR price, market cap and network stats',
  'wallet-analytics': 'Analyze wallet history, P&L and token balances',
  'governance': 'Fetch and analyze Hedera Improvement Proposals',
  'payment-gateway': 'Send HBAR payments or create payment requests',
  'invoice': 'Create and track HBAR invoices',
};

async function routeRequest(userRequest, accountId) {
  const groq = new Groq({ apiKey: GROQ_KEY });

  const routingRes = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{
      role: 'user',
      content: `Given this user request: "${userRequest}"
Which agent(s) should handle it? Available agents: ${JSON.stringify(AGENT_DESCRIPTIONS)}
Return JSON: { "agents": ["agent-id"], "plan": "brief explanation", "params": {} }`
    }],
    max_tokens: 300
  });

  let routing;
  try {
    const text = routingRes.choices[0]?.message?.content || '';
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    routing = JSON.parse(json);
  } catch(e) {
    routing = { agents: ['hbar-treasury'], plan: 'Default to treasury info', params: {} };
  }

  const results = {};
  for (const agentId of (routing.agents || [])) {
    try {
      switch(agentId) {
        case 'hedera-explorer':
          results[agentId] = await explorer.exploreAccount(routing.params?.accountId || accountId);
          break;
        case 'hbar-treasury':
          results[agentId] = await treasury.getTreasuryReport();
          break;
        case 'wallet-analytics':
          results[agentId] = await walletAnalytics.getWalletAnalytics(routing.params?.accountId || accountId);
          break;
        case 'governance':
          results[agentId] = await governance.fetchHIPs();
          break;
        case 'payment-gateway':
          results[agentId] = await paymentGateway.createPaymentRequest(
            routing.params?.to || accountId,
            routing.params?.amount || 1,
            routing.params?.memo || 'HashPay'
          );
          break;
        case 'invoice':
          results[agentId] = invoice.createInvoice({
            from: accountId,
            to: routing.params?.to || accountId,
            amount: routing.params?.amount || 1,
            description: routing.params?.description || userRequest
          });
          break;
      }
    } catch(e) {
      results[agentId] = { error: e.message };
    }
  }

  return { plan: routing.plan, agents: routing.agents, results };
}

module.exports = { routeRequest };
