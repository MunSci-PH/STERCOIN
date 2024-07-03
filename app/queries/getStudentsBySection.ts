import { TypedSupabaseClient } from "@/utils/types";

export function getStudentsBySection(
  client: TypedSupabaseClient,
  section: string
) {
  return client.from("studentData").select().eq("section", section);
}
