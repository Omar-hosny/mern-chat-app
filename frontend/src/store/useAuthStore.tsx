import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserType } from "../types";

interface AuthStore {
  authUser: UserType | null;
  setAuthUser: (user: UserType | null) => void;
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const SOCKET_URL = "http://localhost:3000";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      authUser: null,
      socket: null,
      onlineUsers: [],

      setAuthUser: (user) => set({ authUser: user }),

      connectSocket: () => {
        const { authUser, socket } = get();

        // FIX 1: Ensure authUser exists. Use _id consistently with your backend.
        if (!authUser || !authUser.id) return;

        // FIX 2: Stop if socket already exists AND is connected (prevents the 3x connection)
        if (socket?.connected) return;

        // FIX 3: If socket exists but is disconnected, just reconnect instead of new instance
        if (socket && !socket.connected) {
          socket.connect();
          return;
        }

        const newSocket = io(SOCKET_URL, {
          withCredentials: true,
          query: { userId: authUser.id },
          // FIX 4: Optimization - don't connect automatically if you want full control
          autoConnect: true,
        });

        // Use a single listener to update the list
        newSocket.on("get-online-users", (users: string[]) => {
          set({ onlineUsers: users });
        });

        // Optional: track connection status in state if needed
        newSocket.on("connect", () =>
          console.log("Socket connected successfully")
        );

        set({ socket: newSocket });
      },

      disconnectSocket: () => {
        const { socket } = get();

        if (socket) {
          // Remove all listeners to prevent memory leaks during hot-reloads
          socket.off("get-online-users");
          socket.disconnect();
        }

        set({ socket: null, onlineUsers: [] });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
