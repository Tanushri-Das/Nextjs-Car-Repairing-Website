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
import Container from "@/components/Container";
import useDynamicTitle from "@/hooks/useDynamicTitle";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";

const CheckoutPage = ({ params }: { params: { id: string } }) => {
  useDynamicTitle();
  const { id } = params;
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch service data using the ID
  const { data, isLoading } = useServiceById(id);

  // Mutation hook should always be called, no conditional logic
  const bookingMutation = useMutation({
    mutationFn: (newBooking: NewBooking) => {
      return axios.post("/checkout/api/new-booking", newBooking);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myBookings", session?.user?.email],
      });
      router.push("/dashboard/myCart");
      Swal.fire({
        title: "Success!",
        text: "New booking added successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

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

  const { title, img, price, _id } = service;

  const handleChange = (value: string) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

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

    bookingMutation.mutate(newBooking);
    form.reset();
  };

  return (
    <Container className="mt-14">
      <div className="relative h-72 mb-10">
        <div className="w-full h-full relative overflow-hidden">
          <Image src={img} alt="service" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-black/50">
          <h1 className="text-white text-4xl font-bold">Check Out {title}</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <Breadcrumb page={"Checkout"} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-12 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="flex justify-center items-center mt-8">
            <Button
              type="submit"
              className="rounded-md text-white text-[16px] font-medium bg-[#FF3811] dark:bg-[#FF3811]"
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CheckoutPage;
