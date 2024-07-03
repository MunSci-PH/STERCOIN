import { TypedSupabaseClient } from "@/utils/types";

export function getUserById(client: TypedSupabaseClient, id: String) {
  return client.from("users").select().eq("id", id);
}
