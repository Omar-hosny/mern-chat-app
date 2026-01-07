import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios.global";
import type { UserType } from "../types";

const useAuth = () => {
  //   const user = localStorage.getItem("user");

  const getUser = async () => {
    const res = await api.get("/auth/check");
    return res.data;
  };

  const { data, isLoading, error } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};

export default useAuth;
