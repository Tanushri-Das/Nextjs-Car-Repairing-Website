"use client";
import Container from "@/components/Container";
import useCart from "@/hooks/useCart";
import { Booking } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const MyCart = () => {
  const { data: cartData } = useCart();
  const { data: session } = useSession();
  const myBookings = cartData?.mybookings || [];

  return (
    <Container className="mt-12">
      <h1 className="text-3xl font-bold flex justify-center items-center">
        My Cart
      </h1>
      <div className="mt-10">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Service Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Service Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myBookings?.map((booking: Booking, index: number) => (
                <tr key={booking._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={booking.serviceImage}
                        layout="fill"
                        objectFit="cover"
                        alt={`Image of ${booking.serviceName}`}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.serviceName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {session?.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                    ${booking.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Button
                        type="submit"
                        className="rounded-md text-white text-[16px] font-medium bg-[#444444] dark:bg-[#444444]"
                      >
                        Edit
                      </Button>
                      <Button
                        type="submit"
                        className="rounded-md text-white text-[16px] font-medium bg-[#FF3811] dark:bg-[#FF3811] ms-3"
                      >
                        Submit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default MyCart;
