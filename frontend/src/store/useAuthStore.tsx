import { io, Socket } from "socket.io-client"; // Import Socket type
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserType } from "../types";

interface AuthStore {
  authUser: UserType | null;
  setAuthUser: (user: UserType | null) => void;
  socket: Socket | null; // Use specific Type
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

        // 1. Double check: is authUser valid and does it have an ID?
        // Use _id if that's what your backend uses!
        if (!authUser || !authUser.id || socket?.connected) return;

        const newSocket = io(SOCKET_URL, {
          withCredentials: true,
          query: { userId: authUser.id },
        });

        // 2. Listen for updates
        newSocket.on("get-online-users", (users: string[]) => {
          set({ onlineUsers: users });
        });

        set({ socket: newSocket });
      },

      disconnectSocket: () => {
        const { socket } = get();

        // 1. Physically close the connection
        if (socket) {
          socket.off("get-online-users"); // Remove listener
          socket.disconnect();
        }

        // 2. Reset everything.
        // Don't worry about filtering; the server handles the list for others.
        set({ socket: null, onlineUsers: [], authUser: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // IMPORTANT: Only save authUser. Sockets cannot be stringified.
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
