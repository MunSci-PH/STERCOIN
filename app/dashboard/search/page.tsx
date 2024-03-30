"use client";
import BackButton from "@/components/utils/backButton";
import { createClient } from "@/utils/client";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineRight } from "react-icons/ai";

export default function Section() {
  const [isSearching, setLoadState] = useState<Boolean>(false);
  const supabase = createClient();
  const { register } = useForm();

  const studentListQuery = supabase.from("studentData").select();
  type students = QueryData<typeof studentListQuery>;
  const [studentList, setList] = useState<students>();
  const [searchList, setSearchList] = useState<students>();

  useEffect(() => {
    const getStudents = async () => {
      const { data, error } = await studentListQuery;
      if (error) console.error(error);
      if (data) {
        const finalStudentList: students = data!
          .map((e) => e)
          .sort((a, b) => a.lastname.localeCompare(b.lastname));
        setList(finalStudentList);
      }
    };

    getStudents();
  }, [studentListQuery]);

  async function searchStudents(searchQuery: string) {
    const studentListQuery = supabase
      .from("studentData")
      .select()
      .ilike("lastname", searchQuery);
    type students = QueryData<typeof studentListQuery>;
    const { data, error } = await studentListQuery;
    if (error) console.error(error);
    if (data) {
      const finalStudentList: students = data!.map((e) => e);
      return finalStudentList;
    }
  }

  const handleChange = async (e: { target: { value: string } }) => {
    console.log(e.target.value);
    const results = await searchStudents(e.target.value);

    setSearchList(results);
    console.log(searchList);
  };

  return (
    <main className="flex-1 flex container mx-auto text-center px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-col items-center my-12">
          <div className="w-full flex flex-nowrap justify-between">
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
          <div className="w-full my-1">
            {searchList?.length == 0
              ? studentList?.map((student) => (
                  <div
                    key={student.lrn.toString()}
                    className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                  >
                    <p className="text-xl my-auto">
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
              : searchList?.map((student) => (
                  <div
                    key={student.lrn.toString()}
                    className="flex flex-nowrap justify-between align-middle border border-neutral-content p-5 rounded my-2"
                  >
                    <p className="text-xl my-auto">
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
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
