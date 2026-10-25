"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Settings, LogOut } from "lucide-react";
import { useStore } from "@/stores/store";

export function UserIcon() {
  const [open, setOpen] = useState(false);

  const { user } = useStore();

  const handleLogOut = () => {};

  if (user) {
    return (
      <>
        <button
          className="cursor-pointer rounded-full overflow-hidden border z-10"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Image
            src={user.displayPicture || "/user.png"}
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
            href={"/"}
            className="flex items-center w-full justify-between p-2 text-sm font-medium hover:bg-black/10 rounded-md"
          >
            SETTINGS <Settings size={14} />
          </Link>
          <button
            onClick={handleLogOut}
            className="flex items-center w-full justify-between p-2 text-sm font-medium cursor-pointer hover:bg-black/10 rounded-md"
          >
            LOGOUT <LogOut size={14} />
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
}
