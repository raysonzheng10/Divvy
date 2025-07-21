import { NextRequest, NextResponse } from "next/server";
import { getGroupWithGroupMembersByGroupMemberId } from "@/backend/services/groupServices";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupMemberId: string }> },
) {
  const params = await context.params; // await here
  const groupMemberId = params.groupMemberId;

  const groupWithGroupMembers =
    await getGroupWithGroupMembersByGroupMemberId(groupMemberId);

  if (!groupWithGroupMembers) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const { groupMembers, ...group } = groupWithGroupMembers;

  return NextResponse.json({ group: group, groupMembers: groupMembers });
}
