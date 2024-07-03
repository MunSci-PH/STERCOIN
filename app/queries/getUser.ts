import { TypedSupabaseClient } from "@/utils/types";

export function getUser(client: TypedSupabaseClient) {
  return client.auth.getUser();
}
