import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

const useMessagesListener = (currentChatPartnerId: string) => {
  const { socket } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on("new-message", (newMessage) => {
      //  Check if senderId is an object (populated) or just a string (not populated)
      const incomingSenderId =
        typeof newMessage.senderId === "object"
          ? newMessage.senderId._id
          : newMessage.senderId;

      // Comparison now works for both cases
      if (incomingSenderId === currentChatPartnerId) {
        queryClient.setQueryData(
          ["messages", currentChatPartnerId],
          (old: any) => {
            return old ? [...old, newMessage] : [newMessage];
          }
        );
      }
    });

    return () => {
      socket.off("new-message");
    };
  }, [socket]);
};

export default useMessagesListener;
