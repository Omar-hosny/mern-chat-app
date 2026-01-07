const ChatItemLoading = () => {
  return (
    <div className="flex items-center gap-2 p-2 border-b border-gray-200">
      <div className="bg-gray-200 animate-pulse h-14 w-14 rounded-full"></div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-200 animate-pulse h-3 w-24 rounded"></div>
        <div className="bg-gray-200 animate-pulse h-3 w-20 rounded"></div>
      </div>
    </div>
  );
};

export default ChatItemLoading;
