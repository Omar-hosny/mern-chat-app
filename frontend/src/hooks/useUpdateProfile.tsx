import { api } from "../lib/axios.global";
import { toast } from "sonner";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setAuthUser } = useAuthStore();
  const updateProfile = async (avatar: string) => {
    const res = await api.put(`/auth/update-profile`, { avatar });
    return res.data;
  };

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      setAuthUser(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || error.message || "Network error"
        );
        return;
      }
      toast.error("Something went wrong");
    },
  });
  const handleUpdate = (avatar: string) => {
    if (!avatar) {
      toast.error("Please select an image");
      return;
    }
    updateProfileMutation.mutate(avatar);
  };
  return {
    updateProfileFn: handleUpdate,
    isLoading: updateProfileMutation.isPending,
  };
};

export default useUpdateProfile;
