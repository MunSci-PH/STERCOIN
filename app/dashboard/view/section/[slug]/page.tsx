import BackButton from "@/components/backButton";
import NotFound from "@/components/not-found";
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
    const finalStudentList: students = data!;
    return finalStudentList;
  }

  var studentList: students = await getStudents();

  const sectionListQuery = supabase.from("sections").select("sectionName");
  type sections = QueryData<typeof sectionListQuery>;

  async function getSections() {
    const { data, error } = await sectionListQuery;
    console.log(sectionList);
    if (error) console.error(error);
    const finalSectionList: sections = data!;

    return finalSectionList;
  }

  var sectionList: (string | null)[] = (await getSections()).map(
    (e) => e.sectionName
  );

  if (sectionList?.includes(params.slug)) {
    return (
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <p className="text-left text-4xl font-sans font-bold inline w-fit">
                {params.slug} - {studentList?.length} Records found.
              </p>
              <BackButton></BackButton>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="w-full my-1">
                {studentList?.map((e) => (
                  <div
                    key={e.lrn.toString()}
                    className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                  >
                    <p className="text-xl my-auto">
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
