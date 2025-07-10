import { NextRequest, NextResponse } from "next/server";
import { getGroupsForUserId } from "@/backend/services/groupServices";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  const params = await context.params;
  const userId = params.userId;

  const userGroups = await getGroupsForUserId(userId);

  // * This can return an empty list
  return NextResponse.json({ userGroups: userGroups });
}
