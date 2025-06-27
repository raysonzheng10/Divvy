import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserGroup } from "@/app/user/types";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  const params = await context.params;
  const userId = params.userId;

  const userGroups = await prisma.groupMember.findMany({
    where: { userId: userId },
    select: {
      id: true,
      group: true,
    },
  });

  // Reformat into proper type
  const userGroupsRes: UserGroup[] = userGroups.map((userGroup) => ({
    groupId: userGroup.group.id,
    groupMemberId: userGroup.id,
    groupName: userGroup.group.name,
  }));

  // * This can return an empty list
  return NextResponse.json({ userGroups: userGroupsRes });
}
