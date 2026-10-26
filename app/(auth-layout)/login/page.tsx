import { LoginForm } from "@/components/auth-forms";
import { AuthProvider } from "@/providers/auth-provider";

export default function LoginPage() {
  return (
    <AuthProvider>
      <main className="flex items-center justify-center">
        <LoginForm />
      </main>
    </AuthProvider>
  );
}
