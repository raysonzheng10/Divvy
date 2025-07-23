import { prisma } from "../db";
import { getGroupIdByGroupMemberId } from "../repositories/groupMemberRepo";

type Split = {
  groupMemberId: string;
  amount: number;
};

export async function createTransactionWithExpenses(
  payerId: string,
  title: string,
  amount: number,
  splits: Split[],
) {
  const groupId = await getGroupIdByGroupMemberId(payerId);

  if (!groupId) throw new Error("PayerId does not link to valid GroupId");

  return prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.create({
      data: {
        groupId,
        groupMemberId: payerId,
        title,
        amount,
      },
    });

    console.log(transaction);
    const expenses = await Promise.all(
      splits.map((split: Split) => {
        return tx.expense.create({
          data: {
            groupMemberId: split.groupMemberId,
            transactionId: transaction.id,
            amount: split.amount,
          },
        });
      }),
    );
    console.log(expenses);
    return transaction;
  });
}
