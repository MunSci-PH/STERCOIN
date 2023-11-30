"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface IContainerProps {
  router: AppRouterInstance;
}

const BackButton: React.FC<IContainerProps> = (props) => {
  return (
    <button
      className="btn space-y-4 inline w-fit"
      onClick={() => props.router.back()}
    >
      <AiOutlineArrowLeft />
    </button>
  );
};
export default BackButton;
