"use client";

import { useStore } from "@/stores/store";
import { useLayoutEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function UserInitializer() {
  const { userSet, setInitialized } = useStore();

  useLayoutEffect(() => {
    async function getMe() {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      const json = await response.json();

      if (response.ok) {
        userSet(json.session);
      } else {
        userSet(null);
      }
      setInitialized();
    }

    getMe();
  }, [userSet, setInitialized]);

  return null;
}
