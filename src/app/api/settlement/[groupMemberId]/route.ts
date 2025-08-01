import { NextRequest, NextResponse } from "next/server";
import { getActiveSettlementsByGroupMemberId } from "@/backend/services/settlementServices";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupMemberId: string }> },
) {
  const params = await context.params; // await here
  const groupMemberId = params.groupMemberId;

  const settlements = await getActiveSettlementsByGroupMemberId(groupMemberId);

  return NextResponse.json({ settlements: settlements });
}
