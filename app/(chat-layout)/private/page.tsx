import { UsersList } from "@/components/lists";

export default function UsersPage() {
  return (
    <main className="grid grid-cols-1 grid-rows-1 p-5 max-w-xl mx-auto w-full">
      <UsersList />
    </main>
  );
}
