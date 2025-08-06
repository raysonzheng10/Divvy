import {
  getActiveDebtsByGroupMemberId,
  getActivePaymentsByGroupMemberId,
} from "../repositories/settlementRepo";

export async function getActiveSettlementsByGroupMemberId(
  groupMemberId: string,
): Promise<Record<string, number>> {
  const debts = await getActiveDebtsByGroupMemberId(groupMemberId);
  const payments = await getActivePaymentsByGroupMemberId(groupMemberId);

  const settlements: Record<string, number> = {};

  // Others paid you → positive balance
  for (const { payeeId, amount } of payments) {
    settlements[payeeId] = amount;
  }

  // You owe others → negative balance
  for (const { payerId, amount } of debts) {
    settlements[payerId] = (settlements[payerId] ?? 0) - amount;
  }

  return settlements;
}
