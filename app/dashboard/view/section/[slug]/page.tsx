"use client";
import NotFound from "@/components/not-found";
import Loading from "@/loading";
import { createClient } from "@/utils/client";
import Link from "next/link";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  Suspense,
  useEffect,
  useState,
} from "react";

interface studentDataFormat<Array> {
  address: string | null;
  birthday: string;
  created_at: string;
  ecfb1: string;
  ecfb2: string;
  ecfb3: string | null;
  ecname1: string;
  ecname2: string;
  ecname3: string | null;
  ecnum1: string;
  ecnum2: string;
  ecnum3: string | null;
  firstname: string;
  grade: number;
  lastname: string;
  lrn: number;
  middlename: string;
  pwd: boolean;
  section: string;
}

export default function Section({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  //@ts-expect-error
  const [studentList, setList] = useState<studentDataFormat | null>();
  const [sectionList, setSectionList] = useState<string[]>([]);

  useEffect(() => {
    async function getStudents(section: string) {
      const { data: studentList, error } = await supabase
        .from("studentData")
        .select()
        .eq("section", section);
      const list = studentList?.map((e) => e);
      console.log(list);
      if (error) {
        console.error(error);
      }

      setList(list!);
    }

    getStudents(params.slug);
  }, [params.slug, supabase]);

  useEffect(() => {
    async function getSections() {
      const { data: sectionList, error } = await supabase
        .from("sections")
        .select();
      const list = sectionList?.map((e) => e.sectionName);
      console.log(sectionList);
      if (error) {
        console.error(error);
      }

      //@ts-expect-error
      setSectionList(list);
    }

    getSections();
  }, [params.slug, supabase]);

  if (sectionList.includes(params.slug)) {
    return (
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <p className="text-left text-4xl font-sans font-bold inline w-fit">
                {params.slug}
              </p>
              <form
                action="/api/auth/logout"
                method="post"
                className="form-control space-y-4 inline w-fit"
              >
                <button className="btn">Log out</button>
              </form>
            </div>
            <Suspense
              fallback={<span className="loading loading-spinner"></span>}
            >
              <div className="w-full my-1">
                {studentList?.map(
                  (student: {
                    lrn: { toString: () => Key | null | undefined };
                    lastname:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | PromiseLikeOfReactNode
                      | null
                      | undefined;
                    firstname:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | PromiseLikeOfReactNode
                      | null
                      | undefined;
                    middlename: string;
                  }) => (
                    <div
                      key={student.lrn.toString()}
                      className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                    >
                      <p className="text-xl my-auto">
                        {student.lastname}, {student.firstname}{" "}
                        {student.middlename.charAt(0)}.
                      </p>
                      <Link
                        href={`/dashboard/view/section/${student.lrn}`}
                        className="btn btn-primary"
                      >
                        View
                      </Link>
                    </div>
                  )
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </main>
    );
  } else if (sectionList) {
    return <Loading></Loading>;
  }
}
