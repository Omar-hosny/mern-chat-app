import { api } from "../lib/axios.global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SendMessageData {
  text: string;
  image?: string;
}

const useSendMessage = (receiverId: string) => {
  const queryClient = useQueryClient();

  const sendMessage = async (data: SendMessageData) => {
    if (!receiverId) throw new Error("No receiver ID found");
    const res = await api.post(`/messages/send/${receiverId}`, data);
    return res.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      // Manually append the new message to the existing query cache without invalidating the query
      queryClient.setQueryData(["messages", receiverId], (oldMessages: any) => {
        // if oldMessages is not null or undefined, return the new array otherwise return the new message
        return oldMessages ? [...oldMessages, newMessage] : [newMessage];
      });
      console.log(newMessage);
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const onSendMessage = async (text: string, image?: string) => {
    if (!text.trim() && !image) {
      toast.error("Please enter a message or select an image");
      return;
    }

    // Pass as an object to match mutationFn signature
    sendMessageMutation.mutate({ text, image });
  };

  return {
    onSendMessage,
    isLoading: sendMessageMutation.isPending,
  };
};

export default useSendMessage;
