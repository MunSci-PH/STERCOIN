"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [accepted, setAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("disclaimer") === null) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  }, []);

  const handleAccept = (acceptedVal: string) => {
    localStorage.setItem("disclaimer", acceptedVal);
    setAccepted(false);
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal" open={accepted}>
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Disclaimer</h3>
          <p className="py-4">
            Muntinlupa Science High School is bound by the law under RA 10173
            “Data Privacy Act of 2012” All information save on this application
            would be deemed confidential, and only the school’s authorities are
            authorized to share information. Such information would be shared
            for legal and legitimate purposes only.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => handleAccept("false")}>
              Accept
            </button>
          </div>
        </form>
      </dialog>
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
            STERCOIN. An abbreviation that stands for &quot;Students Emergency
            Release Contact Information&quot;. A web application with student’s
            information that can be used for easy accessibility to
            parent’s/guardian’s contact information in case of
            disaster/emergency happen to child at school.
          </p>
        </div>
      </main>
    </>
  );
}
