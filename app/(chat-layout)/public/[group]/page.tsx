import { PublicChat } from "@/components/chat-section";
import { AuthProvider } from "@/providers/auth-provider";

export const instant = false;

export default async function PublicChatPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;

  return (
    <AuthProvider>
      <main className="grid grid-cols-1 grid-rows-1 p-5 gap-5 max-w-3xl w-full mx-auto">
        <PublicChat group={group} />
      </main>
      </AuthProvider>
  );
}
