import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Service } from "@/types";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const ServiceCard = ({ service }: { service: Service }) => {
  const { title, img, price, _id } = service;
  return (
    <>
      <Card className="dark:border-gray-500">
        <CardHeader className="p-0">
          <div className="w-full h-[210px] rounded-t-lg overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={img}
                layout="fill"
                objectFit="cover"
                alt="Book Image"
                className="rounded-t-lg"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl text-center font-semibold">
            {title}
          </CardTitle>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full">
            <h5 className="text-[20px] text-primary font-semibold">
              Price: ${price}
            </h5>
            <Link href={`/services/${_id}`}>
              <FaArrowRight className="text-primary w-6 h-6" />
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ServiceCard;
