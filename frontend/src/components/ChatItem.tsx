import { Link } from "react-router";
import type { ChatItemType, ContactItemType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "../store/useAuthStore";

const ChatItem = ({
  chat,
  contact,
  isChat = false,
}: {
  chat?: ChatItemType;
  contact?: ContactItemType;
  isChat?: boolean;
}) => {
  // We select only onlineUsers to prevent unnecessary re-renders
  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  const id = isChat ? chat?._id : contact?._id;

  // Important: Ensure the ID exists and check if it's in the array
  const isUserOnline = id ? onlineUsers.includes(id) : false;
  return (
    <Link
      to={`/chat/${id}`}
      className="flex items-center gap-2 p-2 border-b border-gray-200"
    >
      <div>
        <Avatar>
          <AvatarImage
            src={isChat ? chat?.avatar : contact?.avatar}
            alt={isChat ? chat?.name : contact?.name}
          />
          <AvatarFallback>
            {isChat ? chat?.name.charAt(0) : contact?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold">
          {isChat ? chat?.name : contact?.name}
        </h3>
        <p className="text-xs text-gray-500">
          {isUserOnline ? "Online" : "Offline"}
        </p>
      </div>
    </Link>
  );
};

export default ChatItem;
