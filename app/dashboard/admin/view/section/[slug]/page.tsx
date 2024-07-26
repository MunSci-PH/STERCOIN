import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import useSupabaseServer from "@/utils/server";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { Suspense } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { cookies } from "next/headers";
import { getStudentsBySection } from "@/queries/getStudentsBySection";
import { getSections } from "@/queries/getSections";

export default async function Section({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  async function getStudents() {
    const { data, error } = await getStudentsBySection(supabase, params.slug);
    if (error) console.error(error);
    const finalStudentList = data!
      .map((e) => e)
      .sort((a, b) => a.lastname.localeCompare(b.lastname));
    return finalStudentList;
  }

  var studentList = await getStudents();

  async function getAllSections() {
    const { data, error } = await getSections(supabase);
    if (error) console.error(error);

    return data!
      ?.map((e) => e.sectionName!)
      .sort((a, b) => a?.localeCompare(b));
  }

  const sectionList: (string | null)[] = await getAllSections();

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
                      href={`/dashboard/admin/view/student/${e.lrn}`}
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
