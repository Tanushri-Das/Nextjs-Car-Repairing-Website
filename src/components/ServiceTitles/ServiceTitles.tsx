import { getServices } from "@/services/getService";
import ServiceTitlesList from "./ServiceTitlesList";
import { Service } from "@/types";

const ServiceTitles = async () => {
  const services: Service[] = await getServices(); // Make sure this returns an array

  return (
    <div className="p-8 bg-gray-100 rounded-lg w-full xl:w-3/4 xl:ml-auto xl:mr-0">
      <h2 className="text-2xl text-[#151515] dark:text-[#151515] font-bold mb-4">
        Services
      </h2>
      <ServiceTitlesList services={services} />
    </div>
  );
};

export default ServiceTitles;
