import {
  createGroupMember,
  getGroupMemberByUserIdAndGroupId,
  getGroupMembersWithGroupsByUserId,
} from "../repositories/groupMemberRepo";
import { createGroup } from "../repositories/groupRepo";
import { UserGroup } from "@/app/user/types";

export async function getGroupsForUserId(userId: string) {
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

export async function createNewGroupForUserId(userId: string) {
  const newGroup = await createGroup({
    name: "New Group",
    description: "Your New Group!",
  });

  const newGroupMember = await createGroupMember({
    userId: userId,
    groupId: newGroup.id,
  });

  const userGroup: UserGroup = {
    groupId: newGroup.id,
    groupMemberId: newGroupMember.id,
    groupName: newGroup.name,
  };

  return userGroup;
}

export async function checkUserIsInGroup(userId: string, groupId: string) {
  const groupMember = await getGroupMemberByUserIdAndGroupId(userId, groupId);
  return groupMember != null;
}
