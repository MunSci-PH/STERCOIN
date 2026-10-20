import { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../../database.types";

export type TypedSupabaseClient = SupabaseClient<Database>;
export type Student = Tables<"studentData">;
