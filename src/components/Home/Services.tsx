"use client";
import useServices from "@/hooks/useServices";
import React from "react";
import Container from "../Container";
import ServiceCard from "../cards/ServiceCard";

const Services = () => {
  const { data: services } = useServices();
  return (
    <Container id="services">
      <h3 className="font-bold text-[20px] text-center mb-1">
        Services
      </h3>
      <h5 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 text-center">
        Our Service Area
      </h5>
      <p className="text-[#737373] dark:text-gray-300 text-[16px] font-medium mb-10 w-full max-w-[717px] mx-auto text-center capitalize">
        Expert car repair services, including engine diagnostics, brake
        replacements, and oil changes, ensuring smooth performance.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </Container>
  );
};

export default Services;
