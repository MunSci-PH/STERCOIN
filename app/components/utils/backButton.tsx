"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="inline w-fit space-y-4"
      onClick={() => router.back()}
      type="button"
      title="Back"
    >
      <ArrowLeft />
    </Button>
  );
};

export default BackButton;
