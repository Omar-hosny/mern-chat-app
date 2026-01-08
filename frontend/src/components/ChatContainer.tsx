import useGetMessages from "../hooks/useGetMessages";

import MessageItem from "./MessageItem";
import ChatHeader from "./ChatHeader";
import Loading from "./Loading";
import NoMessagesFound from "./NoMessagesFound";
import SendMessageBtn from "./SendMessageBtn";

const ChatContainer = () => {
  const { data = [], isLoading, error } = useGetMessages();

  const currentUserId = JSON.parse(localStorage.getItem("user") || "").id;

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="flex flex-col items-center justify-center h-full">
      {/* header */}
      {data?.length > 0 && (
        <div
          className="w-full bg-slate-300 flex items-center justify-start border-b 
        overflow-hidden border-gray-200  p-2"
        >
          <ChatHeader
            partner={{
              _id: data?.[0].receiverId?._id || "",
              name: data?.[0].receiverId?.name || "",
              avatar: data?.[0].receiverId?.avatar || "",
            }}
          />
        </div>
      )}
      {/* messages */}
      {data?.length > 0 && (
        <div className="flex-1 p-2 bg-gray-50  w-full flex  flex-col items-start ">
          {data.map((message) => (
            <MessageItem
              key={message._id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
      {data?.length === 0 && <NoMessagesFound />}
      {/* input */}
      <>
        <SendMessageBtn />
      </>
    </section>
  );
};

export default ChatContainer;
