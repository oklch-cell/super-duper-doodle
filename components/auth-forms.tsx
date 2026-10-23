"use client";

import { useUser } from "@/stores/user-store";
import { LockIcon, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEventHandler } from "react";

export function LoginForm() {
  const { userSet } = useUser();
  const router = useRouter();

  const handleLogin: SubmitEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleLogin}
      className="border rounded border-black/50 p-5 flex flex-col gap-2 max-w-80 w-full"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">LOGIN HERE</h2>
        <p className="text-sm">
          If don't have an account{" "}
          <Link href="/signup" className="text-blue-500 font-medium hover:underline">
            SIGNUP
          </Link>{" "}
          here.
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium tracking-widest">
          EMAIL
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <Mail className="text-black/50" size={16} />
          <input
            type="email"
            id="email"
            className="outline-none py-1 px-2 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium tracking-widest">
          PASSWORD
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <LockIcon className="text-black/50" size={16} />
          <input
            type="password"
            id="password"
            className="outline-none py-1 px-2 w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-2 py-1 bg-slate-300 rounded cursor-pointer"
      >
        LOGIN
      </button>
    </form>
  );
}

export function SignupForm() {
  const { userSet } = useUser();
  const router = useRouter();

  const handleSignup: SubmitEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSignup}
      className="border rounded border-black/50 p-5 flex flex-col gap-2 max-w-80 w-full"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold">SIGNUP HERE</h2>
        <p className="text-sm">
          If you already have an account{" "}
          <Link href="/login" className="text-blue-500 font-medium hover:underline">
            LOGIN
          </Link>{" "}
          here.
        </p>
      </div>
      <div className="flex flex-col">
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
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium tracking-widest">
          EMAIL
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <Mail className="text-black/50" size={16} />
          <input
            type="email"
            id="email"
            className="outline-none py-1 px-2 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium tracking-widest">
          PASSWORD
        </label>
        <div className="flex items-center border pl-2 border-black/50 rounded overflow-hidden">
          <LockIcon className="text-black/50" size={16} />
          <input
            type="password"
            id="password"
            className="outline-none py-1 px-2 w-full"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-2 py-1 bg-slate-300 rounded cursor-pointer"
      >
        SIGNUP
      </button>
    </form>
  );
}
