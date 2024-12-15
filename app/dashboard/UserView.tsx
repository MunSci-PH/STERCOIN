import Image from "next/image";
import { UserInfo } from "./types";
import createSupabaseServer from "@/utils/server";
import { Suspense } from "react";
import { getUser } from "@/queries/getUser";
import { getStudentByEmail } from "@/queries/getStudentByEmail";
import Loading from "@/loading";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface IContainerProps {
  user: UserInfo;
}

const UserView: React.FC<IContainerProps> = async () => {
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

  const { data, error } = await getUser(supabase);
  if (error) throw error;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  async function getStudent(email: string | undefined) {
    if (email) {
      const { data, error } = await getStudentByEmail(supabase, email);
      if (error) console.error(error);
      const studentList = data!;

      return studentList;
    }
    return;
  }

  const studentInfo = await getStudent(data.user.email);

  async function getPicture() {
    const { data } = await supabase.storage
      .from("idpics")
      .createSignedUrl(
        `${studentInfo?.lrn.toString()}/${studentInfo?.idpicfile}`,
        60
      );

    if (data) {
      return data.signedUrl;
    } else {
      return `/user.png`;
    }
  }

  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto w-full md:w-4/5">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <div className="my-12 flex flex-col items-center">
            <div className="my-1 w-full">
              {studentInfo ? (
                <div className="my-2 flex flex-1 flex-col gap-4 rounded p-5 align-middle">
                  <Image
                    src={await getPicture()}
                    width={200}
                    height={200}
                    alt={`${studentInfo.ecname1}'s picture`}
                    draggable={false}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(200, 200)
                    )}`}
                    className="mx-auto aspect-square rounded-full"
                  />
                  <Separator />
                  <div>
                    <p className="text-left text-xl">{studentInfo.lrn}</p>
                    <p className="text-left font-bold">LRN</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">
                      {studentInfo.lastname}, {studentInfo.firstname}{" "}
                      {studentInfo.middlename}{" "}
                    </p>
                    <p className="text-left font-bold">Full Name</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">
                      {studentInfo.grade} - {studentInfo.section}
                    </p>
                    <p className="text-left font-bold">Grade & Section</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">{studentInfo.address}</p>
                    <p className="text-left font-bold">Address</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">
                      {new Date(studentInfo.birthday).toLocaleString("en-us", {
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
                      {new Date(
                        Date.parse(studentInfo.created_at)
                      ).toLocaleString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </p>
                    <p className="text-left font-bold">Registered at</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">
                      <Button variant="link" className="p-0" asChild>
                        <Link
                          href={studentInfo.ecfb1}
                          className="text-left text-xl"
                        >
                          {studentInfo.ecname1}
                        </Link>
                      </Button>{" "}
                      - {studentInfo.ecres1}
                    </p>
                    <p className="text-left text-lg">{studentInfo.ecnum1} </p>
                    <p className="text-left font-bold">Emergency Contact 1</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-left text-xl">
                      <Button variant="link" className="p-0" asChild>
                        <Link
                          href={studentInfo.ecfb2}
                          className="text-left text-xl"
                        >
                          {studentInfo.ecname2}
                        </Link>
                      </Button>{" "}
                      - {studentInfo.ecres2}
                    </p>
                    <p className="text-left text-lg">{studentInfo.ecnum2}</p>
                    <p className="text-left font-bold">Emergency Contact 2</p>
                  </div>
                  <Separator />
                  {studentInfo.ecname3 != "" && (
                    <>
                      <div>
                        <p className="text-left text-xl">
                          <Button variant="link" className="p-0" asChild>
                            <Link
                              href={studentInfo.ecfb3 ?? ""}
                              className="text-left text-xl"
                            >
                              {studentInfo.ecname3}
                            </Link>
                          </Button>{" "}
                          - {studentInfo.ecres3}
                        </p>
                        <p className="text-left text-lg">
                          {studentInfo.ecnum3}
                        </p>
                        <p className="text-left font-bold">
                          Emergency Contact 3
                        </p>
                      </div>
                      <Separator />
                    </>
                  )}
                </div>
              ) : (
                <Loading></Loading>
              )}
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
};

export default UserView;
