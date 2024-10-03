import Image from "next/image";
import Link from "next/link";
import React from "react";
import footerlogo from "../../assets/images/footer/footerImg.png";
import {
  FaGoogle,
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[#151515] text-base-content p-10">
      <div className="flex flex-col items-center mb-3">
        <Link href={"/"}>
          <Image alt="logo" src={footerlogo} height={60} width={100} />
        </Link>
        <p className="w-full max-w-[300px] text-secondary text-[16px] font-normal my-4">
          Edwin Diaz is a software and web technologies engineer, a life coach
          trainer who is also a serial .
        </p>
        <div className="flex space-x-3 mb-8">
          <button className="flex justify-center items-center bg-[#F5F5F8] rounded-full w-[55px] h-[55px]">
            <FaGoogle className="text-black text-xl" />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-[#F5F5F8] rounded-full w-[55px] h-[55px]"
          >
            <FaLinkedinIn className="text-black text-xl" />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-[#F5F5F8] rounded-full w-[55px] h-[55px]"
          >
            <FaFacebook className="text-black text-xl" />
          </button>
          <button
            type="submit"
            className="flex justify-center items-center bg-[#F5F5F8] rounded-full w-[55px] h-[55px]"
          >
            <FaInstagram className="text-black text-xl" />
          </button>
        </div>
      </div>
      <div className="mb-10 sm:mb-10">
        <h6 className="text-[20px] text-white font-semibold mb-8 text-center">
          About
        </h6>
        <Link href="/" className="text-accent text-center block mb-4">
          Home
        </Link>
        <Link href="/" className="text-accent text-center block mb-4">
          Service
        </Link>
        <Link href="/" className="text-accent text-center block">
          Contact
        </Link>
      </div>
      <div className="mb-10">
        <h6 className="text-[20px] text-white font-semibold mb-8 text-center">
          Company
        </h6>
        <Link href="/" className="text-accent text-center block mb-4">
          About Us
        </Link>
        <Link href="/" className="text-accent text-center block">
          Contact
        </Link>
      </div>
      <div className="mb-10">
        <h6 className="text-[20px] text-white font-semibold mb-8 text-center">
          Support
        </h6>
        <Link href="/" className="text-accent text-center block mb-4">
          Support Center
        </Link>
        <Link href="/" className="text-accent text-center block mb-4">
          Feedback
        </Link>
        <Link href="/" className="text-accent text-center block">
          Accesbility
        </Link>
      </div>
    </div>
  );
};

export default Footer;
