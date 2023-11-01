"use client";
import NotFound from "@/components/not-found";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Grade({ params }: { params: { slug: number } }) {
  const router = useRouter();
  const supabase = createClient();
  const [sectionList, setList] = useState<string[]>([]);

  useEffect(() => {
    async function getSections(grade: number) {
      const { data: sectionList, error } = await supabase
        .from("sections")
        .select()
        .eq("grade", grade);
      const list = sectionList?.map((e) => e.sectionName);
      console.log(sectionList);
      if (error) {
        console.error(error);
      }
      //@ts-expect-error
      setList(list);
    }

    getSections(params.slug);
  }, [params.slug, supabase]);

  if (params.slug >= 7 && params.slug <= 12) {
    return (
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <p className="text-left text-4xl font-sans font-bold inline w-fit">
                Grade {params.slug}
              </p>
              <button
                className="btn space-y-4 inline w-fit"
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="w-full my-1">
                {sectionList.map((option) => (
                  <div
                    key={option}
                    className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                  >
                    <p className="text-xl my-auto">{option}</p>
                    <Link
                      href={`/dashboard/view/section/${option}`}
                      className="btn btn-primary"
                    >
                      View
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
