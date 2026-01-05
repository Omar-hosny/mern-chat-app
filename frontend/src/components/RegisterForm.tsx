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
import useRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const { register, onSubmit, errors, isLoading } = useRegister();
  return (
    <Card className="shadow-none border bg-white border-gray-200 text-gray-900">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-600 font-normal">
          HiChat App Register page!
        </CardTitle>
        <CardDescription className="text-gray-500">
          Create your account to start chatting..
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6 items-center">
            <div className="grid gap-2 w-full ">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
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
            <div className="grid gap-2 w-full ">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
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
              {isLoading ? "submitting... " : "Create Account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
