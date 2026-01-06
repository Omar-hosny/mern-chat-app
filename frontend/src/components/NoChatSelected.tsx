import { MessagesSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <MessagesSquare size={50} className=" text-gray-500" />
      <h1 className="text-3xl">Welcome to HiChat</h1>
      <p className="text-gray-500 text-xl">
        Select a conversation or contact to start messaging...
      </p>
    </section>
  );
};

export default NoChatSelected;
