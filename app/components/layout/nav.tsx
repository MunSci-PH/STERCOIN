"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../../../public/logo.png";
import useSupabaseBrowser from "@/utils/client";
import { User } from "@supabase/supabase-js";
import { UserInfo } from "@/dashboard/types";

const Nav = ({ user, role }: { user: User | null; role: UserInfo | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = useSupabaseBrowser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (user) {
    return (
      <>
        <header className="flex h-16 items-center border-b px-4 lg:px-6">
          <Button variant={"ghost"} asChild>
            <Link
              className="flex items-center justify-center"
              href="/dashboard"
            >
              <Image src={Logo} alt="Logo" className="size-6" />
              <span className="ml-2 text-lg font-semibold">STERCOIN</span>
            </Link>
          </Button>
          <nav className="ml-auto hidden gap-4 sm:gap-6 md:flex">
            <Button variant={"outline"} asChild>
              <Link href="/dashboard">Home</Link>
            </Button>
            {role?.isAdmin && (
              <Button variant={"outline"} asChild>
                <Link href="/dashboard/admin/search">Search</Link>
              </Button>
            )}
            <Button variant={"outline"} asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
            <Button
              variant={"default"}
              onClick={async () => {
                const { error } = await supabase.auth.signOut({
                  scope: "local",
                });
                if (error) throw error;
                return window.location.reload();
              }}
              type="button"
            >
              Sign Out
            </Button>
          </nav>
          <Button
            className="ml-auto md:hidden"
            variant="outline"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </motion.div>
          </Button>
        </header>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="border-b px-4 py-2 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                className="block py-2 text-sm font-medium underline-offset-4 hover:underline"
                href="/dashboard"
              >
                Home
              </Link>
              {role?.isAdmin && (
                <Link
                  className="block py-2 text-sm font-medium underline-offset-4 hover:underline"
                  href="/dashboard/admin/search"
                >
                  Search
                </Link>
              )}
              <Link
                className="block py-2 text-sm font-medium underline-offset-4 hover:underline"
                href="/dashboard/settings"
              >
                Settings
              </Link>
              <Button
                variant={"default"}
                onClick={async () => {
                  const { error } = await supabase.auth.signOut({
                    scope: "local",
                  });
                  if (error) throw error;
                  return window.location.reload();
                }}
                type="button"
                className="my-2 w-full"
              >
                Sign Out
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </>
    );
  } else {
    return (
      <>
        <header className="flex h-16 items-center border-b px-4 lg:px-6">
          <Button variant={"ghost"} asChild>
            <Link className="flex items-center justify-center" href="/">
              <Image src={Logo} alt="Logo" className="size-6" />
              <span className="ml-2 text-lg font-semibold">STERCOIN</span>
            </Link>
          </Button>
          <nav className="ml-auto hidden gap-4 sm:gap-6 md:flex">
            <Button variant={"outline"} asChild>
              <Link href="/info-reg">Sign Up</Link>
            </Button>
            <Button variant={"default"} asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
          </nav>
          <Button
            className="ml-auto md:hidden"
            variant="outline"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </motion.div>
          </Button>
        </header>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="border-b px-4 py-2 md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant={"outline"} className="my-2 w-full" asChild>
                <Link href="/info-reg">Sign Up</Link>
              </Button>
              <Button variant={"default"} className="my-2 w-full" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </>
    );
  }
};
export default Nav;
