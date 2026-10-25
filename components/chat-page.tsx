"use client";

import { UsersList } from "@/components/lists";
import { PrivateChat } from "@/components/chat-section";
import { useRef, useState } from "react";
import { useStore } from "@/stores/store";

export function PrivatePage() {
  const recepientRef = useRef<string>("");
    const [recepient, setRecepient] = useState<string>("");

    const { selectedUserSet } = useStore();

  return (
    <>
      <UsersList />
      <PrivateChat />
    </>
  );
}
