import { TypedSupabaseClient } from "@/utils/types";

export function getUserById(client: TypedSupabaseClient, id: string) {
  return client.from("users").select().eq("id", id);
}
