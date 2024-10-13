"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Service } from "@/types";

const ServiceTitlesList = ({ services }: { services: Service[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {services.map((service) => {
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
  );
};

export default ServiceTitlesList;
