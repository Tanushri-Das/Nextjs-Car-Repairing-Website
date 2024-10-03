// "use client";
// import LoadingPage from "@/app/loading";
// import useServiceById from "@/hooks/useServiceById";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// const CheckoutPage = ({ params }: { params: { id: string } }) => {
//   const { id } = params;
//   const { data: session } = useSession();

//   // Fetch service data using the ID
//   const { data, isLoading } = useServiceById(id);

//   // If the data is still loading, display the loading page
//   if (isLoading) {
//     return <LoadingPage />;
//   }

//   // Access the service data from the response object
//   const service = data?.response;

//   // If service data is not available, return early or render a fallback
//   if (!service) {
//     return <div>Service not found.</div>;
//   }

//   // Destructure the service object
//   const { title, img, price, _id } = service;

//   return (
//     <div className="my-20 container mx-auto">
//       <div className="relative h-72 w-[90vw] max-w-full mx-auto mb-16">
//         <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
//           <Image
//             src={img}
//             alt="service"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg"
//           />
//         </div>
//         <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
//           <h1 className="text-white text-4xl font-bold flex justify-center items-center ml-8 drop-shadow-md">
//             Check Out {title}
//           </h1>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-12 rounded-lg shadow-md">
//         <form>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 defaultValue={session?.user?.name || ""}
//                 name="name"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Date
//               </label>
//               <input
//                 defaultValue={new Date().toISOString().split("T")[0]}
//                 type="date"
//                 name="date"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 defaultValue={session?.user?.email || ""}
//                 name="email"
//                 placeholder="email"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Due Amount
//               </label>
//               <input
//                 readOnly
//                 defaultValue={price}
//                 type="text"
//                 name="price"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Phone
//               </label>
//               <input
//                 required
//                 type="text"
//                 name="phone"
//                 placeholder="Your Phone"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Present Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Your Address"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>
//           </div>

//           <div className="form-control mt-8">
//             <input
//               className="bg-[#FF3811] text-white font-semibold py-3 rounded-md w-full cursor-pointer outline-none"
//               type="submit"
//               value="Confirm Order"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

// "use client";
// import LoadingPage from "@/app/loading";
// import useServiceById from "@/hooks/useServiceById";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const CheckoutPage = ({ params }: { params: { id: string } }) => {
//   const { id } = params;
//   const { data: session } = useSession();
//   const [phoneNumber, setPhoneNumber] = useState<string>("");
//   const [valid, setValid] = useState<boolean>(true);

//   // Fetch service data using the ID
//   const { data, isLoading } = useServiceById(id);

//   // If the data is still loading, display the loading page
//   if (isLoading) {
//     return <LoadingPage />;
//   }

//   // Access the service data from the response object
//   const service = data?.response;

//   // If service data is not available, return early or render a fallback
//   if (!service) {
//     return <div>Service not found.</div>;
//   }

//   // Destructure the service object
//   const { title, img, price, _id } = service;

//   const handleChange = (value: string) => {
//     setPhoneNumber(value);
//     setValid(validatePhoneNumber(value));
//   };

//   const validatePhoneNumber = (phoneNumber: string) => {
//     const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
//     return phoneNumberPattern.test(phoneNumber);
//   };

//   return (
//     <div className="my-20 container mx-auto">
//       <div className="relative h-72 w-[90vw] max-w-full mx-auto mb-16">
//         <div className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
//           <Image
//             src={img}
//             alt="service"
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg"
//           />
//         </div>
//         <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] ">
//           <h1 className="text-white text-4xl font-bold flex justify-center items-center ml-8 drop-shadow-md">
//             Check Out {title}
//           </h1>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto p-12 rounded-lg shadow-md">
//         <form>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 defaultValue={session?.user?.name || ""}
//                 name="name"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Date
//               </label>
//               <input
//                 defaultValue={new Date().toISOString().split("T")[0]}
//                 type="date"
//                 name="date"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Email
//               </label>
//               <input
//                 type="text"
//                 defaultValue={session?.user?.email || ""}
//                 name="email"
//                 placeholder="email"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Due Amount
//               </label>
//               <input
//                 readOnly
//                 defaultValue={price}
//                 type="text"
//                 name="price"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Phone
//               </label>
//               <PhoneInput
//                 country={"in"}
//                 value={phoneNumber}
//                 onChange={handleChange}
//                 inputProps={{
//                   required: true,
//                   className:
//                     "border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full ps-12 py-2 outline-none",
//                 }}
//               />
//             </div>

//             <div className="form-control">
//               <label className="text-lg font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                 Present Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Your Address"
//                 className="border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-md w-full px-4 py-2 outline-none"
//               />
//             </div>
//           </div>

//           <div className="form-control mt-8">
//             <input
//               className="bg-[#FF3811] text-white font-semibold py-3 rounded-md w-full cursor-pointer outline-none"
//               type="submit"
//               value="Confirm Order"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

"use client";
import LoadingPage from "@/app/loading";
import useServiceById from "@/hooks/useServiceById";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CheckoutPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);

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

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const address = formData.get("address");

    // Use the already validated phoneNumber and manually extract the country code
    let countryCode = "";
    let phone = "";

    // Assuming the country code is always at the start and is between 2 and 4 digits
    if (phoneNumber.startsWith("+")) {
      countryCode = phoneNumber.slice(0, phoneNumber.length - 10); // Extract country code
      phone = phoneNumber.slice(-10); // Extract the remaining part as phone number
    } else {
      // Handle case without '+' sign
      countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      phone = phoneNumber.slice(-10);
    }

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Price:", price);
    console.log("Country Code:", countryCode);
    console.log("Phone:", phone);
    console.log("Address:", address);
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
                Present Address
              </label>
              <input
                type="text"
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
