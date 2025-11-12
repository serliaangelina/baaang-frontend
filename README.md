# Clanker Token Deployer - Frontend

Modern web interface for deploying tokens on Base blockchain using the Clanker SDK.

## Features

- Token deployment with customizable parameters
- IPFS image upload integration
- Real-time deployment status tracking
- Responsive design with fire-themed UI
- TypeScript for type safety

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Build

```bash
npm run build
```

## Configuration

Edit `.env` file to configure the backend API URL:

```
VITE_API_URL=http://localhost:3000
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Clanker SDK (backend)
