import type { UseFormSetError } from "react-hook-form";
import type { LoginSchemaType } from "../validations/LoginSchema";
import type { AxiosError } from "axios";
import axios from "axios";

const handleErrorLogin = (
  error: AxiosError | unknown,
  setError: UseFormSetError<LoginSchemaType>
) => {
  let errMessage = "Something went wrong.. ";
  if (axios.isAxiosError(error)) {
    errMessage =
      error.response?.data?.message || error.message || "Network error";
  }
  setError("root", { message: errMessage });
  console.log("login failed", errMessage);
};

export default handleErrorLogin;
