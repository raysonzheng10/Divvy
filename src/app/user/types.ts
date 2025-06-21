export interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

export interface UserGroup {
  groupMemberId: string;
  groupName: string | null;
}
