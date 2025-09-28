import { prisma } from "../db";
import {
  getGroupIdByGroupMemberId,
  getGroupMemberByUserIdAndGroupId,
  getGroupMembersWithGroupsByUserId,
} from "../repositories/groupMemberRepo";
import { getGroupWithGroupMembersById } from "../repositories/groupRepo";
import { Group } from "@/app/home/types";
import { getUserById } from "../repositories/userRepo";

export async function getGroupWithGroupMembersByGroupMemberId(
  groupMemberId: string,
) {
  const groupId = await getGroupIdByGroupMemberId(groupMemberId);

  if (!groupId) return null;

  const groupWithGroupMembers = await getGroupWithGroupMembersById(groupId);
  return groupWithGroupMembers;
  //TODO: probably define a type to handle groupWithGroupMembers
}

export async function getGroupsByUserId(userId: string) {
  const groupMembersWithGroups =
    await getGroupMembersWithGroupsByUserId(userId);

  const groups: Group[] = groupMembersWithGroups.map(
    (groupMemberWithGroup) => ({
      id: groupMemberWithGroup.groupId,
      groupName: groupMemberWithGroup.group.name,
      description: groupMemberWithGroup.group.description,
    }),
  );

  return groups;
}

export async function checkUserIsInGroup(userId: string, groupId: string) {
  const groupMember = await getGroupMemberByUserIdAndGroupId(userId, groupId);
  return groupMember != null;
}

export async function createNewGroupByUserId(userId: string) {
  const user = await getUserById(userId);

  if (!user) throw new Error("User not found");

  return prisma.$transaction(async (tx) => {
    const newGroup = await tx.group.create({
      data: {
        name: "New Group",
        description: "Your New Group!",
      },
    });
    await tx.groupMember.create({
      data: {
        userId: userId,
        groupId: newGroup.id,
        nickname: user.email,
      },
    });

    return {
      id: newGroup.id,
      groupName: newGroup.name,
      description: newGroup.description,
    };
  });
}
