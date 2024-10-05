import { BookingResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useCartById = (id: string) => {
  return useQuery<BookingResponse>({
    queryKey: ["update", id],
    queryFn: () =>
      fetch(`/myCart/api/booking/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error("Booking not found");
        }
        return res.json();
      }),
    enabled: !!id,
  });
};

export default useCartById;
