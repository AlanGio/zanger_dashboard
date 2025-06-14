import { redirect } from "next/navigation";
import { createClient, getSession } from "@/lib/supabase-server";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ChatInterface from "@/components/chat-interface";

// Prevent static generation
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();

  // If user is not logged in, redirect to login page
  if (!session) {
    redirect("/auth/login");
  }

  // Fetch user profile
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return (
    <DashboardLayout>
      <div className="mx-auto">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
}
