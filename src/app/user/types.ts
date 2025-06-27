export interface User {
  id: string;
  createdAt: string;
  name: string | null;
  email: string;
}

export interface UserGroup {
  groupId: string;
  groupMemberId: string;
  groupName: string | null;
}
