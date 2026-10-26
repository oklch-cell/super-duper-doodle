import { UsersList } from "@/components/lists";
import { AuthProvider } from "@/providers/auth-provider";

export default function UsersPage() {
  return (
    <AuthProvider>
      <main className="grid grid-cols-1 grid-rows-1 p-5 max-w-xl mx-auto w-full">
        <UsersList />
      </main>
      </AuthProvider>
  );
}
