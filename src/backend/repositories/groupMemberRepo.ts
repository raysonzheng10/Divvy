import { prisma } from "../db";

// get groupMembers
export async function getGroupMemberById(id: string) {
  return prisma.groupMember.findUnique({ where: { id } });
}

export async function getGroupMembersByUserId(userId: string) {
  return prisma.groupMember.findMany({ where: { userId } });
}
// create groupMembers
export async function createGroupMember(data: {
  userId: string;
  groupId: string;
}) {
  return prisma.group.create({ data });
}
