export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  createdAt: string;
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

export interface MessageItemType {
  _id: string;
  senderId: { _id: string; name: string; avatar: string };
  receiverId: { _id: string; name: string; avatar: string };
  text: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
