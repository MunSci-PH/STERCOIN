import { TypedSupabaseClient } from "@/utils/types";
import {
  PAGE_SIZE,
  SORT_OPTIONS,
  tokenize,
  type StudentSearchState,
} from "@/utils/studentSearch";

const LIST_COLUMNS = "lrn,firstname,middlename,lastname,grade,section,pwd";

function termFilter(term: string) {
  const pattern = `"%${term}%"`;
  const filters = [
    `lastname.ilike.${pattern}`,
    `firstname.ilike.${pattern}`,
    `middlename.ilike.${pattern}`,
    `email.ilike.${pattern}`,
  ];
  if (/^\d{1,15}$/.test(term)) filters.push(`lrn.eq.${term}`);
  return filters.join(",");
}

export function searchStudents(
  client: TypedSupabaseClient,
  state: StudentSearchState
) {
  let query = client
    .from("studentData")
    .select(LIST_COLUMNS, { count: "exact" });

  for (const term of tokenize(state.q)) query = query.or(termFilter(term));

  if (state.grade !== undefined) query = query.eq("grade", state.grade);
  if (state.section) query = query.eq("section", state.section);
  if (state.pwd !== undefined) query = query.eq("pwd", state.pwd);

  const { columns } = SORT_OPTIONS[state.sort];
  columns.forEach((column, i) => {
    query = query.order(column, {
      ascending: i === 0 ? state.dir === "asc" : true,
    });
  });
  if (!columns.includes("lrn")) query = query.order("lrn");

  const from = (state.page - 1) * PAGE_SIZE;
  return query.range(from, from + PAGE_SIZE - 1);
}
