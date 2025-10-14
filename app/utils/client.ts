import { Database } from "../../database.types";
import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const createClient = () =>
  createBrowserClient<Database>(supabaseUrl!, supabaseKey!);

function useSupabaseBrowser() {
  return useMemo(createClient, []);
}

export default useSupabaseBrowser;