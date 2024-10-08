// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// const useDynamicTitle = () => {
//   const pathname = usePathname();

//   useEffect(() => {
//     let title = "CarCare";
//     if (pathname === "/contacts") {
//       title += " | Contact Us";
//     } else if (pathname === "/dashboard/myCart") {
//       title += " | My Cart";
//     }
//     else if (pathname === "/dashboard/add-review") {
//       title += " | Add Review";
//     } else if (pathname === "/services/checkout") {
//       title += " | Checkout";
//     }
//     document.title = title;
//   }, [pathname]);
// };

// export default useDynamicTitle;

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useDynamicTitle = () => {
  const pathname = usePathname();

  useEffect(() => {
    let title = "CarCare";
    if (pathname === "/contacts") {
      title += " | Contact Us";
    } else if (pathname === "/login") {
      title += " | Login";
    } else if (pathname === "/register") {
      title += " | Sign Up";
    } else if (pathname === "/dashboard/myCart") {
      title += " | My Cart";
    } else if (pathname === "/dashboard/add-review") {
      title += " | Add Review";
    } else if (pathname.startsWith("/checkout/")) {
      title += " | Checkout";
    } else if (pathname.startsWith("/services/")) {
      // Assuming /services/[id] is the dynamic route for service details
      title += " | Service Details";
    }
    document.title = title;
  }, [pathname]);
};

export default useDynamicTitle;
