import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useCart = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["myCart", session?.user?.email],
    queryFn: () =>
      fetch(`/dashboard/myCart/api/${session?.user?.email}`).then((res) =>
        res.json()
      ),
    enabled: !!session?.user?.email,

    refetchInterval: 20000,
  });
};

export default useCart;
