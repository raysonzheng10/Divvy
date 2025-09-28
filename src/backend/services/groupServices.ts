import {
  createGroupMember,
  getGroupIdByGroupMemberId,
  getGroupMemberByUserIdAndGroupId,
  getGroupMembersWithGroupsByUserId,
} from "../repositories/groupMemberRepo";
import {
  createGroup,
  getGroupWithGroupMembersById,
} from "../repositories/groupRepo";
import { UserGroup } from "@/app/home/types";
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

  const userGroups: UserGroup[] = groupMembersWithGroups.map(
    (groupMemberWithGroup) => ({
      groupId: groupMemberWithGroup.groupId,
      groupMemberId: groupMemberWithGroup.id,
      groupName: groupMemberWithGroup.group.name,
    }),
  );

  return userGroups;
}

export async function checkUserIsInGroup(userId: string, groupId: string) {
  const groupMember = await getGroupMemberByUserIdAndGroupId(userId, groupId);
  return groupMember != null;
}

export async function createNewGroupByUserId(userId: string) {
  const newGroup = await createGroup({
    name: "New Group",
    description: "Your New Group!",
  });

  const user = await getUserById(userId);

  if (!user) throw new Error("User not found");

  const newGroupMember = await createGroupMember({
    userId: userId,
    groupId: newGroup.id,
    nickname: user.email,
  });

  const userGroup: UserGroup = {
    groupId: newGroup.id,
    groupMemberId: newGroupMember.id,
    groupName: newGroup.name,
  };

  return userGroup;
}
