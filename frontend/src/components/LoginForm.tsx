import { Link } from "react-router";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { register, onSubmit, errors, isLoading } = useLogin();
  return (
    <Card className="shadow-none border bg-white border-gray-200 text-gray-900">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-600 font-normal">
          HiChat App welcome back!
        </CardTitle>
        <CardDescription className="text-gray-500">
          Login to your account to start chatting..
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6 items-center">
            <div className="grid gap-2 w-full ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2 w-full ">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root && (
              <p className="text-red-500 text-sm">{errors.root.message}</p>
            )}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full max-w-sm rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              {isLoading ? "submitting... " : "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
