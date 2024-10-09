"use client";
import useServices from "@/hooks/useServices";
import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { usePathname } from "next/navigation";

const ServiceTitlesList = () => {
  const { data: services } = useServices();
  const pathname = usePathname();

  return (
    <div className="p-8 bg-gray-100 rounded-lg w-full xl:w-3/4 xl:ml-auto xl:mr-0">
      <h2 className="text-2xl text-[#151515] dark:text-[#151515] font-bold mb-4">
        Services
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {services?.map((service) => {
          // Check if the current pathname matches the service details page
          const isActive = pathname === `/services/${service._id}`;

          return (
            <Link
              key={service._id}
              href={`/services/${service._id}`}
              className={`flex items-center justify-between rounded-md px-6 py-2 w-full ${
                isActive ? "bg-[#FF3811] text-white" : "bg-white text-black"
              } transition-colors`}
            >
              <h2 className="text-[16px] font-semibold">{service.title}</h2>
              <FaArrowRight
                className={`w-6 h-6 ${
                  isActive ? "text-white" : "text-[#FF3811]"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceTitlesList;
