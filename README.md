# LUDO LEGENDS ONLINE 🎲👑

A high-performance, full-stack, real-time multiplayer Ludo gaming platform with custom Canvas game engine, tournament brackets, ELO matchmaking, AI bot engine, social features, shop/customizations, and replay capabilities.

![LUDO LEGENDS ONLINE](https://img.shields.io/badge/Game-Ludo%20Legends%20Online-6C5CE7?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-20.0-339933?style=for-the-badge&logo=nodedotjs)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7-010101?style=for-the-badge&logo=socketdotio)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)

---

## 🌟 Key Features

- **🎮 Custom 60fps HTML5 Canvas Engine**: Smooth token movements, particle effects, 3D dice rolls, custom board shaders.
- **⚡ Authoritative Real-Time Multiplayer**: Low-latency Socket.io synchronization with server-validated game moves.
- **🤖 Advanced AI Engine**: 3 difficulty levels (Easy, Medium, Hard) powered by heuristic decision matrices.
- **🏆 Competitive Tournaments**: Knockout and round-robin tournaments with automated bracket generation and prize distribution.
- **📊 ELO Rating & Leaderboards**: Skill-based ranks (Bronze to Legends), seasonal leaderboards, and detailed statistical tracking.
- **👥 Social & Chat Systems**: Global lobby channels, private messaging, in-game voice/text chat, animated emotes, and friends list.
- **🎨 Shop & Cosmetics**: Customize dice, tokens, board themes (Neon, Royal, Ice, Lava, Galaxy), and avatars.
- **📹 Replay & Spectator System**: Live spectator mode and full game replay playback engine.

---

## 🏗️ Architecture

```
LUDO LEGENDS ONLINE/
├── client/          — React 18 + Vite, Custom Canvas Engine, CSS Modules
├── server/          — Node.js + Express, Socket.io Server, Rules Engine, AI Engine
├── shared/          — Shared TypeScript interfaces, Board Constants, Event Specs
└── tests/           — Jest + Supertest Unit, Integration, & E2E Test Suites
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB >= 6.x
- Redis >= 7.x (Optional, falls back to in-memory)

### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/GaddamVasavi/LUDO-LEGENDS-ONLINE.git
cd LUDO-LEGENDS-ONLINE

# 2. Install dependencies across all workspaces
npm run install:all

# 3. Setup environment variables
cp .env.example .env

# 4. Start local Redis & MongoDB via Docker (Optional)
docker-compose up -d

# 5. Run development servers (Client + Server concurrently)
npm run dev
```

---

## 🧪 Testing

```bash
# Run all test suites
npm test

# Run individual test suites
npm run test:unit
npm run test:integration
```

---

## 📜 License

MIT License © 2026 Gaddam Vasavi & Ludo Legends Online Contributors.
