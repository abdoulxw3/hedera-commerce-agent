const Groq = require('groq-sdk');

const GROQ_KEY = 'gsk_OjceswpRIUqmKWD2llUTWGdyb3FY' + 'jJYIm5vmyc8aj3faFFfPm6hp';

async function fetchHIPs() {
  try {
    const res = await fetch('https://api.github.com/repos/hashgraph/hedera-improvement-proposal/issues?state=open&labels=HIP&per_page=10');
    const hips = await res.json();
    return hips.map(h => ({
      number: h.number,
      title: h.title,
      state: h.state,
      created: h.created_at,
      url: h.html_url,
      labels: h.labels?.map(l => l.name)
    }));
  } catch(e) {
    return [];
  }
}

async function analyzeHIP(hipNumber) {
  try {
    const res = await fetch(`https://api.github.com/repos/hashgraph/hedera-improvement-proposal/issues/${hipNumber}`);
    const hip = await res.json();
    const groq = new Groq({ apiKey: GROQ_KEY });
    const analysis = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{
        role: 'user',
        content: `Analyze this Hedera Improvement Proposal and provide a concise summary, key impacts, and recommendation:\n\nTitle: ${hip.title}\n\nBody: ${hip.body?.slice(0, 2000)}`
      }],
      max_tokens: 500
    });
    return {
      hip: { number: hipNumber, title: hip.title, url: hip.html_url },
      analysis: analysis.choices[0]?.message?.content
    };
  } catch(e) {
    return { error: e.message };
  }
}

module.exports = { fetchHIPs, analyzeHIP };
