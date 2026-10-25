"use client";

import { useStore } from "@/stores/store";
import { SendHorizonal } from "lucide-react";
import { SubmitEventHandler, useState } from "react";

export function ChatForm({
  type,
  group,
  username,
}: {
  type: "private" | "public";
  group?: string;
  username?: string;
}) {
  const [message, setMessage] = useState("");

  const { sendMessage, user, groupMessageSet } = useStore();

  const handleMessage: SubmitEventHandler = (e) => {
    e.preventDefault();

    if (!message.length) return;

    if (type === "private") {
      sendMessage("private-message", {
        data: message,
        sender: user?.username,
        receiver: username,
      });
    }
    if (type === "public") {
      if (!user) return; 
      sendMessage("public-message", {
        data: message,
        sender: user?.username,
        group: group,
      });
      groupMessageSet({ sender: user.username, text: message, type: "send" });
    }

    setMessage("");
  };

  return (
    <form className="p-3 border-t" onSubmit={handleMessage}>
      <div className="flex items-center gap-2 border rounded overflow-hidden">
        <input
          type="text"
          placeholder="TYPE HERE..."
          className="outline-none flex-1 px-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-slate-300 py-1 px-2 cursor-pointer border-l"
        >
          <SendHorizonal fill="white" className="text-black/70" size={20} />
        </button>
      </div>
    </form>
  );
}
