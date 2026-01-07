import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios.global";
import type { ChatItemType } from "../types";

const useGetChats = () => {
  const getChats = async () => {
    const res = await api.get<ChatItemType[]>("/messages/chats");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { chats: data, isLoading, error };
};

export default useGetChats;
