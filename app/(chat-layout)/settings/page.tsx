import { AccountSetting } from "@/components/account-setting";
import { PasswordChange } from "@/components/password-change";
import { PersonalInfo } from "@/components/personal-info";
import { AuthProvider } from "@/providers/auth-provider";

export default function SettingsPage() {
  return (
    <AuthProvider>
      <main className="p-5 max-w-3xl w-full mx-auto flex flex-col gap-3">
        <PersonalInfo />
        <PasswordChange />
        <AccountSetting />
      </main>
    </AuthProvider>
  );
}
