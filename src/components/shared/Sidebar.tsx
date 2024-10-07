import Link from "next/link";
import Container from "../Container";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <Container>
      <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-start pt-6 sm:p-6 space-y-4">
        <Link
          href="/dashboard"
          className="flex justify-center lg:justify-start items-center hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
        >
          <span className="text-3xl lg:text-xl">
            <AiFillHome />
          </span>

          <span className="hidden lg:block ms-2">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/myCart"
          className="flex justify-center lg:justify-start items-center hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
        >
          <span className="text-3xl lg:text-xl">
            <FaShoppingCart />
          </span>
          <span className="hidden lg:block ms-2">My Cart</span>
        </Link>
        <Link
          href="/dashboard/add-review"
          className="flex justify-center lg:justify-start items-center hover:bg-gray-700 px-3 py-2 rounded-md transition duration-300"
        >
          <span className="text-3xl lg:text-xl">
            <FaStar />
          </span>
          <span className="hidden lg:block ms-2">Add Review</span>
        </Link>
      </div>
    </Container>
  );
};

export default Sidebar;
