import React from "react";
import person from "../../assets/images/about_us/person.jpg";
import parts from "../../assets/images/about_us/parts.jpg";
import Image from "next/image";
import Container from "../Container";

const About = () => {
  return (
    <Container id="about">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 relative mb-28 lg:mb-0">
          <Image
            src={person}
            alt="Mechanic working"
            className="w-3/4 rounded-lg shadow-2xl"
          />
          <Image
            src={parts}
            alt="Car parts"
            className="w-1/2 rounded-lg shadow-2xl absolute right-5 top-1/2 border-8 border-white"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-[20px] text-primary mb-2 font-bold">About Us</h1>
          <h2 className="text-[#151515] text-[45px] font-bold mb-3 w-full lg:w-[376px]">
            We are qualified & of experience in this field
          </h2>
          <p className="text-[#737373] w-full lg:w-[489px] text-[16px] font-normal mb-3">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable.{" "}
          </p>
          <p className="text-[#737373] w-full lg:w-[489px] text-[16px] font-normal mb-6">
            The majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable.
          </p>
          <button className="btn btn-primary font-semibold text-[18px] text-white">
            Get More Info
          </button>
        </div>
      </div>
    </Container>
  );
};

export default About;
