import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  if (user) {
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
