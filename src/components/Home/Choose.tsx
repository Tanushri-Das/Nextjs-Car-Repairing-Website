import Image from "next/image";
import img1 from "../../assets/images/choose_us/team.png";
import img3 from "../../assets/images/choose_us/support.png";
import img4 from "../../assets/images/choose_us/equipment.png";
import img5 from "../../assets/images/choose_us/guranty.png";
import img6 from "../../assets/images/choose_us/delivery.png";
import Container from "../Container";

const Choose = () => {
  return (
    <Container>
      <h3 className="font-bold text-primary text-[20px] text-center mb-1">
        Core Features
      </h3>
      <h5 className="text-[#151515] text-[45px] font-bold mb-3 text-center">
        Why Choose Us
      </h5>
      <p className="text-[#737373] text-[16px] font-normal mb-10 w-full max-w-[717px] mx-auto text-center capitalize">
        The majority have suffered alteration in some form, by injected humour,
        or randomised words which don&apos;t look even slightly believable.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 dark:bg-transparent">
        {[img1, img3, img4, img5, img6].map((img, index) => (
          <div
            key={index}
            className="border border-[#E8E8E8] p-4 rounded-lg text-center flex flex-col justify-center items-center"
          >
            <Image
              src={img}
              alt="Core Feature Image"
              width={75.63}
              height={75.63}
              className="object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold text-center my-2">
              {
                [
                  "Expert Team",
                  "24/7 Support",
                  "Best Equipment",
                  "100% Guarantee",
                  "Timely Delivery",
                ][index]
              }
            </h3>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Choose;
