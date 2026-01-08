import { useParams } from "react-router";
import { api } from "../lib/axios.global";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SendMessageData {
  text: string;
  image?: string;
}

const useSendMessage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const sendMessage = async (data: SendMessageData) => {
    if (!id) throw new Error("No receiver ID found");
    const res = await api.post(`/messages/send/${id}`, data);
    return res.data;
  };

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      // TODO: handle socket emit
      console.log("Message sent successfully:", data);
      queryClient.invalidateQueries({
        queryKey: ["messages", id],
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
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
