"use client";

import { useStore } from "@/stores/store";
import { LockIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useState } from "react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PasswordChange() {
  const { user } = useStore();

  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);
    const response = await fetch(`${API_URL}/api/auth/password`, {
      method: "PATCH",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      toast.success("Password changes successfully!");
      router.push("/");
    } else {
      toast.error(json.message);
    }
    setNewPassword("");
    setOldPassword("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-end">
      <div className="flex justify-start w-full text-xl font-semibold">
        CHANGE PASSWORD
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="oldPassword"
          className="text-sm font-medium tracking-widest"
        >
          OLD PASSWORD
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <LockIcon className="text-black/50" size={16} />
          <input
            type="password"
            id="oldPassword"
            className="outline-none py-1 px-2 w-full"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="newPassword"
          className="text-sm font-medium tracking-widest"
        >
          NEW PASSWORD
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <LockIcon className="text-black/50" size={16} />
          <input
            type="password"
            id="newPassword"
            className="outline-none py-1 px-2 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-1 w-max bg-slate-300 rounded cursor-pointer shadow hover:shadow-none h-8 min-w-30 flex items-center justify-center"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : "CHANGE"}
      </button>
    </form>
  );
}
