import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios.global";
import type { ContactItemType } from "../types";

const useGetContacts = () => {
  const getContacts = async () => {
    const res = await api.get<ContactItemType[]>("/messages/contacts");
    return res.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { contacts: data, isLoading, error };
};

export default useGetContacts;
