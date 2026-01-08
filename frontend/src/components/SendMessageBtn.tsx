import { useRef, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Paperclip, Send, X } from "lucide-react";

const SendMessageBtn = () => {
  const { onSendMessage, isLoading } = useSendMessage();
  const textRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textRef.current?.value.trim()) return;
    onSendMessage(textRef.current?.value || "", image || "");
    textRef.current.value = "";
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="w-full max-w-[98%] relative gap-2 
        h-16 bg-neutral-100  flex items-center justify-center rounded-2xl p-2"
    >
      {image && (
        <div className="absolute bg-gray-200 rounded-b-2xl max-w-[300px] top-[-250px] left-auto">
          <div className="flex flex-col bg-gray-200">
            <div className=" flex items-center justify-end rounded-t-xl">
              <Button
                onClick={removeImage}
                className="bg-yellow-200 hover:bg-yellow-300"
              >
                <X />
              </Button>
            </div>
            <div className="">
              <img
                src={image}
                alt="image preview"
                className=" w-full max-h-[200px] object-cover  border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}
      <Input
        ref={textRef}
        type="text"
        className="ring-blue-400 focus:ring-blue-400 bg-white"
        placeholder="Send message..."
      />
      <Input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <Button
        type="button"
        size="icon"
        onClick={() => {
          imageRef.current?.click();
        }}
        className="bg-gray-500 hover:bg-gray-600"
      >
        <Paperclip className="w-5 h-5 text-white" />
      </Button>
      <Button
        disabled={isLoading}
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 text-white"
      >
        {isLoading ? "Sending..." : "Send"}{" "}
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Send size={20} />
        )}
      </Button>
    </form>
  );
};

export default SendMessageBtn;
