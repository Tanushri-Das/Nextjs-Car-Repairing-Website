// import Image from "next/image";
// import Container from "@/components/Container";
// import Breadcrumb from "@/components/Breadcrumb";
// import { getServiceById } from "@/services/getService";
// import { Service } from "@/types";
// import CheckoutForm from "../page";

// const CheckoutPage = async ({ params }: { params: { id: string } }) => {
//   const { id } = params;

//   // Fetch service data using the ID
//   const service: { response: Service } | null = await getServiceById(id);

//   // If service data is not available, return early or render a fallback
//   if (!service) {
//     return <div>Service not found.</div>; // Optionally render a loading or error state here
//   }

//   // Destructure the service object
//   const { title, img, price, _id } = service.response;

//   return (
//     <Container className="mt-14">
//       <div className="relative h-72 mb-10">
//         <div className="w-full h-full relative overflow-hidden">
//           <Image src={img} alt="service" layout="fill" objectFit="cover" />
//         </div>
//         <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-black/50">
//           <h1 className="text-white text-4xl font-bold">Check Out {title}</h1>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 flex justify-center">
//           <Breadcrumb page={"Checkout"} />
//         </div>
//       </div>
//       <CheckoutForm
//         serviceId={_id}
//         serviceTitle={title}
//         servicePrice={price}
//         serviceImg={img}
//       />
//     </Container>
//   );
// };

// export default CheckoutPage;

import Image from "next/image";
import Container from "@/components/Container";
import Breadcrumb from "@/components/Breadcrumb";
import { getServiceById } from "@/services/getService";
import { Service } from "@/types";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch service data using the ID
  const service: { response: Service } | null = await getServiceById(id);

  // If service data is not available, return early or render a fallback
  if (!service) {
    return <div>Service not found.</div>; // Optionally render a loading or error state here
  }

  // Destructure the service object
  const { title, img, price, _id } = service.response;

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
      <CheckoutForm
        serviceId={_id}
        serviceTitle={title}
        servicePrice={price}
        serviceImg={img}
      />
    </Container>
  );
};

export default CheckoutPage;
