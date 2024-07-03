import { TypedSupabaseClient } from "@/utils/types";

export function getSectionsByGrade(client: TypedSupabaseClient, grade: number) {
  return client.from("sections").select("sectionName").eq("grade", grade);
}
