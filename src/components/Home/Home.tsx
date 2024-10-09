import Banner from "./Banner";
import About from "./About";
import Services from "./Services";
import Details from "./Details";
import Team from "./Team/Team";
import Choose from "./Choose";
import Testimonials from "./Testimonial/Testimonials";
import Faq from "./Faq";

const Home = () => {
  return (
    <>
      <Banner />
      <About />
      <Services />
      <Details />
      <Team />
      <Faq />
      <Choose />
      <Testimonials />
    </>
  );
};

export default Home;
