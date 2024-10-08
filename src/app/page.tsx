import Home from "@/components/Home/Home";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarCare | Home",
  description: "Car Repairing Website",
};

const Homepage = () => {
  return (
    <div className="text-black dark:text-white min-h-screen">
      <Home />
    </div>
  );
};

export default Homepage;
