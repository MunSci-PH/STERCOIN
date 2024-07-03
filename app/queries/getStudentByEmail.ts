import { TypedSupabaseClient } from "@/utils/types";

export function getStudentByEmail(client: TypedSupabaseClient, email: string) {
  return client.from("studentData").select("*").eq("email", email).single();
}
