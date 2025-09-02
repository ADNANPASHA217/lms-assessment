"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // This will exchange the hash fragment (#access_token etc.) for a session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error);
        router.push("/login");
        return;
      }

      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    handleAuth();
  }, [router]);

  return <div>Finishing login...</div>;
}
