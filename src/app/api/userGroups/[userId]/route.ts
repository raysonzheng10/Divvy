import { NextRequest, NextResponse } from "next/server";
import { getGroupsByUserId } from "@/backend/services/groupServices";

// TODO: change the file path of this file to /api/group/[userId]/route.ts
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  const params = await context.params;
  const userId = params.userId;

  const userGroups = await getGroupsByUserId(userId);

  // * This can return an empty list
  return NextResponse.json({ userGroups: userGroups });
}
