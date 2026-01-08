import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex bg-rose-50 items-center justify-center h-full">
      <p className="text-gray-400 text-lg">Loading...</p>{" "}
      <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  );
};

export default Loading;
