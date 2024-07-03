import { TypedSupabaseClient } from "@/utils/types";

export function getSections(client: TypedSupabaseClient) {
  return client.from("sections").select("sectionName");
}
