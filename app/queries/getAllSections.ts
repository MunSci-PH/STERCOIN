import { TypedSupabaseClient } from "@/utils/types";

export function getAllSections(client: TypedSupabaseClient) {
  return client.from("sections").select("*");
}
