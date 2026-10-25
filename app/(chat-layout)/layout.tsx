import { Header } from "@/components/header";
import { SocketProvider } from "@/providers/socket-provider";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocketProvider>
        <Header />
        {children}
      </SocketProvider>
    </>
  );
}
