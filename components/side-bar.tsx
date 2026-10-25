"use client";

import {
  Globe2,
  LockKeyhole,
  LogIn,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "./modal";
import { useStore } from "@/stores/store";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function SideBar() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { user, userSet } = useStore();

  const router = useRouter();

  const handleLogOut = async () => {
    if (user === null) return;
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    if (response.ok) {
      setModal(false);
      userSet(null);
      setOpen(false);
      router.push("/");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <Menu size={16} />
      </button>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/10 z-20 ${!open && "hidden"}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            "absolute h-full w-70 bg-white border-l top-0 right-0 p-3 flex flex-col gap-3"
          }
        >
          <div className="flex justify-start border-b pb-2">
            <button className="p-1" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">LINKS</div>
            {user ? (
              <>
                <Link
                  href={"/private"}
                  onClick={() => setOpen(false)}
                  className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
                >
                  PRIVATE <LockKeyhole size={14} />
                </Link>
                <Link
                  href={"/public"}
                  onClick={() => setOpen(false)}
                  className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
                >
                  PUBLIC <Globe2 size={14} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  onClick={() => setOpen(false)}
                  className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
                >
                  LOGIN <LogIn size={14} />
                </Link>
                <Link
                  href={"/signup"}
                  onClick={() => setOpen(false)}
                  className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
                >
                  SIGNUP <LogIn size={14} />
                </Link>
              </>
            )}
          </div>
          {user && (
            <div className="flex flex-col gap-1">
              <div className="font-semibold">USER</div>
              <Link
                href={"/settings"}
                onClick={() => setOpen(false)}
                className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
              >
                SETTINGS <Settings size={14} />
              </Link>
              <button
                onClick={() => setModal(true)}
                className="flex items-center w-full justify-between p-2 text-sm font-medium border rounded"
              >
                LOGOUT <LogOut size={14} />
              </button>
              <Modal open={modal} onClose={() => setModal(false)}>
                <div className="flex flex-col gap-2">
                  <p>Do you want to logout?</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setModal(false)}
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
          )}
        </div>
      </div>
    </>
  );
}
