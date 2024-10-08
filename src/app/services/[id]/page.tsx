"use client";

import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import useServiceById from "@/hooks/useServiceById";
import Image from "next/image";
import Container from "@/components/Container";
import LoadingPage from "@/app/loading";
import useDynamicTitle from "@/hooks/useDynamicTitle";

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
      <div>
        <div className="relative h-72">
          <div className="w-full h-full relative overflow-hidden">
            <Image
              src={img}
              layout="fill"
              objectFit="cover"
              alt="Service Card"
            />
          </div>
          <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
            <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
              Details of {title}
            </h1>
          </div>
        </div>

        <div className="p-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-orange-600 mb-5">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-6">
            {facility.map((item, index) => (
              <div
                className="bg-[#F3F3F3] p-4 border-t-4 border-t-rose-500 rounded-xl"
                key={index}
              >
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p>{item.details}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-100 border-2 border-red-800">
            <Image
              className="w-full object-cover h-40 rounded-lg"
              src={img}
              alt="checkout service"
              width={400}
              height={400}
            />
            <div className="flex my-4">
              <h2 className="text-xl font-bold">Price : </h2>
              <p className="text-xl font-bold ms-1"> ${price}</p>
            </div>
            <button
              className="bg-primary text-white px-3 py-2 rounded-lg mt-2 w-full"
              onClick={handleCheckoutClick}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ServiceDetailsPage;
