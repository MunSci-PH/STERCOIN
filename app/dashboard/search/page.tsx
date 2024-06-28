"use client";
import BackButton from "@/components/utils/backButton";
import Loading from "@/loading";
import { createClient } from "@/utils/client";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineRight } from "react-icons/ai";

const supabase = createClient();
const studentListQuery = supabase.from("studentData").select();
type students = QueryData<typeof studentListQuery>;

const getStudents = async (searchQuery: string | null) => {
  if (!searchQuery) {
    const { data, error } = await studentListQuery;

    if (error) console.error(error);
    if (data) {
      const finalStudentList: students = data!.map((e) => e);
      return finalStudentList;
    }
  } else {
    const studentListQuery = supabase
      .from("studentData")
      .select()
      .ilike("lastname", `%${searchQuery}%`);
    type students = QueryData<typeof studentListQuery>;
    const { data, error } = await studentListQuery;

    if (error) console.error(error);
    if (data) {
      const finalStudentList: students = data!.map((e) => e);
      return finalStudentList;
    }
  }
};

export default function Section() {
  const { register } = useForm();

  const [studentList, setList] = useState<students>();

  useEffect(() => {
    getStudents(null).then((e) => setList(e));
  }, []);

  const handleChange = async (e: { target: { value: string } }) => {
    const results = await getStudents(e.target.value);

    setList(results);
  };

  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="mx-auto w-full md:w-4/5">
        <div className="my-12 flex flex-col items-center">
          <div className="flex w-full flex-nowrap justify-between">
            <form className="form-control">
              <input
                type="text"
                placeholder="Search Last Names"
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
            <BackButton></BackButton>
          </div>
          <div className="my-1 w-full">
            {studentList ? (
              studentList?.map((student) => (
                <div
                  key={student.lrn.toString()}
                  className="my-2 flex flex-nowrap justify-between rounded border border-neutral-content p-5 align-middle"
                >
                  <p className="my-auto text-xl">
                    {student.lastname}, {student.firstname}{" "}
                    {student.middlename?.charAt(0)}
                    {student.middlename ? "." : ""}
                  </p>
                  <Link
                    href={`/dashboard/view/student/${student.lrn}`}
                    className="btn btn-primary"
                  >
                    <AiOutlineRight />
                  </Link>
                </div>
              ))
            ) : (
              <Loading></Loading>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
