import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GroupUser } from "@/app/group/types";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  const params = await context.params; // await here
  const groupId = params.groupId;

  // now use id safely
  const groupMembers = await prisma.groupMember.findMany({
    where: { groupId: groupId },
    select: {
      id: true,
      user: { select: { name: true } },
    },
  });

  // Reformat into proper type
  const groupUsers: GroupUser[] = groupMembers.map((member) => ({
    groupMemberId: member.id,
    name: member.user.name,
  }));

  return NextResponse.json({ groupUsers: groupUsers });
}
