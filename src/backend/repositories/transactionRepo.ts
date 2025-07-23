import { prisma } from "../db";

// get transactions

// create transactions
export async function createTransaction(data: {
  groupId: string;
  groupMemberId: string;
  title: string;
  amount: number;
}) {
  return prisma.transaction.create({ data });
}
