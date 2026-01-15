import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { api } from "../lib/axios.global";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();
  const queryClient = useQueryClient(); // get queryClient
  const logout = async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthUser(null);
      queryClient.clear(); // clear all queries
      // disconnectSocket();
      navigate("/login");
      toast.success("logout successfully");
    },
    onError: (error) => {
      toast.error("something went wrong");
      console.log("error: errorin logout", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return {
    handleLogout,
    isLoading: logoutMutation.isPending,
  };
};

export default useLogout;
