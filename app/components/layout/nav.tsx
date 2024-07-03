import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/info-reg">
                Student&apos;s Information Registration
              </Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl normal-case" href="/">
          <Image src={"/logo.png"} width="32" height="32" alt="" />
          STERCOIN
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/info-reg">
              Student&apos;s Information Registration
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn" href="/dashboard">
          User Dashboard
        </Link>
      </div>
    </div>
  );
};
export default Nav;
