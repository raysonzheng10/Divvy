import { prisma } from "../db";

// get groupMembers
export async function getGroupMemberById(id: string) {
  return prisma.groupMember.findUnique({ where: { id } });
}

export async function getGroupMemberByUserIdAndGroupId(
  userId: string,
  groupId: string,
) {
  return prisma.groupMember.findUnique({
    where: {
      userId_groupId: {
        userId,
        groupId,
      },
    },
  });
}

export async function getGroupMembersByUserId(userId: string) {
  return prisma.groupMember.findMany({ where: { userId } });
}

export async function getGroupMembersWithGroupsByUserId(userId: string) {
  return prisma.groupMember.findMany({
    where: { userId },
    include: { group: true },
  });
}

// create groupMembers
export async function createGroupMember(data: {
  userId: string;
  groupId: string;
}) {
  return prisma.groupMember.create({ data });
}
