"use client";

import { Search } from "lucide-react";
import { UserCard, GroupCard } from "./cards";
import { useStore } from "@/stores/store";

export function UsersList() {
  const { usersList } = useStore();

  return (
    <section className="border border-black/70 rounded overflow-hidden grid grid-rows-[auto_minmax(0,1fr)]">
      <div className="p-5 bg-slate-300 border-b">
        <div className="flex items-center gap-2 border rounded px-2 bg-white">
          <label htmlFor="search">
            <Search className="text-black/70" size={16} />
          </label>
          <input
            type="text"
            id="search"
            placeholder="SEARCH USERS"
            className="outline-none py-1 px-2 w-full"
          />
        </div>
      </div>
      <div className="overflow-y-auto">
        {usersList.length ? (
          usersList.map((username) => (
            <UserCard username={username} key={username} />
          ))
        ) : (
          <div className="flex justify-center p-2 text-black/50 text-lg">
            No users connected
          </div>
        )}
      </div>
    </section>
  );
}

export function GroupsList() {
  const { groups } = useStore();

  return (
    <section className="border rounded overflow-hidden h-max max-w-xl mx-auto">
      <div className="bg-slate-300 p-3 text-xl font-medium border-b">
        Select a group from below
      </div>
      <div>
        {groups.length ? (
          groups.map((group) => <GroupCard group={group} key={group} />)
        ) : (
          <div className="flex justify-center p-2 text-black/50 text-lg">
            Connection problem
          </div>
        )}
      </div>
    </section>
  );
}
