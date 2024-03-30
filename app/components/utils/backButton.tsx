"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn space-y-4 inline w-fit"
      onClick={() => router.back()}
    >
      <AiOutlineArrowLeft />
    </button>
  );
};
export default BackButton;
