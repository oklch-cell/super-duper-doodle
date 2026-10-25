import React from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="p-5 border-b flex items-center justify-start">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide flex items-center gap-2 hover:underline"
        >
          <ArrowLeft size={14} /> BACK TO HOME
        </Link>
      </header>
      {children}
    </>
  );
}