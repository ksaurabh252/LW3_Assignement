import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  txId: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "failed"],
    default: "pending",
  },
  note: String,
  confirmedRound: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
