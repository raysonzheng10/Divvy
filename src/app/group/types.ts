export interface Group {
  name: string | null;
  description: string | null;
  id: string;
  createdAt: Date;
}

export interface GroupMember {
  id: string;
  createdAt: Date;
  nickname: string;
}

export interface Transaction {
  groupMemberId: string;
  createdAt: Date;
  title: string;
  amount: number;
  id: string;
  groupId: string;
  paidBy: string;
}
