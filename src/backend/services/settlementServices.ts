import {
  getDebtsByGroupMemberId,
  getPaymentsByGroupMemberId,
} from "../repositories/expenseSettlmentRepo";

export async function getSettlementsByGroupMemberId(groupMemberId: string) {
  const debts = await getDebtsByGroupMemberId(groupMemberId);
  const payments = await getPaymentsByGroupMemberId(groupMemberId);
}
