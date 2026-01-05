import { useMutation } from "@tanstack/react-query";
import { loginSchema, type LoginSchemaType } from "../validations/LoginSchema";
import { api } from "../lib/axios.global";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import handleErrorLogin from "../lib/handleErrorLogin";
import handleSuccessLogin from "../lib/handleSuccessLogin";

const useLogin = () => {
  const navigate = useNavigate();
  // login mutation fn
  const onLogin = async (data: LoginSchemaType) => {
    const res = await api.post("/auth/signin", data);
    return res.data;
  };

  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const loginMutation = useMutation({
    mutationFn: onLogin,
    onSuccess: (data) => {
      handleSuccessLogin(data, navigate);
    },
    onError: (error) => {
      handleErrorLogin(error, setError);
    },
  });

  // submit fn with mutation
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    register,
    onSubmit,
    setError,
    errors,
    isLoading: loginMutation.isPending,
  };
};

export default useLogin;
