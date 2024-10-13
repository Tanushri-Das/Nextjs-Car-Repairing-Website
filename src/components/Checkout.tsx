"use client";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { Booking } from "@/types";

type serviceInfo = {
  serviceId: string;
  serviceImg: string;
  servicePrice: string;
};
const Checkout = ({ serviceId, serviceImg, servicePrice }: serviceInfo) => {
  useDynamicTitle();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { data: cartData } = useCart();
  const isInCart = cartData?.mybookings?.some(
    (item: Booking) => item.serviceID === serviceId
  );
  console.log("cartData", cartData);
  console.log("isInCart", isInCart);

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
    } else if (isInCart) {
      Swal.fire({
        title: "Already in Cart",
        text: "This book is already added to your cart.",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // Proceed to checkout if user is logged in
      router.push(`/checkout/${serviceId}`);
    }
  };

  return (
    <>
      {/* Right Side: Checkout Section */}
      <div className="p-8 bg-gray-100 rounded-lg w-full md:w-3/5 md:mx-auto xl:w-3/4 xl:ml-auto xl:mr-0">
        <Image
          className="w-full object-cover h-40 rounded-lg"
          src={serviceImg}
          alt="checkout service"
          width={400}
          height={400}
        />
        <div className="flex flex-col justify-center items-center mt-7">
          <h2 className="text-xl text-[#151515] dark:text-[#151515] font-bold mb-5">
            Price : ${servicePrice}
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
    </>
  );
};

export default Checkout;
