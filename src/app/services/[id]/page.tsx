import Image from "next/image";
import Container from "@/components/Container";
import Breadcrumb from "@/components/Breadcrumb";
import { getServiceById } from "@/services/getService";
import { Service } from "@/types";
import ServiceTitles from "@/components/ServiceTitles/ServiceTitles";
import Checkout from "@/components/Checkout";

const ServiceDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch service data using the ID
  const service: { response: Service } | null = await getServiceById(id);

  // If service data is not available, return early or render a fallback
  if (!service) {
    return <div>Service not found.</div>; // Optionally render a loading or error state here
  }

  // Destructure the service object
  const { title, description, img, price, facility, _id } = service.response;

  return (
    <Container className="mt-14">
      {/* Header Section with Title and Breadcrumb */}
      <div className="relative h-72 mb-10">
        <div className="w-full h-full relative overflow-hidden">
          <Image src={img} layout="fill" objectFit="cover" alt="Service Card" />
        </div>
        <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-black/50">
          <h1 className="text-white text-4xl font-bold">Service Details</h1>
        </div>
        {/* Breadcrumb */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <Breadcrumb page={"Service Details"} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Left Side: Image, Title, Description */}
        <div>
          <div className="mb-5">
            <Image
              src={img}
              layout="responsive"
              objectFit="cover"
              alt="Service Card"
              width={500}
              height={300}
            />
          </div>
          <h2 className="text-3xl font-bold text-orange-600 mb-5">{title}</h2>
          <p className="text-[#737373] dark:text-gray-300 text-[16px]">
            {description}
          </p>
        </div>

        {/* Right Side: Service Titles List */}
        <div>
          <ServiceTitles />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Left Side: Facility Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-6">
          {facility.map((item, index) => (
            <div
              className="bg-[#F3F3F3] p-4 border-t-4 border-t-rose-500 rounded-lg"
              key={index}
            >
              <h2 className="text-xl font-bold dark:text-[#151515] mb-2">
                {item.name}
              </h2>
              <p className="text-[16px] dark:text-[#151515]">{item.details}</p>
            </div>
          ))}
        </div>
        {/* Right Side: Checkout Section */}
        <Checkout serviceId={_id} serviceImg={img} servicePrice={price} />
      </div>
    </Container>
  );
};

export default ServiceDetailsPage;
