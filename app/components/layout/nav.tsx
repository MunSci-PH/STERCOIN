"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../../../public/logo.png";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <Link
              className="block py-2 text-sm font-medium underline-offset-4 hover:underline"
              href="/info-reg"
            >
              Registration
            </Link>
            <Link
              className="block py-2 text-sm font-medium underline-offset-4 hover:underline"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
export default Nav;
