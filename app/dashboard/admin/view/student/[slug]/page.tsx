import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import createSupabaseServer from "@/utils/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaPhone } from "react-icons/fa";

import { getStudentsByLRN } from "@/queries/getStudentsByLRN";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function Section(props: {
  params: Promise<{ slug: number }>;
}) {
  const params = await props.params;

  const supabase = await createSupabaseServer();
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

  async function getStudent(lrn: number) {
    const { data, error } = await getStudentsByLRN(supabase, lrn);
    if (error) console.error(error);
    const studentList = data!;

    return studentList;
  }

  const studentInfo = await getStudent(params.slug);

  async function getPicture() {
    const { data } = await supabase.storage
      .from("idpics")
      .createSignedUrl(
        `${params.slug.toString()}/${studentInfo?.map((e) => e.idpicfile)}`,
        60
      );

    if (data) {
      return data.signedUrl;
    } else {
      return `/user.png`;
    }
  }

  if (!studentInfo.map((e) => e.lrn)) {
    return <NotFound></NotFound>;
  } else {
    return (
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto w-full md:w-4/5">
          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <div className="my-12 flex flex-col items-center">
              <div className="flex w-full flex-nowrap justify-between">
                <p className="my-auto inline w-fit text-left font-sans text-4xl font-bold">
                  Student Info
                </p>
                <BackButton></BackButton>
              </div>
              <div className="my-1 w-full">
                {studentInfo?.map(async (info) => (
                  <div
                    key={info.lrn}
                    className="my-2 flex flex-1 flex-col gap-4 rounded p-5 align-middle"
                  >
                    <Image
                      src={await getPicture()}
                      width={200}
                      height={200}
                      alt={`${info.ecname1}'s picture`}
                      draggable={false}
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(200, 200)
                      )}`}
                      className="self-center rounded-full"
                    />
                    <Separator />
                    <div>
                      <p className="text-left text-xl">{info.lrn}</p>
                      <p className="text-left font-bold">LRN</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">{info.email}</p>
                      <p className="text-left font-bold">Email</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        {info.lastname}, {info.firstname} {info.middlename}{" "}
                      </p>
                      <p className="text-left font-bold">Full Name</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        {info.grade} - {info.section}
                      </p>
                      <p className="text-left font-bold">Grade & Section</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">{info.address}</p>
                      <p className="text-left font-bold">Address</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        {new Date(info.birthday).toLocaleString("en-us", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-left font-bold">Date of Birth</p>
                    </div>
                    <Separator />
                    <div>
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
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        <Button variant="link" className="p-0" asChild>
                          <Link href={info.ecfb1} className="text-left text-xl">
                            {info.ecname1}
                          </Link>
                        </Button>{" "}
                        - {info.ecres1}
                      </p>
                      <p className="text-left text-lg">
                        <Button
                          variant="link"
                          className="p-0 text-left text-lg"
                          asChild
                        >
                          <Link href={`tel: ${info.ecnum1}`}>
                            {info.ecnum1}
                            <FaPhone />
                          </Link>
                        </Button>
                      </p>
                      <p className="text-left font-bold">Emergency Contact 1</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        <Button variant="link" className="p-0" asChild>
                          <Link href={info.ecfb2} className="text-left text-xl">
                            {info.ecname2}
                          </Link>
                        </Button>{" "}
                        - {info.ecres2}
                      </p>
                      <p className="text-left text-lg">
                        <Button
                          variant="link"
                          className="p-0 text-left text-lg"
                          asChild
                        >
                          <Link href={`tel: ${info.ecnum2}`}>
                            {info.ecnum2}
                            <FaPhone />
                          </Link>
                        </Button>
                      </p>
                      <p className="text-left font-bold">Emergency Contact 2</p>
                    </div>
                    <Separator />
                    {info.ecname3 != "" && (
                      <>
                        <div>
                          <p className="text-left text-xl">
                            <Button variant="link" className="p-0" asChild>
                              <Link
                                href={info.ecfb3 ?? ""}
                                className="text-left text-xl"
                              >
                                {info.ecname3}
                              </Link>
                            </Button>{" "}
                            - {info.ecres3}
                          </p>
                          <p className="text-left text-lg">
                            <Button
                              variant="link"
                              className="p-0 text-left text-lg"
                              asChild
                            >
                              <Link href={`tel: ${info.ecnum2}`}>
                                {info.ecnum2}
                                <FaPhone />
                              </Link>
                            </Button>
                          </p>
                          <p className="text-left font-bold">
                            Emergency Contact 3
                          </p>
                        </div>
                        <Separator />
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
