"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Team.css";
import Image from "next/image";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
  FaSkype,
} from "react-icons/fa6";
import Link from "next/link";
import useTeam from "@/hooks/useTeam";
import Container from "@/components/Container";

const Team = () => {
  const { data: team } = useTeam();
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // Large screens
        setSwiperSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
        // Medium screens
        setSwiperSlidesPerView(2);
      } else {
        // Small screens
        setSwiperSlidesPerView(1);
      }
    };

    // Initial call
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <div className="relative">
        <div className="text-center">
          <h3 className="font-bold text-[20px] text-center mb-1">Team</h3>
          <h5 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 text-center">
            Meet Our Team
          </h5>
          <p className="text-[#737373] dark:text-gray-300 text-[16px] font-medium w-full max-w-[717px] mx-auto text-center capitalize">
            Our skilled and dedicated team works tirelessly to provide top-notch
            car repair and maintenance services.
          </p>
        </div>
        <div className="mx-0 md:mx-16 lg:mx-12 2xl:mx-0 mt-10">
          <Swiper
            slidesPerView={swiperSlidesPerView}
            spaceBetween={30}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Navigation]}
            className="mySwiper mt-10 h-[500px] md:h-96 relative"
          >
            {team?.map((member, index) => (
              <SwiperSlide key={index} style={{ height: "100%" }}>
                <div className="flex flex-col border border-gray-200 rounded-xl px-4 pt-4 h-full">
                  <div className="w-full h-64 relative rounded-lg mb-4">
                    <Image
                      src={member.image}
                      layout="fill"
                      objectFit="cover"
                      alt="Service Card"
                      className="rounded-lg"
                    />
                  </div>
                  <h1 className="text-2xl text-[#444444] font-bold mb-2 text-center">
                    {member.title}
                  </h1>
                  <h3 className="text-[20px] text-[#737373] font-semibold mb-4 text-center">
                    {member.designation}
                  </h3>
                  <div className="flex justify-center items-center space-x-2 mb-6">
                    <div>
                      <Link
                        href="https://www.linkedin.com/in/tanushri-das/"
                        target="_blank"
                      >
                        <button className="flex justify-center items-center bg-[#395185] rounded-full w-10 h-10">
                          <FaFacebook className="text-white text-lg" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="https://www.linkedin.com/in/tanushri-das/"
                        target="_blank"
                      >
                        <button className="flex justify-center items-center bg-[#55ACEE] rounded-full w-10 h-10">
                          <FaSkype className="text-white text-lg" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="https://www.linkedin.com/in/tanushri-das/"
                        target="_blank"
                      >
                        <button className="flex justify-center items-center bg-[#0A66C2] rounded-full w-10 h-10">
                          <FaLinkedinIn className="text-white text-lg" />
                        </button>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="https://www.linkedin.com/in/tanushri-das/"
                        target="_blank"
                      >
                        <button
                          className="flex justify-center items-center rounded-full w-10 h-10"
                          style={{
                            background:
                              "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",
                          }}
                        >
                          <FaInstagram className="text-white text-lg" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Navigation buttons */}
          <div className="swiper-button-prev-container">
            <div className="swiper-button-prev">
              <IoIosArrowRoundBack className="text-lg" />
            </div>
          </div>
          <div className="swiper-button-next-container">
            <div className="swiper-button-next">
              <IoIosArrowRoundForward className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Team;
