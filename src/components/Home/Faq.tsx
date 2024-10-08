import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Container from "../Container";

const Faq = () => {
  return (
    <>
      <Container>
        <h1 className="text-4xl font-bold text-center mb-6">FAQ</h1>
        <p className="text-[#737373] dark:text-gray-300 text-[16px] font-medium text-center dark:font-semibold w-full md:w-2/4 mx-auto">
          Here are some common questions and answers about our vehicle services.
        </p>
        <div className="w-10/12 mx-auto mt-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl hover:no-underline">
                What types of vehicles do you service?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                We provide maintenance and repair services for all types of
                vehicles, including cars, trucks, and SUVs, regardless of the
                make or model. Our certified technicians are experienced in
                handling both domestic and foreign vehicles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl hover:no-underline">
                How often should I bring my car in for maintenance?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Regular maintenance is recommended every 6,000 to 8,000 miles or
                every six months, whichever comes first. However, it’s best to
                follow your vehicle’s manufacturer recommendations for specific
                services such as oil changes, brake inspections, and tire
                rotations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl hover:no-underline">
                Do you offer a warranty on repairs?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Yes, we offer a warranty on all repairs for up to 12 months or
                12,000 miles, whichever comes first. This ensures that you
                receive reliable and long-lasting service for any work we
                perform on your vehicle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-xl hover:no-underline">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                We accept returns within 30 days of purchase as long as the
                books are in their original condition. Please contact customer
                service for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-xl hover:no-underline">
                Do you offer any membership discounts?
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                Yes, we offer a membership program where you can earn points on
                purchases and get discounts on future orders.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default Faq;
