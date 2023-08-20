import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-row text-3xl md:text-6xl font-sans font-semibold justify-center md:justify-start">
            <span className="inline-flex flex-row items-center">
              Welcome to
              <p className="ml-3 bg-clip-text text-transparent bg-gradient-to-r to-green-600 from-emerald-600 font-bold py-3">
                STERCOIN
              </p>
            </span>
          </div>
          <p className="mt-3 md:text-2xl text-center md:text-left font-medium">
            Student Emergency Release Contact Information for Muntinlupa Science
            High School.
          </p>
        </div>
      </main>
    </>
  );
}
