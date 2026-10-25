import Link from "next/link";

import { UserIcon } from "./user-icon";
import { NavLinks } from "./nav-links";
import { SideBar } from "./side-bar";


export function Header() {
  return (
    <header className="px-5 py-2 flex items-center justify-between border-b relative">
      <Link
        href="/"
        className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest"
      >
        WebChat
      </Link>
      <div className="hidden md:flex items-center gap-8">
        <NavLinks />
        <UserIcon />
      </div>
      <div className="md:hidden">
        <SideBar />
      </div>
    </header>
  );
}
