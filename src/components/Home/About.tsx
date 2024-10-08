import React from "react";
import person from "../../assets/images/about_us/person.jpg";
import parts from "../../assets/images/about_us/parts.jpg";
import Image from "next/image";
import Container from "../Container";
import { Button } from "../ui/button";

const About = () => {
  return (
    <Container id="about" className="-mt-9">
      <div className="flex flex-col lg:flex-row items-center gap-x-8">
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
          <h1 className="text-[20px] mb-3 font-bold">About Us</h1>
          <h2 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 w-full lg:w-[376px]">
            We are qualified & of experience in this field
          </h2>
          <p className="text-[#737373] dark:text-gray-300 w-full lg:w-[489px] text-[16px] font-medium mb-3">
            At our car service center, we offer a wide range of automotive
            repair and maintenance services. With years of experience, our
            expert technicians ensure that your vehicle is in the best hands.
          </p>
          <p className="text-[#737373] dark:text-gray-300 w-full lg:w-[489px] text-[16px] font-medium mb-6">
            From routine oil changes to major repairs, we use the latest tools
            and technology to provide quality services. Customer satisfaction is
            our top priority, and we guarantee reliable and efficient car care.
          </p>

          <Button
            type="submit"
            className="py-2 rounded-md text-white text-lg font-medium bg-[#FF3811] hover:bg-[#FF3811] dark:bg-[#FF3811]"
          >
            Get More Info
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default About;
