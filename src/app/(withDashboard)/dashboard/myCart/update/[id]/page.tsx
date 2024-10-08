"use client";

import Container from "@/components/Container";
import useCartById from "@/hooks/useCartById";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingPage from "@/app/loading";
import { useRouter } from "next/navigation";

const BookingUpdatePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session } = useSession();
  const { data, isLoading } = useCartById(id);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();
  const queryClient = useQueryClient();

  const booking = data?.response;

  // Populate the form data once booking data is loaded
  useEffect(() => {
    if (booking) {
      setFormData({
        name: session?.user?.name || "",
        date: booking.date || "",
        email: session?.user?.email || "",
        price: booking.price || "",
        address: booking.address || "",
        phone: booking.phone || "",
        countryCode: booking.countryCode || "", // Initialize countryCode here
      });
      setPhoneNumber(`${booking.countryCode}${booking.phone}`);
    }
  }, [booking, session]);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
  };

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Mutation for updating booking
  const updateMutation = useMutation({
    mutationFn: async (updatedBooking: any) => {
      return await axios.patch(
        `/dashboard/myCart/api/booking/${updatedBooking._id}`,
        updatedBooking
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email ?? ""],
      });

      Swal.fire({
        title: "Success!",
        text: "Update personal information successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/dashboard/myCart"); // Navigate to MyCart after update
      });
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10); // Assuming country code is 3 digits
    const phone = phoneNumber.slice(-10); // Last 10 digits for the phone number

    const updatedBooking = {
      ...booking,
      ...formData,
      phone,
      countryCode,
    };

    updateMutation.mutate(updatedBooking);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container className="mt-14 ps-0 md:ps-4">
      <div className="relative h-72 w-[90vw] max-w-full mx-auto mb-0 md:mb-16 hidden md:block">
        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={booking?.serviceImage || "/default-image.jpg"}
            alt="service"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-4xl font-bold flex justify-center items-center ml-8 drop-shadow-md">
            Update Booking : {booking?.serviceName}
          </h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-6 py-9 md:p-12 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date
              </label>
              <input
                value={formData.date}
                type="date"
                name="date"
                required
                onChange={handleInputChange}
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Email
              </label>
              <input
                type="text"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Due Amount
              </label>
              <input
                readOnly
                value={formData.price}
                type="text"
                name="price"
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Phone
              </label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  required: true,
                  className:
                    "border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full ps-12 py-2 outline-none",
                }}
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                name="address"
                onChange={handleInputChange}
                required
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>
          </div>

          <div className="form-control mt-8">
            <input
              className="bg-[#FF3811] text-white font-semibold py-3 rounded-md w-full cursor-pointer outline-none"
              type="submit"
              value="Confirm Order"
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default BookingUpdatePage;
