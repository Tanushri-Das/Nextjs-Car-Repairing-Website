"use client";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import useServiceById from "@/hooks/useServiceById";
import Image from "next/image";
import Container from "@/components/Container";
import LoadingPage from "@/app/loading";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { Button } from "@/components/ui/button";
import ServiceTitlesList from "@/components/ServiceTitlesList";
import Breadcrumb from "@/components/Breadcrumb";

const ServiceDetailsPage = ({ params }: { params: { id: string } }) => {
  useDynamicTitle();
  const { id } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Fetch service data using the ID
  const { data, isLoading } = useServiceById(id); // Use isLoading and isError

  // If the data is still loading, display the loading page
  if (isLoading) {
    return <LoadingPage />; // Render the loading component
  }

  // Access the service data from the response object
  const service = data?.response;

  // If service data is not available, return early or render a fallback
  if (!service) {
    return <div>Service not found.</div>; // Optionally render a loading or error state here
  }

  // Destructure the service object
  const { title, description, img, price, facility, _id } = service;

  const handleCheckoutClick = () => {
    if (!session) {
      Swal.fire({
        title: "Please login to proceed to checkout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page with callback URL
          router.push(`/login?callbackUrl=${pathname}`);
        }
      });
    } else {
      // Proceed to checkout if user is logged in
      router.push(`/checkout/${_id}`);
    }
  };

  return (
    <Container className="mt-14">
      {/* Header Section with Title and Breadcrumb */}
      <div className="relative h-72 mb-10">
        <div className="w-full h-full relative overflow-hidden">
          <Image src={img} layout="fill" objectFit="cover" alt="Service Card" />
        </div>
        <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-black/50">
          <h1 className="text-white text-4xl font-bold">Service Details</h1>
        </div>
        {/* Breadcrumb */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <Breadcrumb page={"Service Details"} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left Side: Image, Title, Description */}
        <div>
          <div className="mb-5">
            <Image
              src={img}
              layout="responsive"
              objectFit="cover"
              alt="Service Card"
              width={500}
              height={300}
            />
          </div>
          <h2 className="text-3xl font-bold text-orange-600 mb-5">{title}</h2>
          <p className="text-[#737373] dark:text-gray-300 text-[16px]">
            {description}
          </p>
        </div>

        {/* Right Side: Service Titles List */}
        <div>
          <ServiceTitlesList />
        </div>
      </div>

      {/* Facilities and Checkout Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Left Side: Facility Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-6">
          {facility.map((item, index) => (
            <div
              className="bg-[#F3F3F3] p-4 border-t-4 border-t-rose-500 rounded-lg"
              key={index}
            >
              <h2 className="text-xl font-bold dark:text-[#151515] mb-2">
                {item.name}
              </h2>
              <p className="text-[16px] dark:text-[#151515]">{item.details}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Checkout Section */}
        <div className="p-8 bg-gray-100 rounded-lg w-full md:w-3/5 md:mx-auto xl:w-3/4 xl:ml-auto xl:mr-0">
          <Image
            className="w-full object-cover h-40 rounded-lg"
            src={img}
            alt="checkout service"
            width={400}
            height={400}
          />
          <div className="flex flex-col justify-center items-center mt-7">
            <h2 className="text-xl text-[#151515] dark:text-[#151515] font-bold mb-5">
              Price : ${price}
            </h2>
            <Button
              onClick={handleCheckoutClick}
              type="submit"
              className="rounded-md text-white text-lg font-medium bg-[#FF3811] dark:bg-[#FF3811]"
            >
              Check out
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetailsPage;
