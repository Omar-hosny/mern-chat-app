import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PublicRoute from "../services/PublicRoute";
import PrivateRoute from "../services/PrivateRoute";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import { Toaster } from "sonner";
// import Layout from "../Layouts/Layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatPage from "../pages/ChatPage";
import Profile from "../pages/Profile";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/chat/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <ChatPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <PrivateRoute>
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppRouter;
