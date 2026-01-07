import { LoaderCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SidebarHeader = () => {
  const { user, isLoading } = useAuth();
  return (
    <header
      className="flex items-center gap-2 p-2 border-b border-gray-200
    bg-slate-100  rounded-tl-2xl"
    >
      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full">
        {isLoading ? (
          <LoaderCircle className="w-6 h-6 text-gray-500 animate-spin" />
        ) : (
          <Avatar>
            <AvatarImage
              src={user?.avatar || "/noavatar.png"}
              alt={user?.name || "User"}
            />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="text-sm font-semibold">{user?.name || "User"}</h1>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </header>
  );
};

export default SidebarHeader;
