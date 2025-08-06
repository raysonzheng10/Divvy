import { createGroupMember } from "@/backend/repositories/groupMemberRepo";
import { getUserById } from "@/backend/repositories/userRepo";
import { checkUserIsInGroup } from "@/backend/services/groupServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, groupId } = body;

  if (!userId || !groupId || groupId.trim() === "") {
    return NextResponse.json(
      { error: "Missing userId or groupId" },
      { status: 400 },
    );
  }

  try {
    if (await checkUserIsInGroup(userId, groupId)) {
      return NextResponse.json(
        { error: "User is already in the group" },
        { status: 400 },
      );
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "UserId is invalid" }, { status: 400 });
    }

    const newGroupMember = await createGroupMember({
      userId: userId,
      groupId: groupId,
      nickname: user.email,
    });

    return NextResponse.json({ groupMemberId: newGroupMember.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
