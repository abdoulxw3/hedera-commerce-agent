⚡ HashPay — Payment-Gated Services on Hedera

A full-stack Web3 commerce agent built on the Hedera network. Pay with HBAR and gain instant access to AI-powered and on-chain services.

HashPay demonstrates how agents can monetize services through verifiable blockchain payments using emerging agentic commerce standards including x402, UCP, and ACP.

Built for the Hedera AI Bounty — Commerce Agent Track.

---

🌐 Live Demo

https://hashpay.up.railway.app

---

🎯 What is HashPay?

HashPay is a payment-gated service platform powered by Hedera.

Users connect their HashPack wallet, send HBAR, and the platform verifies the transaction directly through Hedera Mirror Nodes before unlocking access to premium services.

No subscriptions. No intermediaries. No manual approvals.

Just:

1. Connect Wallet
2. Pay with HBAR
3. Verify On-Chain
4. Access Services Instantly

---

✨ Key Features

- 🔐 HashPack Wallet Integration
- 💸 HBAR Payment Verification
- 🤖 AI-Powered Service Execution
- 📝 Hedera Consensus Service (HCS)
- 🪙 Hedera Token Service (HTS)
- 🌐 Agentic Commerce Protocol Support
- ⚡ Instant Access After Payment
- 🔍 Mirror Node Verification

---

🛠️ Services

Service| Cost| Description

🌤️ Weather API| 1 HBAR| Premium weather data access

📊 Market Data Feed| 2 HBAR| Live crypto market data

🤖 AI Research Reports| 5 HBAR| AI-generated research reports

📝 HCS Message Logger| 1 HBAR| Store messages on Hedera Consensus Service

🪙 HTS Token Creator| 2 HBAR| Create tokens on Hedera Token Service

🖼️ NFT Minter| 3 HBAR| Mint NFTs on Hedera

💹 DeFi Rates| 0.5 HBAR| Live DeFi rates from the Hedera ecosystem

---

🔄 How It Works

1. Connect your HashPack wallet via WalletConnect.
2. Select a service from the marketplace.
3. Send the required HBAR payment to HashPay.
4. HashPay verifies the transaction through the Hedera Mirror Node.
5. Access is automatically granted.
6. Chat with the AI agent and use the purchased service.

---

🏗️ Architecture

Frontend (HTML/JS + WalletConnect)
                │
                ▼
    HashPack signs HBAR transfer
                │
                ▼
          Hedera Testnet
                │
                ▼
Mirror Node API verifies transaction
                │
                ▼
 HashPay Backend (Node.js + Express)
                │
                ▼
 Hedera Agent Kit (LangChain + LangGraph)
                │
                ▼
           Service Layer

├── HCS Logger      → Hedera Consensus Service
├── Token Creator   → Hedera Token Service
├── NFT Minter      → Hedera Token Service
├── DeFi Rates      → CoinGecko API
└── AI Chat         → Groq (Llama 3.1)

---

🌐 Agentic Commerce Protocols

HashPay's payment-gated architecture draws on three emerging agentic commerce standards:

x402 — Payment Required

Protected endpoints follow the HTTP 402 "Payment Required" pattern.

A request without proof of payment is rejected with the required HBAR amount and recipient address. Once the Hedera Mirror Node confirms the transaction, access is granted automatically.

UCP (Universal Commerce Protocol)

The "/services" endpoint exposes a catalog of available services including:

- Service name
- Cost
- Description

This allows agents and users to discover purchasable services before initiating a transaction.

ACP (Agentic Commerce Protocol)

Once payment is verified, HashPay grants a scoped session that authorizes the AI agent to execute the purchased service on behalf of the user.

This mirrors ACP's token-based checkout and authorization model.

---

🚀 Setup

Clone the repository:

git clone https://github.com/abdoulxw3/hedera-commerce-agent
cd hedera-commerce-agent
npm install

Create a ".env" file:

ACCOUNT_ID="0.0.xxxxx"
PRIVATE_KEY="your_ecdsa_private_key"
GROQ_API_KEY="gsk_..."

Start the application:

node server.js

---

🧰 Technology Stack

- Hedera SDK
- Hedera Agent Kit
- Hedera Mirror Node API
- Hedera Consensus Service (HCS)
- Hedera Token Service (HTS)
- WalletConnect
- HashPack Wallet
- Node.js
- Express.js
- LangChain
- LangGraph
- Groq (Llama 3.1)

---

📄 License

MIT
