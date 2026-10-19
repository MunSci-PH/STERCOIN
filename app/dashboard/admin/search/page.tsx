"use client";
import BackButton from "@/components/utils/backButton";
import Loading from "@/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSupabaseBrowser from "@/utils/client";
import { getStudents } from "@/queries/getStudents";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getStudentsByLastName } from "@/queries/getStudentsByLastName";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Section() {
  const supabase = useSupabaseBrowser();
  const { register } = useForm();
  const { data, isLoading } = useQuery(getStudents(supabase), {
    throwOnError: true,
  });
  const [studentList, setStudentList] = useState<typeof data>(data);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();

    if (!value) {
      const results = await getStudents(supabase);
      if (results.error) throw results.error;
      setStudentList(results.data);
      return;
    }

    const results = await getStudentsByLastName(supabase, value);
    if (results.error) throw results.error;
    setStudentList(results.data);
  }

  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="mx-auto w-full md:w-4/5">
        <div className="my-12 flex flex-col items-center">
          <div className="flex w-full flex-nowrap justify-between">
            <form>
              <Input
                type="text"
                placeholder="Search Last Names"
                className="w-full max-w-xs"
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
            {!isLoading ? (
              studentList?.map((student) => (
                <Button
                  key={student.lrn.toString()}
                  variant={"outline"}
                  className="my-2 flex w-full justify-between py-10 align-middle"
                  asChild
                >
                  <Link href={`/dashboard/admin/view/student/${student.lrn}`}>
                    <p className="text-xl">
                      {student.lastname}, {student.firstname}{" "}
                      {student.middlename?.charAt(0)}
                      {student.middlename ? "." : ""}
                    </p>
                    <ArrowRight />
                  </Link>
                </Button>
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
