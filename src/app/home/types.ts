export interface User {
  id: string;
  createdAt: string;
  email: string;
}

export interface Group {
  id: string;
  groupName: string | null;
  description: string | null;
}
