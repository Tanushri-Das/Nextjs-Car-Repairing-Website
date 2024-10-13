import { getTeam } from "@/services/getTeam";
import TeamCarousel from "./TeamCarousel";
import Container from "@/components/Container";

const Team = async () => {
  const team = await getTeam();
  return (
    <Container>
      <div className="relative">
        <h3 className="font-bold text-[20px] text-center mb-1">Team</h3>
        <h5 className="text-[#151515] dark:text-gray-300 text-[45px] font-bold mb-3 text-center">
          Meet Our Team
        </h5>
        <p className="text-[#737373] dark:text-gray-300 text-[16px] font-medium w-full max-w-[717px] mx-auto text-center">
          Our skilled and dedicated team works tirelessly to provide top-notch
          car repair and maintenance services.
        </p>
        <div className="mx-0 md:mx-16 lg:mx-12 2xl:mx-0 mt-10">
          <TeamCarousel team={team} />
        </div>
      </div>
    </Container>
  );
};

export default Team;
