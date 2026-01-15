import { useMutation } from "@tanstack/react-query";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../validations/RegisterSchema";
import { api } from "../lib/axios.global";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import handleErrorLogin from "../lib/handleErrorLogin";
import { useAuthStore } from "../store/useAuthStore";

const useRegister = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthStore();
  // login mutation fn
  const onRegister = async (data: RegisterSchemaType) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
  };

  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const registerMutation = useMutation({
    mutationFn: onRegister,
    onSuccess: (data) => {
      setAuthUser(data.user);
      navigate("/");
    },
    onError: (error) => {
      handleErrorLogin(error, setError);
    },
  });

  // submit fn with mutation
  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    setError,
    errors,
    isLoading: registerMutation.isPending,
  };
};

export default useRegister;
