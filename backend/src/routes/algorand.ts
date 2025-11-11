import express from "express";
import {
  sendTransaction,
  getTransactionStatus,
  getTransactions,
} from "../controllers/algorandController.js";

const router = express.Router();

router.post("/send", sendTransaction);
router.get("/status/:txId", getTransactionStatus);
router.get("/transactions", getTransactions);

export default router;
