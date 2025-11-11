## Algorand MERN Frontend

React + TypeScript frontend for managing Algorand transactions on TestNet.

### 🚀 Features

- Send ALGO transactions on TestNet
- Real-time transaction status tracking
- Transaction history with explorer links
- Responsive design with Tailwind CSS
- Form validation and error handling

### 📋 Prerequisites

- Node.js (v18 or higher)
- Backend server running on port 5000

### 🔧 Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Ensure backend is running on `http://localhost:5000`
   - No environment variables needed for frontend

### 🏃‍♂️ Running the Application

**Development mode:**

```bash
npm run dev
```

App will run on `http://localhost:5173`

**Production build:**

```bash
npm run build
npm preview
```

### 🎨 UI Components

#### Transaction Form

- Sender address input (pre-filled with test address)
- Recipient address input
- Amount in microALGOs
- 25-word mnemonic input
- Optional transaction note
- Real-time form validation

#### Transaction List

- Real-time status updates (auto-refresh every 10 seconds)
- Status badges with colors
- Transaction details
- AlgoExplorer links
- Manual status refresh

### 📱 Features Overview

**Send Transaction:**

1. Enter recipient address
2. Specify amount in microALGOs
3. Provide sender mnemonic
4. Add optional note
5. Submit transaction

**Track Transactions:**

- View all transactions in real-time
- See transaction status (pending/confirmed/failed)
- Check confirmation rounds
- Open in AlgoExplorer for details

### 🛠️ Development

**Project Structure:**

```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionList.tsx
│   │   └── Toast.tsx
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json
└── vite.config.ts
```

**Key Dependencies:**

- React 18 + TypeScript
- Axios for API calls
- Tailwind CSS for styling
- Vite as build tool

**Available Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### 🔌 API Integration

**Base URL:** `http://localhost:5000/api/algorand`

**Endpoints Used:**

- `POST /send` - Send new transaction
- `GET /status/:txId` - Check transaction status
- `GET /transactions` - Get transaction history

### 🎯 Usage Guide

1. **Get TestNet ALGOs:**

   - Visit https://bank.testnet.algorand.network/
   - Fund your test account

2. **Send Transaction:**

   - Fill recipient address
   - Enter amount (in microALGOs)
   - Provide mnemonic of sender account
   - Click "Send Transaction"

3. **Monitor Transactions:**
   - View transaction list on right side
   - Status auto-updates every 10 seconds
   - Click refresh button for immediate update
   - Click "View on Explorer" for detailed view

### ⚠️ Important Notes

- **TestNet Only**: Only works with Algorand TestNet
- **Mnemonic Security**: Never use real account mnemonics
- **Amount Format**: All amounts in microALGOs
- **Auto-refresh**: Transactions auto-update every 10 seconds

### 🐛 Troubleshooting

**Common Issues:**

1. **Backend Connection Failed**

   - Ensure backend is running on port 5000
   - Check console for CORS errors

2. **Transaction Fails**

   - Verify mnemonic is correct
   - Check sender has sufficient balance
   - Ensure addresses are valid TestNet addresses

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript compiler errors

### 🔗 Links

- **AlgoExplorer**: https://testnet.algoexplorer.io
- **TestNet Faucet**: https://bank.testnet.algorand.network
- **Algorand Documentation**: https://developer.algorand.org
