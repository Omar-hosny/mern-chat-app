import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  // console.log(JSON.parse(user!));
  if (!user) {
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
