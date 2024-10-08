"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Testimonials.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import RenderStars from "@/components/shared/RenderStars";
import { FaQuoteRight } from "react-icons/fa";
import Image from "next/image";
import useReviews from "@/hooks/useReviews";
import Container from "@/components/Container";

const Testimonials = () => {
  const { data: reviews } = useReviews();
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    // Update the number of slides per view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
          <h3 className="font-bold text-[20px] text-center mb-1">
            Testimonial
          </h3>
          <h5 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 text-center">
            What Customer Says
          </h5>
          <p className="text-[#737373] dark:text-gray-300 text-[16px] font-normal w-full max-w-[717px] mx-auto text-center capitalize">
            Discover what our customers have to say about their experiences! We
            take pride in delivering reliable, high-quality service every time.
          </p>
        </div>
        <div className="mx-0 md:mx-16 lg:mx-12 2xl:mx-0 mt-10">
          <Swiper
            slidesPerView={swiperSlidesPerView}
            spaceBetween={30}
            navigation={{
              prevEl: ".swiper-button-prev-div",
              nextEl: ".swiper-button-next-div",
            }}
            modules={[Navigation]}
            className="mySwiper mt-10 h-[220px] relative"
          >
            {reviews?.map((review, index) => (
              <SwiperSlide key={index} style={{ height: "100%" }}>
                <div className="flex flex-col border border-gray-200 rounded-xl px-8 pt-[33px] h-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="ml-4">
                        <h1 className="text-xl font-semibold text-[#737373] dark:text-gray-300 mb-1">
                          {review.name}
                        </h1>
                        <h3 className="text-[16px] text-[#737373] dark:text-gray-300 font-medium">
                          {review.designation}
                        </h3>
                      </div>
                    </div>
                    <div>
                      <FaQuoteRight className="text-[#FF3811] w-[56px] h-[56px]" />
                    </div>
                  </div>
                  <p className="text-[16px] text-[#737373] dark:text-gray-300 my-4">
                    {review.description}
                  </p>
                  <div className="flex justify-between">
                    <div className="mb-6 flex justify-between items-center">
                      <div className="flex justify-center items-center">
                        <RenderStars rating={review.rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev-parent-div">
            <div className="swiper-button-prev-div">
              <IoIosArrowRoundBack />
            </div>
          </div>
          <div className="swiper-button-next-parent-div">
            <div className="swiper-button-next-div">
              <IoIosArrowRoundForward />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
