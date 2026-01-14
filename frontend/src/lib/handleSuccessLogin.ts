import type { NavigateFunction } from "react-router";
import type { UserType } from "../types";
const handleSuccessLogin = (data: UserType, navigate: NavigateFunction) => {
  // save user data to localStorage
  // localStorage.setItem("user", JSON.stringify(data));
  console.log(data);
  // emit socket event

  // navigate to home page
  navigate("/");
};

export default handleSuccessLogin;
