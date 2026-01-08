import type { MessageItemType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const MessageItem = ({
  message,
  currentUserId,
}: {
  message: MessageItemType;
  currentUserId: string;
}) => {
  // format createdAt to dd/mm/yyyy
  const messageDate = new Date(message.createdAt);
  const createdAt = messageDate.toLocaleString();
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-2xl w-full ${
        message.senderId._id === currentUserId
          ? "justify-end "
          : "justify-start "
      }`}
    >
      <div
        className={`flex  flex-col gap-2 rounded-2xl p-2 w-fit text-white ${
          message.senderId._id === currentUserId
            ? "justify-end  bg-blue-600 rounded-br-none  "
            : "justify-start bg-teal-700 rounded-bl-none "
        }`}
      >
        <div className="flex items-start gap-2">
          <Avatar>
            <AvatarImage
              src={message.senderId.avatar || "/noavatar.png"}
              alt={message.senderId.name || "User"}
            />
            <AvatarFallback>{message.senderId.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <p className="text-sm">{message.text}</p>
        </div>
        {message.image && (
          <img
            src={message.image}
            alt="image"
            className="w-full max-h-[300px] object-cover"
          />
        )}
        <span className="text-xs text-gray-200">{createdAt}</span>
      </div>
    </div>
  );
};

export default MessageItem;
