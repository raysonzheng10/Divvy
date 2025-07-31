import { prisma } from "../db";
import { getGroupIdByGroupMemberId } from "../repositories/groupMemberRepo";
import { getTransactionsWithGroupMemberByGroupId } from "../repositories/transactionRepo";

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

    await Promise.all(
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

    return transaction;
  });
}

export async function getTransactionsByGroupMemberId(groupMemberId: string) {
  const groupId = await getGroupIdByGroupMemberId(groupMemberId);

  if (!groupId) throw new Error("Invalid groupMemberId, no matching groupId");

  const transactions = await getTransactionsWithGroupMemberByGroupId(groupId);
  return transactions;
}
