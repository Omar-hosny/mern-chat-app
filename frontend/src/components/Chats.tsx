import useGetChats from "../hooks/useGetChats";
import ChatItem from "./ChatItem";
import ChatItemLoading from "./ChatItemLoading";

const Chats = () => {
  const { chats = [], isLoading } = useGetChats();

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {isLoading &&
        Array.from({ length: 5 }).map((_, index) => (
          <ChatItemLoading key={index} />
        ))}

      {!isLoading &&
        chats.map((chat) => <ChatItem key={chat._id} chat={chat} isChat />)}
    </div>
  );
};

export default Chats;
