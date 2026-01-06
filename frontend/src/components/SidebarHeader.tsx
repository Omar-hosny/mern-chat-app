import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SidebarHeader = () => {
  return (
    <header
      className="flex items-center gap-2 p-2 border-b border-gray-200
    bg-slate-100  rounded-tl-2xl"
    >
      <div>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/36560971?v=4"
            alt="@Omar-hosny"
          />
          <AvatarFallback>OH</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="text-sm font-semibold">Omar Hosny</h1>
        <p className="text-xs text-gray-500">Online</p>
      </div>
    </header>
  );
};

export default SidebarHeader;
