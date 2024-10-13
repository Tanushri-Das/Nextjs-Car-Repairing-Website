import { Service } from "@/types";

export const getServices = async () => {
  const res = await fetch(
    "https://car-repairing-website.vercel.app/api/services",
    {
      next: {
        revalidate: 30, // Revalidate data every 30 seconds
      },
    }
  );
  return res.json(); // Return the fetched data as JSON
};

// export const generateStaticParams = async () => {
//   const res = await fetch(
//     "https://car-repairing-website.vercel.app/api/services"
//   );
//   const services = await res.json();

//   // Fetch three static servicesD
//   return services.slice(0, 3).map((service: Service) => ({
//     id: service._id, // Return the ID for each service
//   }));
// };
export const generateStaticParams = async () => {
  const res = await fetch(
    "https://car-repairing-website.vercel.app/api/services"
  );
  const services = await res.json();

  // Log all services fetched
  console.log("Total services fetched:", services.length);

  // Fetch three static services
  const staticServices = services.slice(0, 3);

  // Log the static services that will be generated
  console.log("Static services:", staticServices);

  // Return static service IDs
  return staticServices.map((service: Service) => ({
    id: service._id, // Return the ID for each service
  }));
};

export const getServiceById = async (id: string) => {
  const res = await fetch(
    `https://car-repairing-website.vercel.app/api/services/${id}`, // Template literal to fetch by ID
    {
      cache: "no-store", // No caching, always fetch fresh data
    }
  );
  return res.json(); // Return the fetched service data
};
