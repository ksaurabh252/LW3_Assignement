## Algorand MERN Backend

This is the Express.js + TypeScript backend for the Algorand Transaction Manager application.

### 🚀 Features

- RESTful API for Algorand transactions
- MongoDB integration for transaction storage
- Algorand TestNet integration
- TypeScript support
- Error handling and validation

### 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Algorand TestNet account

### 🔧 Installation

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Copy `.env.example` to `.env`
   - Configure environment variables:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/algorand-app
   ALGOD_SERVER=https://testnet-api.algonode.cloud
   ALGOD_PORT=443
   ALGOD_TOKEN=
   ```

### 🏃‍♂️ Running the Application

**Development mode:**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

### 📡 API Endpoints

#### 1. Send Transaction

**POST** `/api/algorand/send`

**Request Body:**

```json
{
  "from": "SENDER_ADDRESS",
  "to": "RECIPIENT_ADDRESS",
  "amount": 1000000,
  "mnemonic": "25_word_mnemonic",
  "note": "Optional note"
}
```

**Response:**

```json
{
  "success": true,
  "txId": "TRANSACTION_ID",
  "message": "Transaction submitted successfully"
}
```

#### 2. Get Transaction Status

**GET** `/api/algorand/status/:txId`

**Response:**

```json
{
  "_id": "MONGO_ID",
  "txId": "TRANSACTION_ID",
  "from": "SENDER_ADDRESS",
  "to": "RECIPIENT_ADDRESS",
  "amount": 1000000,
  "status": "pending",
  "note": "Transaction note",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### 3. Get All Transactions

**GET** `/api/algorand/transactions`

**Response:**

```json
[
  {
    "_id": "MONGO_ID",
    "txId": "TRANSACTION_ID",
    "from": "SENDER_ADDRESS",
    "to": "RECIPIENT_ADDRESS",
    "amount": 1000000,
    "status": "confirmed",
    "note": "Transaction note",
    "confirmedRound": 123456,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 🗄️ Database Schema

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

### 🔧 Configuration

**Algorand TestNet Settings:**

- Server: `https://testnet-api.algonode.cloud`
- Port: `443`
- Network: TestNet only

### 🛠️ Development

**Project Structure:**

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.ts        # Server entry point
├── package.json
└── .env
```

**Available Scripts:**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### 🐛 Troubleshooting

**Common Issues:**

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check `MONGODB_URI` in .env file

2. **Algorand Connection Failed**

   - Check internet connection
   - Verify Algod server URL

3. **Invalid Mnemonic**
   - Use valid 25-word Algorand mnemonic
   - Ensure sender address matches mnemonic

---
