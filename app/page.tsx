import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto">
          <Image
            src="/logo.png"
            width={310}
            height={310}
            alt={""}
            className="mx-auto"
          />
          <div className="flex flex-row justify-center font-sans text-3xl font-semibold md:text-6xl">
            <span className="inline-flex flex-row items-center">
              Welcome to
              <p className="ml-3 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text py-3 font-bold text-transparent">
                STERCOIN
              </p>
            </span>
          </div>
          <p className="mt-3 bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-center font-semibold text-transparent md:text-xl">
            STUDENT EMERGENCY RELEASE CONTACT INFORMATION
          </p>
          <p className="mt-3 text-center font-medium md:text-2xl">
            A web application that stores every student&apos;s information that
            serves as an easy access to the student&apos;s emergency contacts
            information in case of disaster/emergency that may happen to the
            MunScian at school.
          </p>
        </div>
      </main>
    </>
  );
}
