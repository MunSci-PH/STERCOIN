import { TypedSupabaseClient } from "@/utils/types";

export function getStudents(client: TypedSupabaseClient) {
  return client
    .from("studentData")
    .select()
    .order("lastname", { ascending: true });
}
