import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          <Image src={"/logo.png"} width="32" height="32" alt="" />
          STERCOIN
        </Link>
      </div>
    </div>
  );
};
export default Nav;
