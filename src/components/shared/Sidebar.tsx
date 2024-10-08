"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Container>
      <div className="min-h-screen bg-[#f3f4f6] dark:bg-[#f3f4f6] dark:text-black flex flex-col justify-start pt-6 sm:p-6 space-y-4">
        <Link
          href="/dashboard"
          className={`flex justify-center lg:justify-start items-center px-3 py-2 rounded-md transition duration-300 ${
            pathname === "/dashboard"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white"
          }`}
        >
          <span className="text-3xl lg:text-xl">
            <AiFillHome />
          </span>
          <span className="hidden lg:block pt-[2px] ms-2 text-lg">
            Dashboard
          </span>
        </Link>

        <Link
          href="/dashboard/myCart"
          className={`flex justify-center lg:justify-start items-center px-3 py-2 rounded-md transition duration-300 ${
            pathname === "/dashboard/myCart"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white"
          }`}
        >
          <span className="text-3xl lg:text-xl">
            <FaShoppingCart />
          </span>
          <span className="hidden lg:block ms-2 text-lg">My Cart</span>
        </Link>

        <Link
          href="/dashboard/add-review"
          className={`flex justify-center lg:justify-start items-center px-3 py-2 rounded-md transition duration-300 ${
            pathname === "/dashboard/add-review"
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-700 hover:text-white"
          }`}
        >
          <span className="text-3xl lg:text-xl">
            <FaStar />
          </span>
          <span className="hidden lg:block ms-2 text-lg">Add Review</span>
        </Link>
      </div>
    </Container>
  );
};

export default Sidebar;
