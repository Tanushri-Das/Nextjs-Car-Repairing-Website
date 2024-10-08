"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DashboardPage = async () => {
  const { data: session } = useSession();

  return (
    <Container className="flex flex-col justify-center items-center min-h-screen">
      {session?.user && (
        <>
          <h1 className="text-4xl text-center">
            Welcome {session?.user?.name}
          </h1>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-[16px] font-normal dark:font-semibold w-full max-w-[717px] mx-auto text-center my-7">
            This is a car repairing website. You can book services for your car,
            which are included in our offerings. We strive to provide you with
            the best services. Our team is dedicated to ensuring your car runs
            smoothly.
          </p>
          <Link href="/#services" className="flex justify-center items-center">
            <Button className="bg-[#FF3811] hover:bg-red-700 text-[20px] text-white font-semibold px-5 py-2 rounded-md cursor-pointer outline-none transition duration-300 ease-in-out transform hover:scale-105">
              View Services
            </Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default DashboardPage;
