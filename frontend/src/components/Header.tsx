import { MessageSquareText } from "lucide-react";
const Header = () => {
  return (
    <header className="w-full items-center flex justify-center">
      <div className="flex items-center gap-2">
        <MessageSquareText className="text-2xl text-blue-500" />
        <span className="text-2xl text-blue-500 ">HiChat</span>
      </div>
    </header>
  );
};

export default Header;
