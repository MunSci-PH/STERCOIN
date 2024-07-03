import Link from "next/link";
import { UserInfo } from "./types";

interface IContainerProps {
  user: UserInfo;
}

const AdminView: React.FC<IContainerProps> = (props) => {
  return (
    <div className=" my-36 grid grid-cols-2 gap-4 text-white md:grid-cols-6">
      {props.user?.role == "full" ||
      props.user?.role == "7" ||
      props.user?.role == "jhs" ? (
        <Link
          href="/dashboard/view/grade/7"
          className="flex flex-col rounded-xl bg-green-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>7</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-green-600 p-12 text-2xl opacity-50 md:p-10"
          aria-disabled={true}
        >
          <span>Grade</span>
          <span>7</span>
        </Link>
      )}
      {props.user?.role == "full" ||
      props.user?.role == "8" ||
      props.user?.role == "jhs" ? (
        <Link
          href="/dashboard/view/grade/8"
          className="flex flex-col rounded-xl bg-yellow-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>8</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-yellow-600 p-12 text-2xl opacity-50 md:p-10"
          aria-disabled={true}
        >
          <span>Grade</span>
          <span>8</span>
        </Link>
      )}
      {props.user?.role == "full" ||
      props.user?.role == "9" ||
      props.user?.role == "jhs" ? (
        <Link
          href="/dashboard/view/grade/9"
          className="flex flex-col rounded-xl bg-red-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>9</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-red-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>9</span>
        </Link>
      )}
      {props.user?.role == "full" ||
      props.user?.role == "10" ||
      props.user?.role == "jhs" ? (
        <Link
          href="/dashboard/view/grade/10"
          className="flex flex-col rounded-xl bg-cyan-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>10</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-cyan-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>10</span>
        </Link>
      )}
      {props.user?.role == "full" ||
      props.user?.role == "11" ||
      props.user?.role == "shs" ? (
        <Link
          href="/dashboard/view/grade/11"
          className="flex flex-col rounded-xl bg-blue-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>11</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-blue-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>11</span>
        </Link>
      )}
      {props.user?.role == "full" ||
      props.user?.role == "12" ||
      props.user?.role == "shs" ? (
        <Link
          href="/dashboard/view/grade/12"
          className="flex flex-col rounded-xl bg-orange-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>12</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col rounded-xl bg-orange-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>12</span>
        </Link>
      )}
    </div>
  );
};

export default AdminView;
