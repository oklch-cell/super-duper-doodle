"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Settings, LogOut } from "lucide-react";
import { useStore } from "@/stores/store";
import { Modal } from "./modal";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function UserIcon() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(false);

  const router = useRouter();

  const { user, userSet } = useStore();

  const handleLogOut = async () => {
    if (user === null) return;
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (response.ok) {
      setModel(false);
      userSet(null);
      router.push("/");
    }
  };

  if (user) {
    return (
      <>
        <button
          className="cursor-pointer rounded-full overflow-hidden border z-10"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Image
            src={user.display_picture || "/user.png"}
            alt="user"
            className="w-auto h-auto aspect-square"
            width={30}
            loading="eager"
            height={30}
          />
        </button>
        <div
          className={`fixed inset-0 ${open ? "block" : "hidden"}`}
          onClick={() => setOpen(false)}
        ></div>
        <div
          className={`absolute p-2 shadow rounded-b-md right-1 top-full border bg-white ${open ? "flex" : "hidden"} flex-col w-40`}
        >
          <Link
            href={"/settings"}
            onClick={() => setOpen(false)}
            className="flex items-center w-full justify-between p-2 text-sm font-medium hover:bg-black/10 rounded-md"
          >
            SETTINGS <Settings size={14} />
          </Link>
          <button
            onClick={() => setModel(true)}
            className="flex items-center w-full justify-between p-2 text-sm font-medium cursor-pointer hover:bg-black/10 rounded-md"
          >
            LOGOUT <LogOut size={14} />
          </button>
          <Modal open={model} onClose={() => setModel(false)}>
            <div className="flex flex-col gap-2">
              <p>Do you want to logout?</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setModel(false)}
                  className="px-2 py-1 bg-white rounded cursor-pointer border"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleLogOut}
                  className="px-2 py-1 bg-slate-300 rounded cursor-pointer shadow hover:shadow-none"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  } else {
    return null;
  }
}
