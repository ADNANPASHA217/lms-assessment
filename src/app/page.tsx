import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabaseToken = (await cookies()).get("sb-access-token")?.value;

  if (supabaseToken) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
