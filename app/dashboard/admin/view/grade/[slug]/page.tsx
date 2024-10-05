import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import useSupabaseServer from "@/utils/server";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { getSectionsByGrade } from "@/queries/getSectionsByGrade";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default async function Grade({ params }: { params: { slug: number } }) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  async function getSections() {
    const { data, error } = await getSectionsByGrade(supabase, params.slug);
    if (error) console.error(error);

    return data!
      ?.map((e) => e.sectionName!)
      .sort((a, b) => a?.localeCompare(b));
  }

  const sectionList: (string | null)[] = await getSections();

  if (params.slug >= 7 && params.slug <= 12) {
    return (
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="mx-auto w-full md:w-4/5">
          <div className="my-12 flex flex-col items-center">
            <div className="flex w-full flex-nowrap justify-between">
              <p className="inline w-fit text-left font-sans text-4xl font-bold">
                Grade {params.slug}
              </p>
              <BackButton></BackButton>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="my-1 w-full">
                {sectionList?.map((option) => (
                  <Button
                    key={option}
                    variant={"outline"}
                    className="w-full flex justify-between align-middle my-2 py-10"
                    asChild
                  >
                    <Link href={`/dashboard/admin/view/section/${option}`}>
                      <p className="text-xl">{option}</p>
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
    return <NotFound />;
  }
}
