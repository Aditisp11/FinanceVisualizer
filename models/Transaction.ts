// models/Transaction.ts
import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  amount: Number,
  date: Date,
  description: String,
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
