"use client";

import { useLayoutEffect } from "react";
import { useStore } from "@/stores/store";
import React from "react";
import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socketSet, user, socket, usersListSet } = useStore();

  useLayoutEffect(() => {
    const connect = () => {
      if (socket) return;

      if (user) {
        console.log("STATUS:", user);
        const socketInstance = io(API_URL, {
          withCredentials: true,
          query: {
            id: user.id,
            token: user.access_token,
            user: user.username,
          },
          transports: ["websocket"],
          autoConnect: true,
        });

        socketInstance.on("connect", () => {
          console.log("CONNECTED!");
          socketSet(socketInstance);
        });

        socketInstance.on("disconnect", () => {
          console.log("DISCONNECTED!");
          socketSet(null);
        });

        socketInstance.on("user-list", (data: string[]) => {
          console.log(data);
          usersListSet(data.filter((username) => username !== user.username));
        });

        socketInstance.on("error", (data) => {
          console.log(data);
        });
      }
    };

    connect();
  }, [socket, user]);

  return <>{children}</>;
}
