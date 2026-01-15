import { useAuthStore } from "../store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatHeader = ({
  partner,
}: {
  partner?: {
    _id: string;
    name: string;
    avatar: string;
  };
}) => {
  const { onlineUsers } = useAuthStore();

  if (!partner) return null;
  const isOnlineUser = onlineUsers?.includes(partner._id);

  return (
    <div
      className=" h-16 gap-2 flex items-start justify-center 
    rounded-2xl p-2"
    >
      <Avatar className="w-10 h-10 border border-gray-200">
        <AvatarImage
          src={partner.avatar || "/noavatar.png"}
          alt={partner.name}
        />
        <AvatarFallback>{partner.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold">{partner.name}</p>
        <p className="text-xs text-gray-800">
          {isOnlineUser ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
