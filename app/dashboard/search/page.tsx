"use client";
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
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineRight } from "react-icons/ai";

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

export default function Section() {
  const supabase = createClient();
  const router = useRouter();
  //@ts-expect-error
  const [studentInfo, setList] = useState<Array | null>();
  const [isLoading, setLoad] = useState<Boolean>(true);
  const [isSearching, setLoadState] = useState<Boolean>(false);
  const { register } = useForm();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/dashboard/login");
      }
    };

    checkAuth();
  }, [router, supabase.auth]);

  useEffect(() => {
    async function getStudents() {
      const { data: studentList, error } = await supabase
        .from("studentData")
        .select("*");
      const list = studentList
        ?.map((e) => e)
        .sort((a, b) => a.lastname.localeCompare(b.lastname));
      console.log(list);
      if (error) {
        console.error(error);
      }
      setList(list);
    }
    getStudents();

    setLoad(false);
  }, [supabase]);

  const getStudents = async (e: string) => {
    const { data: studentList, error } = await supabase
      .from("studentData")
      .select();
    const list = studentList?.map((e) => e);
    console.log(list);
    if (error) {
      console.error(error);
    }

    return list;
  };

  const handleChange = async (e: string) => {
    setLoadState(true);
    const results = await getStudents(e);
    console.log(results);

    setList(results);
    setLoadState(false);
  };

  if (isLoading) {
    return <Loading></Loading>;
  } else {
    return (
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <form className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full max-w-xs"
                  title="Only accepts alphabet letters."
                  id="search"
                  required
                  {...register("search", {
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </form>
              <button
                className="btn space-y-4 inline w-fit"
                onClick={() => router.back()}
              >
                <AiOutlineArrowLeft />
              </button>
            </div>
            {isSearching ? (
              <Loading></Loading>
            ) : (
              <div className="w-full my-1">
                {studentInfo?.map(
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
                        href={`/dashboard/view/student/${student.lrn}`}
                        className="btn btn-primary"
                      >
                        <AiOutlineRight />
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
