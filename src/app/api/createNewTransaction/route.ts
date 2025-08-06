import { createTransactionWithExpenses } from "@/backend/services/transactionServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { payerId, title, amount, splits } = body;

  try {
    const transaction = await createTransactionWithExpenses(
      payerId,
      title,
      amount,
      splits,
    );
    return NextResponse.json({ transaction: transaction });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
