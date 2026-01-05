import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
// import Layout from "../Layouts/Layout";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-3xl text-red-500">Home Hi chat app</h1>,
  },
  {
    path: "/chat/:id",
    element: <h1 className="text-3xl text-red-500">Chat</h1>,
  },
  {
    path: "/profile/:id",
    element: <h1 className="text-3xl text-red-500">Profile</h1>,
  },

  { path: "/login", element: <LoginPage /> },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Layout> */}
      <RouterProvider router={router} />
      {/* </Layout> */}
    </QueryClientProvider>
  );
};

export default AppRouter;
