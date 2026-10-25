"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/stores/store";
import Link from "next/link";

export function UserCard({ username }: { username: string }) {
  const { selectedUserSet } = useStore();

  return (
    <button
      onClick={() => selectedUserSet(username)}
      className="group p-3 w-full flex items-center justify-start gap-3 relative border-b cursor-pointer"
    >
      <Image
        src={"/user.png"}
        width={30}
        height={30}
        alt="user"
        className="rounded-full border border-black aspect-square"
        loading="eager"
      />
      <span>{username}</span>
      <ArrowRight
        className="invisible absolute right-15 group-hover:right-3 group-hover:visible transition-all"
        size={16}
      />
    </button>
  );
}

export function GroupCard({ group }: { group: string }) {
  return (
    <Link
      href={`/public/${group}`}
      className="group last:border-b-transparent p-3 w-full flex items-center justify-start gap-3 relative border-b cursor-pointer"
    >
      <Image
        src={"/group.png"}
        width={30}
        height={30}
        alt="user"
        className="rounded-full border border-black aspect-square"
        loading="eager"
      />
      <span>{group}</span>
      <ArrowRight
        className="invisible absolute right-15 group-hover:right-3 group-hover:visible transition-all"
        size={16}
      />
    </Link>
  );
}
