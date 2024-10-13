import React from "react";
import Container from "../Container";
import ServiceCard from "../cards/ServiceCard";
import { getServices } from "@/services/getService";
import { Service } from "@/types";

const Services = async () => {
  const services = await getServices();
  return (
    <Container id="services">
      <h3 className="font-bold text-[20px] text-center mb-1">Services</h3>
      <h5 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 text-center">
        Our Service Area
      </h5>
      <p className="text-[#737373] dark:text-gray-300 text-[16px] font-medium mb-10 w-full max-w-[717px] mx-auto text-center">
        Expert car repair services, including engine diagnostics, brake
        replacements, and oil changes, ensuring smooth performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service: Service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </Container>
  );
};

export default Services;
