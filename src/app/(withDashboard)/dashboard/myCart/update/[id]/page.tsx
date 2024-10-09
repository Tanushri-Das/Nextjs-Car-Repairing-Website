"use client";

import Container from "@/components/Container";
import useCartById from "@/hooks/useCartById";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingPage from "@/app/loading";
import { useRouter } from "next/navigation";
import { Booking, FormData } from "@/types";
import { Button } from "@/components/ui/button";

interface BookingUpdatePageProps {
  params: {
    id: string;
  };
}

const BookingUpdatePage: React.FC<BookingUpdatePageProps> = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const { data, isLoading } = useCartById(id);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    date: "",
    email: "",
    price: "",
    address: "",
    phone: "",
    countryCode: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  const booking = data?.response as Booking;

  useEffect(() => {
    if (booking) {
      setFormData({
        name: session?.user?.name || "",
        date: booking.date || "",
        email: session?.user?.email || "",
        price: booking.price || "",
        address: booking.address || "",
        phone: booking.phone || "",
        countryCode: booking.countryCode || "",
      });
      setPhoneNumber(`${booking.countryCode}${booking.phone}`);
    }
  }, [booking, session]);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedBooking: Booking) => {
      return await axios.patch<Booking>(
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
        text: "Update booking information successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/dashboard/myCart");
      });
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const phone = phoneNumber.slice(-10);

    const updatedBooking: Booking = {
      ...booking,
      ...formData,
      phone,
      countryCode,
      price:
        typeof formData.price === "string"
          ? parseFloat(formData.price)
          : formData.price, // Ensure price is a number
    };

    updateMutation.mutate(updatedBooking);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Container className="mt-8 ps-0 md:ps-4">
      <h1 className="text-4xl text-center font-bold">Edit Booking</h1>
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-6 py-9 md:p-12 rounded-lg shadow-md mt-6">
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
                Address
              </label>
              <input
                value={formData.address}
                type="text"
                name="address"
                onChange={handleInputChange}
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  className:
                    "border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full ps-12 py-2 outline-none",
                }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-8">
            <Button
              type="submit"
              className="rounded-md text-white text-lg font-medium bg-[#FF3811] dark:bg-[#FF3811]"
            >
              Update Booking
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default BookingUpdatePage;
