import { prisma } from "../db";
import { Prisma } from "@prisma/client";

export type TransactionWithGroupMember = Prisma.TransactionGetPayload<{
  include: { groupMember: true };
}>;

// get transactions

export async function getTransactionsWithGroupMemberByGroupId(
  groupId: string,
): Promise<TransactionWithGroupMember[]> {
  return prisma.transaction.findMany({
    where: { groupId },
    include: { groupMember: true },
    orderBy: { createdAt: "desc" },
  });
}

// create transactions
export async function createTransaction(data: {
  groupId: string;
  groupMemberId: string;
  title: string;
  amount: number;
}) {
  return prisma.transaction.create({ data });
}
