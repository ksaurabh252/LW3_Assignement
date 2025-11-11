# Algorand Transaction Manager - MERN Stack

A full-stack MERN application for sending and tracking Algorand transactions on TestNet.

## 🚀 Features

- **Send ALGO Transactions** on Algorand TestNet
- **Real-time Transaction Tracking** with status updates
- **MongoDB Storage** for transaction history
- **React + TypeScript** frontend with modern UI
- **Express + TypeScript** backend with RESTful API
- **Responsive Design** with Tailwind CSS

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Algorand TestNet Account** (for testing)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd algorand-mern-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

**Edit `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/algorand-app
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443
ALGOD_TOKEN=
```

**Start Backend:**

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Quick Start Guide

### 1. Get TestNet ALGO Tokens

1. Visit [Algorand TestNet Faucet](https://bank.testnet.algorand.network/)
2. Get test tokens for your address

### 2. Send Your First Transaction

1. **Open the application** at `http://localhost:5173`
2. **Fill the transaction form:**

   - **Sender Address**: Pre-filled with test address
   - **Recipient Address**: Enter any TestNet address
   - **Amount**: Enter amount in microALGOs (1 ALGO = 1,000,000 microALGOs)
   - **Mnemonic**: Enter 25-word mnemonic of sender account
   - **Note**: Optional transaction note

3. **Click "Send Transaction"**
4. **Monitor** the transaction in the transaction list

### 3. Track Transactions

- View all transactions in real-time
- See status: Pending → Confirmed/Failed
- Click "View on Explorer" for detailed view
- Auto-refresh every 10 seconds

## 📡 API Endpoints

### Backend API (Port 5000)

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/api/algorand/send`         | Send ALGO transaction    |
| GET    | `/api/algorand/status/:txId` | Check transaction status |
| GET    | `/api/algorand/transactions` | Get all transactions     |

## 🗄️ Database Schema

```javascript
{
  txId: String,           // Algorand transaction ID
  from: String,           // Sender address
  to: String,             // Recipient address
  amount: Number,         // Amount in microALGOs
  status: String,         // pending/confirmed/failed
  note: String,           // Optional transaction note
  confirmedRound: Number, // Block confirmation round
  createdAt: Date         // Transaction creation timestamp
}
```

## 🛠️ Development Scripts

### Backend Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

### Frontend Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Algorand TestNet Settings

- **Network**: TestNet only
- **Node**: `https://testnet-api.algonode.cloud`
- **Port**: `443`
- **Token**: Not required (free tier)

### Test Account (Provided)

- **Address**: `TW3A32K4HPTDKDH3DH645EYL46P37NA2T622MITEXT1850U`
- Use this for testing with corresponding mnemonic

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**

   ```bash
   # Check if backend is running on port 5000
   curl http://localhost:5000/api/algorand/transactions
   ```

2. **MongoDB Connection Error**

   ```bash
   # Start MongoDB service
   mongod
   ```

3. **Algorand Connection Failed**

   - Check internet connection
   - Verify Algod server URL in `.env`

4. **Invalid Mnemonic**

   - Use valid 25-word Algorand mnemonic
   - Ensure sender address matches mnemonic

5. **Transaction Fails**
   - Verify sender has sufficient balance
   - Check addresses are valid TestNet addresses

### Ports in Use

- **Backend**: 5000
- **Frontend**: 5173
- **MongoDB**: 27017

## 🔗 Useful Links

- **AlgoExplorer**: https://testnet.algoexplorer.io
- **TestNet Faucet**: https://bank.testnet.algorand.network
- **Algorand Docs**: https://developer.algorand.org
- **AlgoNode**: https://algonode.io

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Backend**: `✅ Connected to Algorand TestNet. Last round: [number]`
2. **Frontend**: Clean UI with transaction form and list
3. **Database**: Transactions stored in MongoDB
4. **Transactions**: Status updates from pending → confirmed

## 📝 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all services are running (MongoDB, Backend, Frontend)
3. Check console for error messages
4. Ensure environment variables are correctly set

---
