import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import { createSSRClient } from "@/utils/server";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { Suspense } from "react";
import { AiOutlineRight } from "react-icons/ai";

export default async function Section({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createSSRClient();
  const studentListQuery = supabase
    .from("studentData")
    .select()
    .eq("section", params.slug);
  type students = QueryData<typeof studentListQuery>;

  async function getStudents() {
    const { data, error } = await studentListQuery;
    if (error) console.error(error);
    const finalStudentList: students = data!
      .map((e) => e)
      .sort((a, b) => a.lastname.localeCompare(b.lastname));
    return finalStudentList;
  }

  var studentList: students = await getStudents();

  const sectionListQuery = supabase.from("sections").select("sectionName");
  type sections = QueryData<typeof sectionListQuery>;

  async function getSections() {
    const { data, error } = await sectionListQuery;
    if (error) console.error(error);
    const finalSectionList: sections = data!;

    return finalSectionList!
      ?.map((e) => e.sectionName!)
      .sort((a, b) => a?.localeCompare(b));
  }

  const sectionList: (string | null)[] = await getSections();

  if (sectionList?.includes(params.slug)) {
    return (
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="mx-auto w-full md:w-4/5">
          <div className="my-12 flex flex-col items-center">
            <div className="flex w-full flex-nowrap justify-between">
              <p className="inline w-fit text-left font-sans text-4xl font-bold">
                {params.slug} - {studentList?.length} Records found.
              </p>
              <BackButton></BackButton>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="my-1 w-full">
                {studentList?.map((e) => (
                  <div
                    key={e.lrn.toString()}
                    className="my-2 flex flex-nowrap justify-between rounded border border-neutral-content p-5 align-middle"
                  >
                    <p className="my-auto text-xl">
                      {e.lastname}, {e.firstname} {e.middlename?.charAt(0)}
                      {e.middlename ? "." : ""}
                    </p>
                    <Link
                      href={`/dashboard/view/student/${e.lrn}`}
                      className="btn btn-primary"
                    >
                      <AiOutlineRight />
                    </Link>
                  </div>
                ))}
              </div>
            </Suspense>
          </div>
        </div>
      </main>
    );
  } else {
    return <NotFound></NotFound>;
  }
}
