"use client";

import { useEffect, useState } from "react";

const Disclaimer = () => {
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
    <dialog id="my_modal_1" className="modal" open={accepted}>
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">Disclaimer</h3>
        <p className="py-4">
          Muntinlupa Science High School is bound by the law under RA 10173
          “Data Privacy Act of 2012” All information saved on this web
          application would be deemed confidential, and only the school&#39;s
          authorities are authorized to share information. Such information
          would be shared for legal and legitimate purposes only.
        </p>
        <div className="modal-action">
          <button className="btn" onClick={() => handleAccept("false")}>
            Accept
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Disclaimer;
