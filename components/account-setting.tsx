"use client";

import { useStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function AccountSetting() {
  const router = useRouter();

  const { user, userSet } = useStore();

  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    if (user === null) return;
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (response.ok) {
      userSet(null);
      router.push("/");
    }
  };

  const handleDelete = async () => {
    if (user === null) return;
    const response = await fetch(`${API_URL}/api/auth`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (response.ok) {
      setOpen(false);
      userSet(null);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start w-full text-xl font-semibold">
        ACCOUNT SETTING
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="px-8 py-1 w-max bg-slate-300 rounded cursor-pointer shadow hover:shadow-none"
        >
          DELETE ACCOUNT
        </button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-2">
            <p>Do you want to delete your account?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 bg-white rounded cursor-pointer border"
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-1 bg-slate-300 rounded cursor-pointer shadow hover:shadow-none"
              >
                DELETE
              </button>
            </div>
          </div>
        </Modal>
        <button
          onClick={handleLogOut}
          className="px-8 py-1 w-max bg-white rounded cursor-pointer border"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
