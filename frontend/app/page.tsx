import { redirect } from "next/navigation";
import { createClient, getSession } from "@/lib/supabase-server";

// Prevent static generation
export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();

  // If user is not logged in, redirect to login page
  if (!session) {
    redirect("/auth/login");
  }

  // If user is logged in, redirect to dashboard
  redirect("/dashboard");
}
