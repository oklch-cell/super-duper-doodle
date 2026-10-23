import Link from "next/link";

import { UserIcon } from "./user-icon";
import { NavLinks } from "./nav-links";

export function Header() {
  return (
    <header className="p-5 flex items-center justify-between border-b">
      <Link href="/" className="text-3xl font-semibold tracking-widest">
        WebChat
      </Link>
      <div className="flex items-center gap-8">
        <NavLinks />
        <UserIcon />
      </div>
    </header>
  );
}
