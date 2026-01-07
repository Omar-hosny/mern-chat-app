export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
};

export type ChatItemType = {
  _id: string;
  name: string;
  avatar: string;
  lastMessageAt: string;
};

export type ContactItemType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
