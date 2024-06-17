import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import { createSSRClient } from "@/utils/server";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { Suspense } from "react";
import { AiOutlineRight } from "react-icons/ai";

export default async function Grade({ params }: { params: { slug: number } }) {
  const supabase = await createSSRClient();
  const sectionListQuery = supabase
    .from("sections")
    .select("sectionName")
    .eq("grade", params.slug);
  type sections = QueryData<typeof sectionListQuery>;

  async function getSections() {
    const { data, error } = await sectionListQuery;
    if (error) console.error(error);
    const finalSectionList: sections | null = data;

    return finalSectionList!
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
                  <div
                    key={option}
                    className="my-2 flex flex-nowrap justify-between rounded border border-neutral-content p-5 align-middle"
                  >
                    <p className="my-auto text-xl">{option}</p>
                    <Link
                      href={`/dashboard/view/section/${option}`}
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
    return <NotFound />;
  }
}
