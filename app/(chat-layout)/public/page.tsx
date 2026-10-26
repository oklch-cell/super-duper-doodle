import { GroupsList } from "@/components/lists";
import { AuthProvider } from "@/providers/auth-provider";

export default function GroupsPage() {
  return (
    <AuthProvider>
      <main className="p-5">
        <GroupsList />
      </main>
      </AuthProvider>
  );
}
