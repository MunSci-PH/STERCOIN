import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import createSupabaseServer from "@/utils/server";
import Link from "next/link";
import { Suspense } from "react";

import { getStudentsBySection } from "@/queries/getStudentsBySection";
import { getSections } from "@/queries/getSections";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Section(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const supabase = await createSupabaseServer();

  async function getStudents() {
    const { data, error } = await getStudentsBySection(supabase, params.slug);
    if (error) console.error(error);
    const finalStudentList = data!
      .map((e) => e)
      .sort((a, b) => a.lastname.localeCompare(b.lastname));
    return finalStudentList;
  }

  const studentList = await getStudents();

  async function getAllSections() {
    const { data, error } = await getSections(supabase);
    if (error) console.error(error);

    return data?.map((e) => e.sectionName!).sort((a, b) => a?.localeCompare(b));
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
            <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
              <div className="my-1 w-full">
                {studentList?.map((e, index) => (
                  <Button
                    key={e.lrn.toString()}
                    variant={"outline"}
                    className="my-2 flex w-full justify-between py-10 align-middle"
                    asChild
                  >
                    <Link href={`/dashboard/admin/view/student/${e.lrn}`}>
                      <div className="flex flex-1 gap-2">
                        <div>
                          <p className="text-xl">{index + 1}</p>
                        </div>
                        <Separator orientation="vertical" decorative />
                        <div>
                          <p className="text-xl">
                            {e.lastname}, {e.firstname}{" "}
                            {e.middlename?.charAt(0)}
                            {e.middlename ? "." : ""}
                          </p>
                        </div>
                      </div>
                      <ArrowRight />
                    </Link>
                  </Button>
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
