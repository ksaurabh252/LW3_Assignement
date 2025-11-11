import { Request, Response } from "express";
import algosdk from "algosdk";
import Transaction from "../models/Transaction.js";
import { z } from "zod";

// Algorand client configuration
const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN || "",
  process.env.ALGOD_SERVER || "https://testnet-api.algonode.cloud",
  process.env.ALGOD_PORT || 443
);

// Validation schemas
const sendTransactionSchema = z.object({
  from: z.string().min(58).max(58),
  to: z.string().min(58).max(58),
  amount: z.number().min(0),
  mnemonic: z.string(),
  note: z.string().optional(),
});

// Validate Algorand connection -
const validateAlgorandConnection = async () => {
  try {
    const status = await algodClient.status().do();

    console.log(
      "✅ Connected to Algorand TestNet. Last round:",
      status["lastRound"]
    );
    return true;
  } catch (error) {
    console.error("❌ Algorand connection failed:", error);
    throw new Error(
      "Cannot connect to Algorand TestNet. Check your node configuration."
    );
  }
};

export const sendTransaction = async (req: Request, res: Response) => {
  try {
    // Validate Algorand connection first - AWAIT INSIDE ASYNC FUNCTION ✅
    await validateAlgorandConnection();

    const validationResult = sendTransactionSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Invalid input",
        details: validationResult.error.issues,
      });
    }

    const { from, to, amount, mnemonic, note } = validationResult.data;

    // Validate mnemonic and get account
    let account: algosdk.Account;
    try {
      account = algosdk.mnemonicToSecretKey(mnemonic);
    } catch (error) {
      return res.status(400).json({ error: "Invalid mnemonic format" });
    }

    // Verify sender address matches mnemonic
    if (account.addr.toString() !== from) {
      return res.status(400).json({
        error: "Sender address does not match mnemonic",
      });
    }

    // Get suggested transaction parameters
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Create transaction (amount is in microAlgos)
    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from,
      to,
      amount,
      suggestedParams,
      note: note ? new Uint8Array(Buffer.from(note)) : undefined,
    });
    // Sign transaction
    const signedTxn = transaction.signTxn(account.sk);

    // Send transaction
    const sendResult = await algodClient.sendRawTransaction(signedTxn).do();
    const txId = sendResult.txid;

    // Save to database
    const dbTransaction = new Transaction({
      txId,
      from,
      to,
      amount,
      note,
      status: "pending",
    });
    await dbTransaction.save();

    res.json({
      success: true,
      txId,
      message: "Transaction submitted successfully",
    });
  } catch (error: any) {
    console.error("Send transaction error:", error);
    res.status(500).json({
      error: "Failed to send transaction",
      details: error.message,
    });
  }
};

export const getTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { txId } = req.params;

    // Check database first
    let dbTransaction = await Transaction.findOne({ txId });

    if (!dbTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    try {
      // Check Algorand network status
      const pendingInfo = await algodClient
        .pendingTransactionInformation(txId)
        .do();

      if (pendingInfo["confirmedRound"]) {
        dbTransaction.status = "confirmed";
        dbTransaction.confirmedRound = pendingInfo["confirmedRound"];
        await dbTransaction.save();
      } else if (pendingInfo["poolError"]) {
        dbTransaction.status = "failed";
        await dbTransaction.save();
      }
    } catch (networkError) {
      console.error("Network status check error:", networkError);
    }

    res.json(dbTransaction);
  } catch (error: any) {
    console.error("Get transaction status error:", error);
    res.status(500).json({
      error: "Failed to get transaction status",
      details: error.message,
    });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(transactions);
  } catch (error: any) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      error: "Failed to fetch transactions",
      details: error.message,
    });
  }
};
