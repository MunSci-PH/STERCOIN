"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { keepPreviousData } from "@tanstack/react-query";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import {
  ArrowDownAZ,
  ArrowRight,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  X,
} from "lucide-react";

import BackButton from "@/components/utils/backButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { getAllSections } from "@/queries/getAllSections";
import { searchStudents } from "@/queries/searchStudents";
import useSupabaseBrowser from "@/utils/client";
import {
  DEFAULT_SEARCH_STATE,
  PAGE_SIZE,
  SORT_KEYS,
  SORT_OPTIONS,
  parseSearchState,
  serializeSearchState,
  type SortKey,
  type StudentSearchState,
} from "@/utils/studentSearch";
import type { Student } from "@/utils/types";

type StudentRow = Pick<
  Student,
  "lrn" | "firstname" | "middlename" | "lastname" | "grade" | "section"
>;

const ANY = "any";

function formatName({ lastname, firstname, middlename }: StudentRow) {
  const middleInitial = middlename ? ` ${middlename.charAt(0)}.` : "";
  return `${lastname}, ${firstname}${middleInitial}`;
}

function StudentLink({ student }: { student: StudentRow }) {
  return (
    <Button
      variant="outline"
      className="my-2 flex h-auto w-full justify-between py-4 text-left"
      asChild
    >
      <Link href={`/dashboard/admin/view/student/${student.lrn}`}>
        <div>
          <p className="text-xl">{formatName(student)}</p>
          <p className="text-sm font-normal text-muted-foreground">
            Grade {student.grade} · {student.section} · LRN {student.lrn}
          </p>
        </div>
        <ArrowRight />
      </Link>
    </Button>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  anyLabel,
  options,
  className,
}: {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  anyLabel: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <Select
      value={value ?? ANY}
      onValueChange={(next) => onChange(next === ANY ? undefined : next)}
    >
      <SelectTrigger aria-label={label} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ANY}>{anyLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function StudentSearch() {
  const supabase = useSupabaseBrowser();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, setState] = useState<StudentSearchState>(() =>
    parseSearchState(searchParams),
  );
  const [input, setInput] = useState(state.q);
  const q = useDebouncedValue(input.trim());
  const params = useMemo(() => ({ ...state, q }), [state, q]);

  useEffect(() => {
    const query = serializeSearchState(params).toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (url !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, "", url);
    }
  }, [params, pathname]);

  const { data: sections } = useQuery(getAllSections(supabase), {
    throwOnError: true,
  });
  const {
    data: students,
    count,
    isLoading,
    isPlaceholderData,
  } = useQuery(searchStudents(supabase, params), {
    throwOnError: true,
    placeholderData: keepPreviousData,
  });

  const gradeOptions = useMemo(() => {
    const grades = (sections ?? [])
      .map((section) => section.grade)
      .filter((grade): grade is number => grade !== null);
    return Array.from(new Set(grades))
      .sort((a, b) => a - b)
      .map((grade) => ({ value: String(grade), label: `Grade ${grade}` }));
  }, [sections]);

  const sectionOptions = useMemo(
    () =>
      (sections ?? [])
        .filter(
          (section) =>
            state.grade === undefined || section.grade === state.grade,
        )
        .map((section) => section.sectionName)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((name) => ({ value: name, label: name })),
    [sections, state.grade],
  );

  const update = (patch: Partial<StudentSearchState>) =>
    setState((current) => ({ ...current, page: 1, ...patch }));

  const hasFilters =
    q !== "" ||
    state.grade !== undefined ||
    state.section !== undefined ||
    state.pwd !== undefined;

  const reset = () => {
    setInput("");
    setState((current) => ({
      ...DEFAULT_SEARCH_STATE,
      sort: current.sort,
      dir: current.dir,
    }));
  };

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const firstShown = total === 0 ? 0 : (state.page - 1) * PAGE_SIZE + 1;
  const lastShown = Math.min(state.page * PAGE_SIZE, total);

  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="mx-auto w-full md:w-4/5">
        <div className="my-12 flex flex-col items-center gap-4">
          <div className="flex w-full flex-nowrap justify-between gap-2">
            <form
              role="search"
              className="relative w-full max-w-xs"
              onSubmit={(e) => e.preventDefault()}
            >
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                id="search"
                placeholder="Search name, LRN or email"
                aria-label="Search students by name, LRN or email"
                autoComplete="off"
                className="px-9"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setState((current) =>
                    current.page === 1 ? current : { ...current, page: 1 },
                  );
                }}
              />
              {input && (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setInput("");
                    update({});
                  }}
                >
                  <X className="size-4" />
                </button>
              )}
            </form>
            <BackButton />
          </div>

          <div className="flex w-full flex-wrap items-center gap-2">
            <FilterSelect
              label="Filter by grade"
              anyLabel="All grades"
              className="w-36"
              value={
                state.grade === undefined ? undefined : String(state.grade)
              }
              options={gradeOptions}
              onChange={(value) =>
                update({
                  grade: value === undefined ? undefined : Number(value),
                  section: undefined,
                })
              }
            />
            <FilterSelect
              label="Filter by section"
              anyLabel="All sections"
              className="w-40"
              value={state.section}
              options={sectionOptions}
              onChange={(section) => update({ section })}
            />
            <FilterSelect
              label="Filter by PWD status"
              anyLabel="PWD: any"
              className="w-36"
              value={
                state.pwd === undefined ? undefined : state.pwd ? "yes" : "no"
              }
              options={[
                { value: "yes", label: "PWD only" },
                { value: "no", label: "Non-PWD only" },
              ]}
              onChange={(value) =>
                update({
                  pwd: value === undefined ? undefined : value === "yes",
                })
              }
            />

            <div className="flex items-center gap-2 sm:ml-auto">
              <Select
                value={state.sort}
                onValueChange={(sort) =>
                  update({
                    sort: sort as SortKey,
                    dir: SORT_OPTIONS[sort as SortKey].defaultDir,
                  })
                }
              >
                <SelectTrigger aria-label="Sort by" className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {SORT_OPTIONS[key].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={
                  state.dir === "asc"
                    ? "Sorted ascending. Switch to descending"
                    : "Sorted descending. Switch to ascending"
                }
                onClick={() =>
                  update({ dir: state.dir === "asc" ? "desc" : "asc" })
                }
              >
                {state.dir === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />}
              </Button>
            </div>
          </div>

          <div className="flex min-h-9 w-full items-center justify-between text-sm text-muted-foreground">
            <p aria-live="polite" className="flex items-center gap-2">
              {isLoading
                ? "Loading…"
                : `Showing ${firstShown}–${lastShown} of ${total} ${
                    total === 1 ? "student" : "students"
                  }`}
              {isPlaceholderData && <Loader2 className="size-4 animate-spin" />}
            </p>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset filters
              </Button>
            )}
          </div>

          <div
            className={`w-full transition-opacity ${
              isPlaceholderData ? "opacity-60" : ""
            }`}
            aria-busy={isPlaceholderData}
          >
            {isLoading ? (
              <Loader2 className="mx-auto my-12 animate-spin" />
            ) : students?.length ? (
              students.map((student) => (
                <StudentLink key={student.lrn.toString()} student={student} />
              ))
            ) : total > 0 ? (
              <div className="my-8 space-y-4">
                <p className="text-xl">There are no students on this page.</p>
                <Button
                  variant="outline"
                  onClick={() => setState((c) => ({ ...c, page: 1 }))}
                >
                  Go to the first page
                </Button>
              </div>
            ) : (
              <p className="my-8 text-xl">
                {hasFilters
                  ? "No students match your search."
                  : "No students found."}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex w-full items-center justify-center gap-4"
            >
              <Button
                variant="outline"
                size="sm"
                disabled={state.page <= 1}
                onClick={() =>
                  setState((c) => ({ ...c, page: Math.max(1, c.page - 1) }))
                }
              >
                <ChevronLeft /> Previous
              </Button>
              <span className="text-sm">
                Page {Math.min(state.page, totalPages)} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={state.page >= totalPages}
                onClick={() => setState((c) => ({ ...c, page: c.page + 1 }))}
              >
                Next <ChevronRight />
              </Button>
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}
