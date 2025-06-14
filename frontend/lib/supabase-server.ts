import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

/**
 * Creates a Supabase client for server components
 * @returns Supabase client instance
 */
export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies,
  });
};

/**
 * Gets the current session from Supabase
 * @returns Session object or null if not authenticated
 */
export async function getSession() {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Gets the current user from Supabase
 * @returns User object or null if not authenticated
 */
export async function getUser() {
  const session = await getSession();
  return session?.user ?? null;
}
