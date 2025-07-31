import { prisma } from "../db";

// get all instances of groupMember owing others
export async function getDebtsByGroupMemberId(groupMemberId: string) {
  return prisma.$queryRaw<
    {
      payerId: string;
      payeeId: string;
      amount: number;
    }[]
  >`
    SELECT payer_id AS "payerId", payee_id AS "payeeId", amount_owed AS amount
    FROM expense_settlements
    WHERE payer_id = ${groupMemberId} AND amount_owed > 0
  `;
}

// get all instances of others owing groupMember
export async function getPaymentsByGroupMemberId(groupMemberId: string) {
  return prisma.$queryRaw<
    {
      payerId: string;
      payeeId: string;
      amount: number;
    }[]
  >`
    SELECT payer_id AS "payerId", payee_id AS "payeeId", amount_owed AS amount
    FROM expense_settlements
    WHERE payee_id = ${groupMemberId} AND amount_owed > 0
  `;
}
