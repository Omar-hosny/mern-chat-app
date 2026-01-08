import { useParams } from "react-router";
import { api } from "../lib/axios.global";
import { useQuery } from "@tanstack/react-query";
import type { MessageItemType } from "../types";

const useGetMessages = () => {
  const { id } = useParams();

  const getMessages = async () => {
    const res = await api.get<MessageItemType[]>(`/messages/${id}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<MessageItemType[]>({
    queryKey: ["messages", id],
    queryFn: getMessages,
  });

  return { data, isLoading, error };
};
export default useGetMessages;
