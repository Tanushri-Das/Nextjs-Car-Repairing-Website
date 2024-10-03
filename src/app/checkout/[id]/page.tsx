"use client";
import LoadingPage from "@/app/loading";
import useServiceById from "@/hooks/useServiceById";
import { NewBooking } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch service data using the ID
  const { data, isLoading } = useServiceById(id);

  // If the data is still loading, display the loading page
  if (isLoading) {
    return <LoadingPage />;
  }

  // Access the service data from the response object
  const service = data?.response;

  // If service data is not available, return early or render a fallback
  if (!service) {
    return <div>Service not found.</div>;
  }

  // Destructure the service object
  const { title, img, price, _id } = service;

  // Mutation hook should always be called, no conditional logic
  const bookingMutation = useMutation({
    mutationFn: (newBooking: NewBooking) => {
      return axios.post("/checkout/api/new-booking", newBooking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email],
      });
      router.push("/myCart");
      Swal.fire({
        title: "Success!",
        text: "New booking added successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cast e.target to HTMLFormElement
    const form = e.target as HTMLFormElement;

    // Extract phone number and country code as before
    let countryCode = "";
    let phone = "";

    if (phoneNumber.startsWith("+")) {
      countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      phone = phoneNumber.slice(-10);
    } else {
      countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      phone = phoneNumber.slice(-10);
    }

    const newBooking: NewBooking = {
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      address: form.address.value,
      countryCode: countryCode,
      phone: phone,
      date: form.date.value,
      serviceName: title,
      serviceImage: img,
      serviceID: _id,
      price: Number(price),
    };
    // Trigger mutation
    bookingMutation.mutate(newBooking);
    form.reset(); // Now we can safely call reset
  };

  return (
    <div className="my-20 container mx-auto">
      <div className="relative h-72 w-[90vw] max-w-full mx-auto mb-16">
        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={img}
            alt="service"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
          <h1 className="text-white text-4xl font-bold flex justify-center items-center ml-8 drop-shadow-md">
            Check Out {title}
          </h1>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-12 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue={session?.user?.name || ""}
                name="name"
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Date
              </label>
              <input
                defaultValue={new Date().toISOString().split("T")[0]}
                type="date"
                name="date"
                required
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Email
              </label>
              <input
                type="text"
                defaultValue={session?.user?.email || ""}
                name="email"
                placeholder="email"
                className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
              />
            </div>

            <div className="form-control">
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Due Amount
              </label>
              <input
                readOnly
                defaultValue={price}
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
                required
                name="address"
                placeholder="Your Address"
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
    </div>
  );
};

export default CheckoutPage;
