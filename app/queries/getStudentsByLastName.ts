import { TypedSupabaseClient } from "@/utils/types";

export function getStudentsByLastName(
  client: TypedSupabaseClient,
  searchQuery: string
) {
  return client
    .from("studentData")
    .select()
    .ilike("lastname", `%${searchQuery}%`);
}
