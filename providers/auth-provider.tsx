"use client";

import { useStore } from "@/stores/store";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useState } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!user && isInitialized && pathname !== "/signup") {
        router.replace("/login");
      }

      if (
        user &&
        isInitialized &&
        (pathname === "/login" || pathname === "/signup")
      ) {
        router.replace("/");
      }

      setLoading(false);
    };

    checkAuth();
  }, [user, router, isInitialized, pathname]);

  if (loading) {
    return (
      <main className="flex items-center justify-center">
        <Loader2 size={16} className="animate-spin" />
      </main>
    );
  }

  return <>{children}</>;
}

export function withAuth<T extends {}>(WrappedComponent: ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const { user } = useStore();

    useEffect(() => {
      const checkAuth = () => {
        if (!user) {
          router.push("/login");
          setLoading(false);
          return;
        }

        if (user && (pathname === "/login" || pathname === "/signup")) {
          router.push("/");
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }
      };

      checkAuth();
    }, [router, user]);

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
}
