HEAD~1# ⚡ HashPay — Payment-Gated Services on Hedera

> A full-stack Web3 commerce agent built on the Hedera network. Pay HBAR, get instant access to on-chain services. Implements x402, UCP, and ACP agentic commerce protocols.

## 🌐 Live Demo
**[https://hashpay.up.railway.app](https://hashpay.up.railway.app)**

## 🎯 What is HashPay?

HashPay is a payment-gated service platform powered by Hedera. Users connect their Hedera wallet, send HBAR, and the agent verifies the on-chain transaction before unlocking access — no middleman, no trust required.

Built for the **Hedera AI Bounty Week 4 — Commerce Agent**.

## 🛠️ Services

| Service | Cost | Description |
|---|---|---|
| 🌤️ Weather API | 1 HBAR | Premium weather data access |
| 📊 Market Data Feed | 2 HBAR | Live crypto market data |
| 🤖 AI Research Reports | 5 HBAR | AI-generated research reports |
| 📝 HCS Message Logger | 1 HBAR | Store messages on Hedera Consensus Service |
| 🪙 HTS Token Creator | 2 HBAR | Create your own token on Hedera Token Service |
| 🖼️ NFT Minter | 3 HBAR | Mint an NFT on Hedera |
| 💹 DeFi Rates | 0.5 HBAR | Live DeFi rates from Hedera ecosystem |

## 🔄 How It Works
Connect HashPack wallet via WalletConnect
Pick a service — send HBAR to HashPay
Agent verifies payment on Hedera Mirror Node
Access granted — chat with AI agent to use service.
## 🌐 Agentic Commerce Protocols

HashPay implements three emerging agent commerce standards:

### x402 — HTTP Payment Protocol
Any endpoint returns HTTP 402 with HBAR payment requirements:
Frontend (HTML/JS + WalletConnect)
↓ HashPack signs HBAR transfer
Hedera Testnet
↓ Mirror Node API (transaction verification)
HashPay Backend (Node.js + Express)
↓
Hedera Agent Kit (LangChain + LangGraph)
↓
Service Layer:
├── HCS Logger      → Hedera Consensus Service
├── Token Creator   → Hedera Token Service
├── NFT Minter      → Hedera Token Service
├── DeFi Rates      → CoinGecko API
└── AI Chat         → Groq (LLama 3.1)

Create .env:
ACCOUNT_ID="0.0.xxxxx"
PRIVATE_KEY="your_ecdsa_private_key"
GROQ_API_KEY="gsk_..."

node server.js
📄 License
MIT
