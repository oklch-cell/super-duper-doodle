import { Loader2 } from "lucide-react";

export default function loading() {
    return (
      <main className="flex items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </main>
    );
}
