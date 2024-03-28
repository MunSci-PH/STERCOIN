"use client";
import NotFound from "@/components/not-found";
import Loading from "@/loading";
import { createClient } from "@/utils/client";
import { storageClient } from "@/utils/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaPhone } from "react-icons/fa";

interface studentDataFormat<Array> {
  idpicfile: string | null;
  address: string | null;
  birthday: string;
  created_at: string;
  ecres1: string;
  ecres2: string;
  ecres3: string | null;
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
  const [picture, setPic] = useState<string>();
  const [isDarkTheme, setTheme] = useState(false);
  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  }, []);

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

      const { data } = await storageClient
        .from("idpics")
        .getPublicUrl(
          `${params.slug.toString()}/${list?.map((e) => e.idpicfile)}`
        );
      setPic(`${data.publicUrl}`);
    }

    getStudent(params.slug);
  }, [params.slug, supabase]);

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
                  <AiOutlineArrowLeft />
                </button>
              </div>
              <div className="w-full my-1">
                {studentInfo?.map((info: any) => (
                  <>
                    <div
                      key={info.lrn}
                      className=" align-middle p-5 rounded my-2"
                    >
                      {picture ? (
                        <Image
                          src={picture}
                          width={128}
                          height={128}
                          alt=""
                          placeholder={`data:image/svg+xml;base64,${toBase64(
                            shimmer(128, 128)
                          )}`}
                          className="rounded avatar w-32 h-32"
                        />
                      ) : (
                        <div className="skeleton w-32 h-32"></div>
                      )}
                      <div className="divider"></div>
                      <p className="text-xl text-left">{info.lrn}</p>
                      <p className="text-left font-bold">LRN</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">
                        {info.lastname}, {info.firstname} {info.middlename}{" "}
                      </p>
                      <p className="text-left font-bold">Full Name</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">
                        {info.grade} - {info.section}
                      </p>
                      <p className="text-left font-bold">Grade & Section</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">{info.address}</p>
                      <p className="text-left font-bold">Address</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">{info.birthday}</p>
                      <p className="text-left font-bold">
                        Date of Birth{" "}
                        <span className="text-neutral-content text-sm">
                          (YYYY-MM-DD)
                        </span>
                      </p>
                      <div className="divider"></div>
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
                      <p className="text-left font-bold">Registered at</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">
                        {info.ecname1} ({info.ecfb1} - {info.ecres1})
                      </p>
                      <p className="text-lg text-left">
                        {info.ecnum1}{" "}
                        <Link href={`tel: ${info.ecnum1}`} className="btn">
                          <FaPhone />
                        </Link>
                      </p>
                      <p className="text-left font-bold">Emergency Contact 1</p>
                      <div className="divider"></div>
                      <p className="text-xl text-left">
                        {info.ecname2} ({info.ecfb2} - {info.ecres2})
                      </p>
                      <p className="text-lg text-left">
                        {info.ecnum2}
                        <Link href={`tel: ${info.ecnum2}`} className="btn">
                          <FaPhone />
                        </Link>
                      </p>
                      <p className="text-left font-bold">Emergency Contact 2</p>
                      <div className="divider"></div>
                      {info.ecname3 != "" && (
                        <>
                          <p className="text-xl text-left">
                            {info.ecname3} ({info.ecfb3} - {info.ecres3})
                          </p>
                          <p className="text-lg text-left">
                            {info.ecnum3}
                            <Link href={`tel: ${info.ecnum3}`} className="btn">
                              <FaPhone />
                            </Link>
                          </p>
                          <p className="text-left font-bold">
                            Emergency Contact 3
                          </p>
                          <div className="divider"></div>
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
