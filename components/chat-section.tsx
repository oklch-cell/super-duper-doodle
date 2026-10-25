"use client";

import Image from "next/image";
import { ChatForm } from "./chat-form";
import { useStore } from "@/stores/store";
import { Message } from "./message";
import { useLayoutEffect, useEffect } from "react";
import { toast } from "react-hot-toast";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PublicChat({ group }: { group: string }) {
  const {
    usersList,
    groups,
    socket,
    user,
    fetchMessages,
    groupMessages,
    groupMessageSet,
  } = useStore();

  const set = new Set(groups);

  if (!set.has(group)) {
    notFound();
  }

  useEffect(() => {
    fetchMessages(group);
  }, [group, user]);

  useEffect(() => {
    if (!socket) return;

    const handleAddMessage = (message: string) => {
      const { data, sender } = JSON.parse(message);
      if (sender === user?.username) return;
      groupMessageSet({ text: data, sender, type: "receive" });
    };

    socket.on(`${group}-room`, handleAddMessage);

    return () => {
      socket.off(`${group}-room`, handleAddMessage);
    };
  }, [socket, group, user]);

  if (group) {
    return (
      <section className="border rounded grid grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
        <div className="p-3 bg-slate-300 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/group.png"}
              width={30}
              height={30}
              alt="user"
              className="rounded-full border border-black aspect-square"
              loading="eager"
            />
            <span>{group}</span>
          </div>
          <div className="text-sm font-medium">
            {usersList.length} USERS ONLINE
          </div>
        </div>
        <div className="p-3 flex flex-col gap-1 overflow-auto">
          {groupMessages.map(({ text, type, sender }, index) => (
            <Message type={type} text={text} key={index} sender={sender} />
          ))}
        </div>
        <ChatForm type="public" group={group} />
      </section>
    );
  } else {
    return (
      <section className="h-full border rounded flex items-center justify-center">
        <p className="text-xl text-black/50">Nothing to show here</p>
      </section>
    );
  }
}

export function PrivateChat() {
  const { selectedUser, messages, socket, messageSet } = useStore();

  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (message: string) => {
      const { data, sender } = JSON.parse(message);
      if (sender === selectedUser) {
        messageSet({ text: data, type: "receive" });
      } else {
        toast.success(`${data} from ${sender}`);
      }
    };

    socket.on("private-message", handlePrivateMessage);

    return () => {
      socket.off("private-message", handlePrivateMessage);
    };
  }, [selectedUser, socket, messageSet]);

  useEffect(() => {
    const container = document.getElementById("messages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  if (selectedUser) {
    return (
      <section className="border rounded grid grid-rows-[auto_minmax(0,1fr)_auto]">
        <div className="p-3 border-b flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={"/user.png"}
              alt="user"
              width={30}
              height={30}
              className="aspect-square rounded-full border border-black"
            />
            <span className="font-medium text-lg">{selectedUser}</span>
          </div>
        </div>
        <div
          id="messages"
          className="p-3 flex flex-col gap-1 overflow-y-auto scroll-auto"
        >
          {messages.map((message, index) => (
            <Message key={index} type={message.type} text={message.text} />
          ))}
        </div>
        <ChatForm type="private" />
      </section>
    );
  } else {
    return (
      <section className="h-full border rounded flex items-center justify-center">
        <p className="text-xl text-black/50">Nothing to show here</p>
      </section>
    );
  }
}
