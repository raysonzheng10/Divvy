import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/app/utils/auth";
import {
  checkUserIsInGroup,
  getGroupWithGroupMembersByGroupId,
} from "@/backend/services/groupServices";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const groupId = (await context.params).groupId;

    if (!(await checkUserIsInGroup(authUser.id, groupId))) {
      return NextResponse.json(
        { error: "User is not a part of this group" },
        { status: 400 },
      );
    }

    const groupWithGroupMembers =
      await getGroupWithGroupMembersByGroupId(groupId);
    return NextResponse.json({
      group: groupWithGroupMembers.group,
      groupMembers: groupWithGroupMembers.groupMembers,
    });
  } catch (err: unknown) {
    console.error("Error in POST /users:", err);
    let message = "Server error";
    if (err instanceof Error) message = err.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
