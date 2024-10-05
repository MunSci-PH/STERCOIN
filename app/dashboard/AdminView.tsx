import Link from "next/link";
import { UserInfo } from "./types";

const AdminView = ({ user }: { user: UserInfo }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-3 xl:grid-cols-6">
      {user?.role == "full" || user?.role == "7" || user?.role == "jhs" ? (
        <Link
          href="/dashboard/admin/view/grade/7"
          className="flex flex-col items-center rounded-xl bg-green-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>7</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-green-600 p-12 text-2xl opacity-50 md:p-10"
          aria-disabled={true}
        >
          <span>Grade</span>
          <span>7</span>
        </Link>
      )}
      {user?.role == "full" || user?.role == "8" || user?.role == "jhs" ? (
        <Link
          href="/dashboard/admin/view/grade/8"
          className="flex flex-col items-center rounded-xl bg-yellow-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>8</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-yellow-600 p-12 text-2xl opacity-50 md:p-10"
          aria-disabled={true}
        >
          <span>Grade</span>
          <span>8</span>
        </Link>
      )}
      {user?.role == "full" || user?.role == "9" || user?.role == "jhs" ? (
        <Link
          href="/dashboard/admin/view/grade/9"
          className="flex flex-col items-center rounded-xl bg-red-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>9</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-red-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>9</span>
        </Link>
      )}
      {user?.role == "full" || user?.role == "10" || user?.role == "jhs" ? (
        <Link
          href="/dashboard/admin/view/grade/10"
          className="flex flex-col items-center rounded-xl bg-cyan-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>10</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-cyan-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>10</span>
        </Link>
      )}
      {user?.role == "full" || user?.role == "11" || user?.role == "shs" ? (
        <Link
          href="/dashboard/admin/view/grade/11"
          className="flex flex-col items-center rounded-xl bg-blue-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>11</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-blue-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>11</span>
        </Link>
      )}
      {user?.role == "full" || user?.role == "12" || user?.role == "shs" ? (
        <Link
          href="/dashboard/admin/view/grade/12"
          className="flex flex-col items-center rounded-xl bg-orange-600 p-12 text-2xl md:p-10"
        >
          <span>Grade</span>
          <span>12</span>
        </Link>
      ) : (
        <Link
          href="#"
          className="pointer-events-none flex cursor-default flex-col items-center rounded-xl bg-orange-600 p-12 text-2xl opacity-50 md:p-10"
        >
          <span>Grade</span>
          <span>12</span>
        </Link>
      )}
    </div>
  );
};

export default AdminView;
