import { prisma } from "../db";

// get expenses

// create expenses
export async function createExpense(data: {
  groupMemberId: string;
  transactionId: string;
  amount: number;
}) {
  return prisma.expense.create({ data });
}
