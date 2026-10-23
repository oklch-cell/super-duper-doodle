"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Settings, LogOut } from "lucide-react";
import { useUser } from "@/stores/user-store";

export function UserIcon() {
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const handleLogOut = () => {};

  if (user) {
    return (
      <div className="relative">
        <button
          className="cursor-pointer rounded-full overflow-hidden border z-10"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Image
            src={user ? user.display_picture : "/user.png"}
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
          className={`absolute p-2 shadow rounded-md right-0 ${open ? "flex" : "hidden"} flex-col w-40`}
        >
          <Link
            href={"/"}
            className="flex items-center w-full justify-between p-2 text-sm font-medium hover:bg-slate-100"
          >
            SETTINGS <Settings size={14} />
          </Link>
          <button
            onClick={handleLogOut}
            className="flex items-center w-full justify-between p-2 text-sm font-medium cursor-pointer hover:bg-slate-100"
          >
            LOGOUT <LogOut size={14} />
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
