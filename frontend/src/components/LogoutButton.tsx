import { Loader2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { handleLogout, isLoading } = useLogout();
  return (
    <Button
      variant="ghost"
      className="w-full rounded-2xl bg-gray-600 hover:bg-gray-700 text-white"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
      {isLoading ? <Loader2 className="animate-spin " /> : <LogOut />}
    </Button>
  );
};

export default LogoutButton;
