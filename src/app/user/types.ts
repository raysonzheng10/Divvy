export interface User {
  id: string;
  createdAt: string;
  email: string;
}

export interface UserGroup {
  groupId: string;
  groupMemberId: string;
  groupName: string | null;
}
