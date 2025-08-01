import { prisma } from "../db";

// get all instances of groupMember owing others
export async function getActiveDebtsByGroupMemberId(groupMemberId: string) {
  return prisma.$queryRaw<
    {
      payerId: string;
      payeeId: string;
      amount: number;
    }[]
  >`
    SELECT payer_id AS "payerId", payee_id AS "payeeId", amount_owed AS amount
    FROM settlement
    WHERE payee_id = ${groupMemberId}::uuid AND amount_owed > 0
  `;
}

// get all instances of others owing groupMember
export async function getActivePaymentsByGroupMemberId(groupMemberId: string) {
  return prisma.$queryRaw<
    {
      payerId: string;
      payeeId: string;
      amount: number;
    }[]
  >`
    SELECT payer_id AS "payerId", payee_id AS "payeeId", amount_owed AS amount
    FROM settlement
    WHERE payer_id = ${groupMemberId}::uuid AND amount_owed > 0
  `;
}
