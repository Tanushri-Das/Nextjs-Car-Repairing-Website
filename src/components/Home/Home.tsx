import React from "react";
import Banner from "./Banner";
import About from "./About";
import Services from "./Services";
import Details from "./Details";
import Team from "./Team/Team";
import Choose from "./Choose";
import Testimonials from "./Testimonial/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Details />
      <Team />
      <Choose />
      <Testimonials />
    </>
  );
};

export default Home;
