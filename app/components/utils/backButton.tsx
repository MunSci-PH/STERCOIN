"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn inline w-fit space-y-4"
      onClick={() => router.back()}
      type="button"
      title="Back"
    >
      <AiOutlineArrowLeft />
    </button>
  );
};

export default BackButton;
