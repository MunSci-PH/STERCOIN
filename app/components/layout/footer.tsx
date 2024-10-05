import Link from "next/link";
import { SiFacebook } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <div className="flex flex-col gap-2 text-center md:text-left">
        <p className="text-xs text-gray-500">
          All Rights Reserved. Muntinlupa Science High School, School Disaster
          Risk Reduction Management.
        </p>
      </div>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          className=" underline-offset-4 hover:underline md:text-xl"
          href="https://www.facebook.com/profile.php?id=61556414725090"
        >
          <SiFacebook color="default" />
        </Link>
      </nav>
    </footer>
  );
};
export default Footer;
