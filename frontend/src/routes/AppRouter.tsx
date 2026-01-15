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
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

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
  // 1. Grab the state and actions from your store
  const { authUser, connectSocket, disconnectSocket } = useAuthStore();

  useEffect(() => {
    // If we have a user, attempt to connect
    if (authUser) {
      connectSocket();
    }

    // CLEANUP FUNCTION: This is critical.
    // When the component unmounts or authUser changes,
    // we want to ensure the previous socket is closed.
    return () => {
      // We only call disconnect if authUser becomes null
      // or during a hard refresh/unmount.
      if (!authUser) {
        disconnectSocket();
      }
    };
  }, [authUser]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppRouter;
