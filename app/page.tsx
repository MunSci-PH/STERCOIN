import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <Image
            src="/logo.png"
            width={310}
            height={310}
            alt={""}
            className="mx-auto"
          />
          <div className="flex flex-row text-3xl md:text-6xl font-sans font-semibold justify-center">
            <span className="inline-flex flex-row items-center">
              Welcome to
              <p className="ml-3 bg-clip-text text-transparent bg-gradient-to-r to-green-600 from-emerald-600 font-bold py-3">
                STERCOIN
              </p>
            </span>
          </div>
          <p className="mt-3 md:text-xl text-center bg-clip-text text-transparent font-semibold bg-gradient-to-r to-cyan-600 from-sky-600">
            STUDENT EMERGENCY RELEASE CONTACT INFORMATION
          </p>
          <p className="mt-3 md:text-2xl text-center font-medium">
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
