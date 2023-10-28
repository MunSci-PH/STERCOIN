"use client";

import Form from "@/components/regForm";

export default function InfoReg() {
  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Information Registration
            </p>
            <Form />
          </div>
        </div>
      </main>
    </>
  );
}
