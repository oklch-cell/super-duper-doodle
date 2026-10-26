"use client";

import { useStore } from "@/stores/store";
import { Loader2, Mail, User2 } from "lucide-react";
import { SubmitEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function PersonalInfo() {
  const { user, userSet } = useStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    const response = await fetch(`${API_URL}/api/auth`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ username, email }),
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
      userSet(json);
    } else {
      toast.error(json.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-end">
      <div className="flex justify-start w-full text-xl font-semibold">
        PERSONAL INFORMATION
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="username"
          className="text-sm font-medium tracking-widest"
        >
          USERNAME
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <User2 className="text-black/50" size={16} />
          <input
            type="text"
            id="username"
            className="outline-none py-1 px-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm font-medium tracking-widest">
          EMAIL
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <Mail className="text-black/50" size={16} />
          <input
            type="email"
            id="email"
            className="outline-none py-1 px-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-1 w-max bg-slate-300 rounded cursor-pointer shadow hover:shadow-none h-8 min-w-25 flex items-center justify-center"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : "SAVE"}
      </button>
    </form>
  );
}
