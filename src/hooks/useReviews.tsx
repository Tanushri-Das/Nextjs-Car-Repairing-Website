import { Review } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useReviews = () => {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: () => fetch(`/api/reviews`).then((res) => res.json()),
  });
};

export default useReviews;
