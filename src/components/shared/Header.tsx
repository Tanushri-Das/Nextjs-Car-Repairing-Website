"use client";
import Container from "@/components/Container";
import { ThemeToggler } from "@/components/ThemeToggler";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import logo from "@/assets/logo.svg";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="dark:text-gray-200 border-b-[1px] border-black/80 dark:border-b-white/20">
      <Container className="py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-lg font-bold lg:flex-grow-0">
          <Link href="/">
            <div className="flex justify-center items-center">
              <Image alt="logo" src={logo} height={60} width={100} />
            </div>
          </Link>
        </div>

        {/* Center: Navigation (Hidden on small screens) */}
        <nav className="hidden lg:flex lg:inset-0 lg:justify-center lg:items-center">
          <div className="flex items-center gap-x-8 font-semibold text-lg">
            {/* Hardcoded Navigation Links */}
            <Link href="/" className="text-lg">
              Home
            </Link>
            <Link href="#about" className="text-lg">
              About
            </Link>
            <Link href="#services" className="text-lg">
              Services
            </Link>
            <Link href="/add-review" className="text-lg">
              Add Review
            </Link>

            {session ? (
              <>
                <Link href="/myCart" className="text-lg">
                  My Cart
                </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 ms-1"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-md text-white text-lg bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium ms-1"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Right: Theme Toggler (Visible on all screens) */}
        <div className="flex-grow flex justify-center lg:flex-grow-0 lg:relative">
          <ThemeToggler />
        </div>

        {/* Right: Menu Icon (Visible only on small to medium screens) */}
        <div className="lg:hidden">
          <button onClick={toggleDrawer}>
            <FiMenu className="text-2xl" />
          </button>
        </div>

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-transform transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } w-[200px] z-50`}
        >
          {/* Close Icon inside Drawer, positioned to the right */}
          <div className="flex justify-end p-4">
            <button onClick={toggleDrawer}>
              <FaXmark className="text-2xl" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex flex-col gap-y-4 p-5 font-semibold text-lg lg:text-[16px]">
            {/* Hardcoded Drawer Links */}
            <Link href="/" onClick={toggleDrawer}>
              Home
            </Link>
            <Link href="#about" onClick={toggleDrawer}>
              About
            </Link>
            <Link href="#services" onClick={toggleDrawer}>
              Services
            </Link>
            <Link href="/add-review" onClick={toggleDrawer}>
              Add Review
            </Link>
            {session ? (
              <>
                <Link href="/myCart" onClick={toggleDrawer}>
                  My Cart
                </Link>
                <button
                  onClick={() => {
                    toggleDrawer(); // Close the drawer
                    signOut();
                  }}
                  className="rounded-md text-center text-white text-lg bg-fuchsia-800 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium w-28"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={toggleDrawer}
                className="rounded-md text-center text-white text-lg bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300 px-4 py-[6px] font-medium w-24"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Overlay */}
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleDrawer}
          ></div>
        )}
      </Container>
    </header>
  );
};

export default Header;
