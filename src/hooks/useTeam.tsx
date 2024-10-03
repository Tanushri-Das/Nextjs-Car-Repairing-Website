import { Team } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useTeam = () => {
  return useQuery<Team[]>({
    queryKey: ["team"],
    queryFn: () => fetch(`/api/team`).then((res) => res.json()),
  });
};

export default useTeam;
