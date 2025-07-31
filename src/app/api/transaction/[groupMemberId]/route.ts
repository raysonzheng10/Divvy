import { NextRequest, NextResponse } from "next/server";
import { getTransactionsByGroupMemberId } from "@/backend/services/transactionServices";
import { Transaction } from "@/app/group/types";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupMemberId: string }> },
) {
  const params = await context.params; // await here
  const groupMemberId = params.groupMemberId;

  const rawTransactions = await getTransactionsByGroupMemberId(groupMemberId);

  const transactions: Transaction[] = rawTransactions.map((rt) => {
    return {
      groupMemberId: rt.groupMemberId,
      createdAt: rt.createdAt,
      title: rt.title,
      amount: rt.amount.toNumber(),
      id: rt.id,
      groupId: rt.groupId,
      paidBy: rt.groupMember.nickname,
    };
  });

  return NextResponse.json({ transactions: transactions });
}
