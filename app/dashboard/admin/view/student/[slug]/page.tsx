import BackButton from "@/components/utils/backButton";
import NotFound from "@/components/layout/not-found";
import useSupabaseServer from "@/utils/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaPhone } from "react-icons/fa";
import { cookies } from "next/headers";
import { getStudentsByLRN } from "@/queries/getStudentsByLRN";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default async function Section({
  params,
}: {
  params: { slug: number };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
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

  var studentInfo = await getStudent(params.slug);

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
          <Suspense fallback={<Loader2 className="animate-spin" />}>
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
                    className="my-2 flex flex-1 flex-col rounded p-5 align-middle gap-4"
                  >
                    <Image
                      src={await getPicture()}
                      width={128}
                      height={128}
                      alt=""
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(128, 128)
                      )}`}
                      className="avatar size-32 rounded self-center"
                    />
                    <Separator />
                    <div>
                      <p className="text-left text-xl">{info.lrn}</p>
                      <p className="text-left font-bold">LRN</p>
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
                      <p className="text-left text-xl">{info.birthday}</p>
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
                        {info.ecname1} ({info.ecfb1} - {info.ecres1})
                      </p>
                      <p className="text-left text-lg">
                        {info.ecnum1}{" "}
                        <Button asChild className="mx-2">
                          <Link href={`tel: ${info.ecnum1}`}>
                            <FaPhone />
                          </Link>
                        </Button>
                      </p>
                      <p className="text-left font-bold">Emergency Contact 1</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-left text-xl">
                        {info.ecname2} ({info.ecfb2} - {info.ecres2})
                      </p>
                      <p className="text-left text-lg">
                        {info.ecnum2}
                        <Button asChild className="mx-2">
                          <Link href={`tel: ${info.ecnum2}`}>
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
                            {info.ecname3} ({info.ecfb3} - {info.ecres3})
                          </p>
                          <p className="text-left text-lg">
                            {info.ecnum3}
                            <Button asChild className="mx-2">
                              <Link href={`tel: ${info.ecnum3}`}>
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
