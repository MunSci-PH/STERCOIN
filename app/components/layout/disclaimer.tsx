"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const Disclaimer = () => {
  const [shouldOpen, setShouldOpen] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("disclaimer") === null) {
      setShouldOpen(true);
    } else {
      setShouldOpen(false);
    }
  }, []);

  const handleAccept = (acceptedVal: string) => {
    localStorage.setItem("disclaimer", acceptedVal);
    setShouldOpen(false);
  };

  return (
    <Dialog open={shouldOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disclaimer</DialogTitle>
          <DialogDescription>
            Muntinlupa Science High School is bound by the law under RA 10173
            “Data Privacy Act of 2012” All information saved on this web
            application would be deemed confidential, and only the school&#39;s
            authorities are authorized to share information. Such information
            would be shared for legal and legitimate purposes only.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleAccept("false")}
            >
              Accept
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Disclaimer;
