import { useEffect, useRef } from "react";
import type { MessageItemType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "../store/useAuthStore";

const MessageItem = ({ message }: { message: MessageItemType }) => {
  const { authUser } = useAuthStore();
  const currentUserId = authUser?.id;
  const ref = useRef<HTMLDivElement>(null);
  // format createdAt to dd/mm/yyyy
  const messageDate = new Date(message.createdAt);
  const createdAt = messageDate.toLocaleString();

  const messageSenderId = message.senderId._id || message.senderId;

  // for determine show which avatar to show
  const getAvatar = () => {
    if (currentUserId === messageSenderId) {
      return authUser?.avatar;
    } else {
      return message.senderId.avatar;
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 p-2 rounded-2xl w-full ${
        messageSenderId === currentUserId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex  flex-col gap-2 rounded-2xl p-2 w-fit text-white ${
          messageSenderId === currentUserId
            ? "justify-end  bg-blue-600 rounded-br-none  "
            : "justify-start bg-gray-400 rounded-bl-none "
        }`}
      >
        <div className="flex items-start gap-2">
          <Avatar>
            <AvatarImage
              src={getAvatar()}
              alt={message.senderId.name || "User"}
            />
            <AvatarFallback>{message.senderId.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-gray-100">{message.text}</p>
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
