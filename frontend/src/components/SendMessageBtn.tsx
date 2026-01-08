import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

const SendMessageBtn = () => {
  return (
    <div className="w-full max-w-[98%] gap-2  h-16 bg-neutral-100 flex items-center justify-center rounded-2xl p-2">
      <Input
        type="text"
        className="ring-blue-400 focus:ring-blue-400 bg-white"
        placeholder="Send message..."
      />
      <Button className="bg-blue-400 hover:bg-blue-500 text-white">
        Send <Send size={20} />
      </Button>
    </div>
  );
};

export default SendMessageBtn;
