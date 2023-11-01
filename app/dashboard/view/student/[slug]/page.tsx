"use client";
import NotFound from "@/components/not-found";
import Loading from "@/loading";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function Section({ params }: { params: { slug: number } }) {
  const supabase = createClient();
  const router = useRouter();
  //@ts-expect-error
  const [studentInfo, setList] = useState<studentDataFormat | null>();
  const [studentLRN, setLRN] = useState<any>();
  const [isLoading, setLoad] = useState<Boolean>(true);

  useEffect(() => {
    async function getStudent(lrn: number) {
      const { data: studentList, error } = await supabase
        .from("studentData")
        .select()
        .eq("lrn", lrn);
      const list = studentList?.map((e) => e);
      console.log(list);
      if (error) {
        console.error(error);
      }

      setList(list!);
      setLRN(list?.map((e) => e.LRN));
      setLoad(false);
    }

    getStudent(params.slug);
  }, [params.slug, supabase]);

  function getLocale() {
    return navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  }

  if (isLoading) {
    return <Loading></Loading>;
  } else if (!isLoading && studentLRN.length == 0) {
    return <NotFound></NotFound>;
  } else {
    return (
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <Suspense
            fallback={<span className="loading loading-spinner"></span>}
          >
            <div className="flex flex-col items-center my-12">
              <div className="w-full flex flex-nowrap justify-between">
                <p className="text-left text-4xl my-auto font-sans font-bold inline w-fit">
                  Student Info
                </p>
                <button
                  className="btn space-y-4 inline w-fit"
                  onClick={() => router.back()}
                >
                  Back
                </button>
              </div>
              <div className="w-full my-1">
                {studentInfo?.map((info: any) => (
                  <>
                    <div
                      key={info.lrn}
                      className=" align-middle p-5 rounded my-2"
                    >
                      <p className="text-xl text-left">{info.lrn}</p>
                      <p className="text-left">LRN</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">
                        {info.lastname}, {info.firstname} {info.middlename}
                      </p>
                      <p className="text-left">Full Name</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">
                        {info.grade} - {info.section}
                      </p>
                      <p className="text-left">Grade & Section</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">{info.address}</p>
                      <p className="text-left">Address</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">{info.birthday}</p>
                      <p className="text-left">
                        Date of Birth{" "}
                        <span className="text-neutral-content text-sm">
                          (YYYY-MM-DD)
                        </span>
                      </p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">
                        {new Date(Date.parse(info.created_at)).toLocaleString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-left">Registered at</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">
                        {info.ecname1} ({info.ecfb1})
                      </p>
                      <p className="text-lg text-left">{info.ecnum1}</p>
                      <p className="text-left">Emergency Contact 1</p>
                      <hr className="my-2" />
                      <p className="text-xl text-left">
                        {info.ecname2} ({info.ecfb2})
                      </p>
                      <p className="text-lg text-left">{info.ecnum2}</p>
                      <p className="text-left">Emergency Contact 2</p>
                      <hr className="my-2" />
                      {info.ecname3 != "" && (
                        <>
                          <p className="text-xl text-left">
                            {info.ecname3} ({info.ecfb3})
                          </p>
                          <p className="text-lg text-left">{info.ecnum3}</p>
                          <p className="text-left">Emergency Contact 3</p>
                          <hr className="my-2" />
                        </>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Suspense>
        </div>
      </main>
    );
  }
}
