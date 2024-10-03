import { Service } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useServices = () => {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: () => fetch(`/api/services`).then((res) => res.json()),
  });
};

export default useServices;
