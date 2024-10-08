"use client";
import Container from "@/components/Container";
import { Contact } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import img from "../../assets/images/banner/4.jpg";
import Image from "next/image";
import useDynamicTitle from "@/hooks/useDynamicTitle";

const Contacts = () => {
  useDynamicTitle();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  // Mutation for form submission
  const contactMutation = useMutation({
    mutationFn: (newContact: Contact) => {
      return axios.post("/api/contacts", newContact);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "There was an issue sending your message.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    },
  });

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

    const newContact: Contact = {
      email: email || session?.user?.email || "",
      name: name || session?.user?.name || "",
      address: form.address.value,
      countryCode: countryCode,
      phone: phone,
      message: form.message.value,
    };

    contactMutation.mutate(newContact);

    // Reset the form fields and phone number state
    form.reset();
    setPhoneNumber(""); // Reset phone input state
    setName(""); // Reset name field
    setEmail(""); // Reset email field
    router.push("/");
  };

  return (
    <Container className="mt-14">
      <div className="h-80 w-[90vw] max-w-full mx-auto mb-10">
        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={img}
            alt="service"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      <h1 className="text-4xl text-center font-bold mb-4">Contact Us</h1>
      <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-full md:w-2/4 mx-auto">
        Have questions about your vehicle's maintenance or repair needs? Reach
        out to our team of expert mechanics for fast and reliable service. We
        are here to help you keep your car running smoothly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 mt-10 max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 py-9 md:p-12 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Name
            </label>
            <input
              type="text"
              value={name || session?.user?.name || ""}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
            />
          </div>
          <div className="form-control">
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email || session?.user?.email || ""}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="email"
              className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </div>
        <div>
          <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Message *
          </label>
          <textarea
            required
            name="message"
            placeholder="Your Message"
            className="border border-gray-300 dark:border-gray-800 dark:bg-gray-100 dark:text-gray-600 rounded-md w-full px-4 py-2 outline-none h-24"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="rounded-md text-white text-lg font-medium bg-[#FF3811] dark:bg-[#FF3811]"
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Contacts;
