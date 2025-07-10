import { getGroupMembersWithGroupsByUserId } from "../repositories/groupMemberRepo";
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
