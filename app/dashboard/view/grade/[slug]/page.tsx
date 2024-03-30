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
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <p className="text-left text-4xl font-sans font-bold inline w-fit">
                Grade {params.slug}
              </p>
              <BackButton></BackButton>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="w-full my-1">
                {sectionList?.map((option) => (
                  <div
                    key={option}
                    className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                  >
                    <p className="text-xl my-auto">{option}</p>
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
