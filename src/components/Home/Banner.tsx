"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import banner1 from "../../assets/images/banner/1.jpg";
import banner2 from "../../assets/images/banner/2.jpg";
import banner3 from "../../assets/images/banner/3.jpg";
import banner4 from "../../assets/images/banner/4.jpg";
import banner5 from "../../assets/images/banner/5.jpg";
import banner6 from "../../assets/images/banner/6.jpg";
import { Button } from "../ui/button";
import Container from "../Container";

const Banner = () => {
  return (
    <Container className="mt-14">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        stopOnHover
        showThumbs={false}
        showStatus={false}
      >
        {[
          {
            image: banner1,
            title: "Full Car Servicing",
            description:
              "Comprehensive servicing packages to keep your car running smoothly.",
          },
          {
            image: banner2,
            title: "Engine Diagnostics",
            description:
              "Advanced diagnostics to ensure your engine is performing at its best.",
          },
          {
            image: banner3,
            title: "Tire & Wheel Services",
            description:
              "Expert tire installation, balancing, and alignment for optimal performance.",
          },
          {
            image: banner4,
            title: "Brake Repair",
            description:
              "Reliable brake repair services for your safety on the road.",
          },
          {
            image: banner5,
            title: "Battery Replacement",
            description:
              "Fast and efficient battery replacement services to get you back on the road.",
          },
          {
            image: banner6,
            title: "Oil Change",
            description:
              "Regular oil changes to keep your engine running smoothly and efficiently.",
          },
        ].map((slide, index) => (
          <div key={index} className="relative w-full h-[600px]">
            <Image
              src={slide.image}
              layout="fill"
              objectFit="cover"
              alt={`banner img${index + 1}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="my-6 text-lg font-semibold">{slide.description}</p>
              <Button
                type="submit"
                className="py-2 rounded-md text-white text-lg font-medium bg-[#FF3811] hover:bg-[#FF3811] dark:bg-[#FF3811]"
              >
                Discover Services
              </Button>
            </div>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default Banner;
