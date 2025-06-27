export interface Group {
  id: string;
  createdAt: string;
  name: string | null;
  description: string | null;
}

export interface GroupUser {
  groupMemberId: string;
  name: string | null;
}
