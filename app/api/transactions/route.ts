// app/api/transactions/route.ts
import { connectToDatabase } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const transaction = await Transaction.create(body);
  return NextResponse.json(transaction);
}
