"use client";

import Link from "next/link";

import { LogIn, LockKeyhole, Globe2 } from "lucide-react";
import { useStore } from "@/stores/store";

export function NavLinks() {
  const { user } = useStore();

  return (
    <nav className="flex items-center gap-5">
      {user ? (
        <>
          <Link
            href="/private"
            className="flex items-center text-sm font-medium tracking-wide gap-2 hover:underline"
          >
            PRIVATE <LockKeyhole size={14} />
          </Link>
          <Link
            href="/public"
            className="flex items-center text-sm font-medium tracking-wide gap-2 hover:underline"
          >
            PUBLIC <Globe2 size={14} />
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="flex items-center text-sm font-medium tracking-wide gap-2 hover:underline"
          >
            LOGIN <LogIn size={14} />
          </Link>
          <Link
            href="/signup"
            className="flex items-center text-sm font-medium tracking-wide gap-2 p-2 bg-slate-300 shadow hover:shadow-none rounded"
          >
            SIGNUP
          </Link>
        </>
      )}
    </nav>
  );
}
