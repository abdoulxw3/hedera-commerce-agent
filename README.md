# Hedera Commerce Agent

A payment-gated service agent built on the Hedera network. Users pay HBAR to unlock access to services — no payment, no access.

## What It Does

- User requests a service
- Agent verifies HBAR balance on Hedera testnet
- Access is granted or denied based on payment

## Available Services

| Service | Cost |
|---|---|
| weather-api | 1 HBAR |
| market-data | 2 HBAR |
| ai-reports | 5 HBAR |

## Tech Stack

- [Hedera Agent Kit](https://github.com/hashgraph/hedera-agent-kit)
- [@hashgraph/sdk](https://github.com/hashgraph/hedera-sdk-js)
- [LangChain](https://langchain.com)
- [Groq](https://groq.com) (LLM inference)
- Node.js

## Setup

1. Clone the repo
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file:
   \`\`\`
   ACCOUNT_ID="0.0.xxxxx"
   PRIVATE_KEY="0x..."
   GROQ_API_KEY="gsk_..."
   \`\`\`
4. Get a free Hedera testnet account at [portal.hedera.com](https://portal.hedera.com)
5. Run the agent:
   \`\`\`bash
   node index.js
   \`\`\`

## License

MIT
