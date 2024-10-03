import { ServiceResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useServiceById = (id: string) => {
  return useQuery<ServiceResponse>({
    queryKey: ["service", id],
    queryFn: () =>
      fetch(`/api/services/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error("Service not found");
        }
        return res.json();
      }),
    enabled: !!id, // Fetch only when 'id' is present
  });
};

export default useServiceById;
