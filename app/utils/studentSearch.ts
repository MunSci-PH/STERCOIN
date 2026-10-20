import type { Student } from "./types";

export const PAGE_SIZE = 20;
const MAX_QUERY_LENGTH = 100;
const MAX_TOKENS = 5;

export type SortKey = "lastname" | "firstname" | "grade" | "lrn" | "created_at";
export type SortDir = "asc" | "desc";

type SortOption = {
  label: string;
  columns: readonly (keyof Student)[];
  defaultDir: SortDir;
};

export const SORT_OPTIONS: Record<SortKey, SortOption> = {
  lastname: {
    label: "Last name",
    columns: ["lastname", "firstname"],
    defaultDir: "asc",
  },
  firstname: {
    label: "First name",
    columns: ["firstname", "lastname"],
    defaultDir: "asc",
  },
  grade: {
    label: "Grade & section",
    columns: ["grade", "section", "lastname", "firstname"],
    defaultDir: "asc",
  },
  lrn: { label: "LRN", columns: ["lrn"], defaultDir: "asc" },
  created_at: {
    label: "Date registered",
    columns: ["created_at"],
    defaultDir: "desc",
  },
};

export const SORT_KEYS = Object.keys(SORT_OPTIONS) as SortKey[];

export type StudentSearchState = {
  q: string;
  sort: SortKey;
  dir: SortDir;
  grade?: number;
  section?: string;
  pwd?: boolean;
  page: number;
};

export const DEFAULT_SEARCH_STATE: StudentSearchState = {
  q: "",
  sort: "lastname",
  dir: SORT_OPTIONS.lastname.defaultDir,
  page: 1,
};

type ParamsReader = { get(name: string): string | null };

export function parseSearchState(params: ParamsReader): StudentSearchState {
  const sortParam = params.get("sort");
  const sort = SORT_KEYS.find((key) => key === sortParam) ?? "lastname";

  const dirParam = params.get("dir");
  const dir: SortDir =
    dirParam === "asc" || dirParam === "desc"
      ? dirParam
      : SORT_OPTIONS[sort].defaultDir;

  const gradeParam = params.get("grade");
  const pageParam = params.get("page");
  const pwdParam = params.get("pwd");

  return {
    q: (params.get("q") ?? "").slice(0, MAX_QUERY_LENGTH),
    sort,
    dir,
    grade: gradeParam && /^\d{1,2}$/.test(gradeParam) ? +gradeParam : undefined,
    section: params.get("section") || undefined,
    pwd: pwdParam === "yes" ? true : pwdParam === "no" ? false : undefined,
    page: pageParam && /^\d{1,6}$/.test(pageParam) ? Math.max(1, +pageParam) : 1,
  };
}

export function serializeSearchState(state: StudentSearchState) {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.sort !== DEFAULT_SEARCH_STATE.sort) params.set("sort", state.sort);
  if (state.dir !== SORT_OPTIONS[state.sort].defaultDir) {
    params.set("dir", state.dir);
  }
  if (state.grade !== undefined) params.set("grade", String(state.grade));
  if (state.section) params.set("section", state.section);
  if (state.pwd !== undefined) params.set("pwd", state.pwd ? "yes" : "no");
  if (state.page > 1) params.set("page", String(state.page));
  return params;
}

const UNSAFE_CHARS = /[%_\\",()*]/g;

export function tokenize(query: string): string[] {
  const tokens = query
    .slice(0, MAX_QUERY_LENGTH)
    .split(/[\s,]+/)
    .map((token) => token.replace(UNSAFE_CHARS, ""))
    .filter(Boolean);
  return Array.from(new Set(tokens)).slice(0, MAX_TOKENS);
}
