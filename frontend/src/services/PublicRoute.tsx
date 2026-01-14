import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {children}
      {/* Outlet is used to render the child routes of the current route */}
      <Outlet />
    </>
  );
};

export default PublicRoute;
