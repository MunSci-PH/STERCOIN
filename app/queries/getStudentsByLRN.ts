import { TypedSupabaseClient } from "@/utils/types";

export function getStudentsByLRN(client: TypedSupabaseClient, lrn: number) {
  return client.from("studentData").select().eq("lrn", lrn);
}
