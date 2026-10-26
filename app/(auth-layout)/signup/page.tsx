import { SignupForm } from "@/components/auth-forms";
import { AuthProvider } from "@/providers/auth-provider";

export default function SignUpPage() {
    return (
        <AuthProvider>
        <main className="flex items-center justify-center">
            <SignupForm />
        </main>
        </AuthProvider>
    )
}