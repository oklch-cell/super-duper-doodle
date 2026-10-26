"use client";

import { useStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function AccountSetting() {
  const router = useRouter();

  const { user, userSet } = useStore();

  const [openDelete, setOpenDelete] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    if (user === null) return;

    setLoading(true);
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setOpenLogout(false);
      userSet(null);
      router.push("/");
    } else {
      toast.error(json.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (user === null) return;
    setLoading(true);
    const response = await fetch(`${API_URL}/api/auth`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setOpenDelete(false);
      userSet(null);
      router.push("/");
    } else {
      toast.error(json.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start w-full text-xl font-semibold">
        ACCOUNT SETTING
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => setOpenDelete(true)}
          className="px-8 py-1 w-max bg-slate-300 rounded cursor-pointer shadow hover:shadow-none"
        >
          DELETE ACCOUNT
        </button>
        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <div className="flex flex-col gap-2">
            <p>Do you want to delete your account?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setOpenDelete(false)}
                className="px-2 py-1 bg-white rounded cursor-pointer border"
              >
                CANCEL
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-2 py-1 bg-slate-300 rounded cursor-pointer shadow hover:shadow-none min-w-18.75 h-8 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "DELETE"
                )}
              </button>
            </div>
          </div>
        </Modal>
        <button
          onClick={() => setOpenLogout(true)}
          className="px-8 py-1 w-max bg-white rounded cursor-pointer border"
        >
          LOGOUT
        </button>
        <Modal open={openLogout} onClose={() => setOpenLogout(false)}>
          <div className="flex flex-col gap-2">
            <p>Do you want to logout?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setOpenLogout(false)}
                className="px-2 py-1 bg-white rounded cursor-pointer border"
              >
                CANCEL
              </button>
              <button
                onClick={handleLogOut}
                disabled={loading}
                className="px-2 py-1 bg-slate-300 rounded cursor-pointer shadow hover:shadow-none min-w-18.75 h-8 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "LOGOUT"
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
