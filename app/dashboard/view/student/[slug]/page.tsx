import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import { createSSRClient } from "@/utils/server";
import { storageClient } from "@/utils/storage";
import { QueryData } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaPhone } from "react-icons/fa";

export default async function Section({
  params,
}: {
  params: { slug: number };
}) {
  const supabase = await createSSRClient();
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

  const studentListQuery = supabase
    .from("studentData")
    .select()
    .eq("lrn", params.slug);
  type student = QueryData<typeof studentListQuery>;
  async function getStudent(lrn: number) {
    const { data, error } = await studentListQuery;
    if (error) console.error(error);
    const studentList: student = data!;

    return studentList;
  }

  var studentInfo: student = await getStudent(params.slug);

  async function getPicture() {
    const { data } = await storageClient
      .from("idpics")
      .getPublicUrl(
        `${params.slug.toString()}/${studentInfo?.map((e) => e.idpicfile)}`
      );

    return data.publicUrl;
  }

  var studentPic = await getPicture();

  if (!studentInfo.map((e) => e.lrn)) {
    return <NotFound></NotFound>;
  } else {
    return (
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="mx-auto w-full md:w-4/5">
          <Suspense
            fallback={<span className="loading loading-spinner"></span>}
          >
            <div className="my-12 flex flex-col items-center">
              <div className="flex w-full flex-nowrap justify-between">
                <p className="my-auto inline w-fit text-left font-sans text-4xl font-bold">
                  Student Info
                </p>
                <BackButton></BackButton>
              </div>
              <div className="my-1 w-full">
                {studentInfo?.map((info) => (
                  <div
                    key={info.lrn}
                    className=" my-2 rounded p-5 align-middle"
                  >
                    {studentPic ? (
                      <Image
                        src={studentPic}
                        width={128}
                        height={128}
                        alt=""
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(128, 128)
                        )}`}
                        className="avatar h-32 w-32 rounded"
                      />
                    ) : (
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      <div className="skeleton h-32 w-32"></div>
                    )}
                    <div className="divider"></div>
                    <p className="text-left text-xl">{info.lrn}</p>
                    <p className="text-left font-bold">LRN</p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">
                      {info.lastname}, {info.firstname} {info.middlename}{" "}
                    </p>
                    <p className="text-left font-bold">Full Name</p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">
                      {info.grade} - {info.section}
                    </p>
                    <p className="text-left font-bold">Grade & Section</p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">{info.address}</p>
                    <p className="text-left font-bold">Address</p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">{info.birthday}</p>
                    <p className="text-left font-bold">
                      Date of Birth{" "}
                      <span className="text-sm text-neutral-content">
                        (YYYY-MM-DD)
                      </span>
                    </p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">
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
                    <p className="text-left text-xl">
                      {info.ecname1} ({info.ecfb1} - {info.ecres1})
                    </p>
                    <p className="text-left text-lg">
                      {info.ecnum1}{" "}
                      <Link href={`tel: ${info.ecnum1}`} className="btn">
                        <FaPhone />
                      </Link>
                    </p>
                    <p className="text-left font-bold">Emergency Contact 1</p>
                    <div className="divider"></div>
                    <p className="text-left text-xl">
                      {info.ecname2} ({info.ecfb2} - {info.ecres2})
                    </p>
                    <p className="text-left text-lg">
                      {info.ecnum2}
                      <Link href={`tel: ${info.ecnum2}`} className="btn">
                        <FaPhone />
                      </Link>
                    </p>
                    <p className="text-left font-bold">Emergency Contact 2</p>
                    <div className="divider"></div>
                    {info.ecname3 != "" && (
                      <>
                        <p className="text-left text-xl">
                          {info.ecname3} ({info.ecfb3} - {info.ecres3})
                        </p>
                        <p className="text-left text-lg">
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
                ))}
              </div>
            </div>
          </Suspense>
        </div>
      </main>
    );
  }
}
