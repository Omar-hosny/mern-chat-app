import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthStore();
  // console.log(JSON.parse(user!));
  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {children}
      {/* Outlet is used to render the child routes of the current route */}
      <Outlet />
    </>
  );
};

export default PrivateRoute;
