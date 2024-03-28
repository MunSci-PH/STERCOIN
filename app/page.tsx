"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-row text-5xl md:text-8xl font-sans font-semibold justify-center">
            <span className="flex md:inline-flex flex-col md:flex-row items-center ">
              <Image src="/logo.png" width={200} height={200} alt={""} />
              <p className="ml-3 bg-clip-text text-transparent bg-gradient-to-r to-green-600 from-emerald-600 font-bold py-3">
                STERCOIN
              </p>
            </span>
          </div>
          <div className="divider"></div>
          <p className="mt-10 text-3xl md:text-4xl text-center bg-clip-text text-transparent font-bold bg-gradient-to-r to-cyan-600 from-sky-600">
            MAINTENANCE MODE
          </p>
          <p className="mt-3 text-2xl text-center font-medium">
            We&apos;re working to improve this service! Please try again later.
          </p>
        </div>
      </main>
    </>
  );
}
