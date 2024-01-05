import Banner from "../../components/Banner/Banner";
import Destination from "../../components/Destination/Destination";
import Footer from "../../components/Footer/Footer";
import Hero_Section from "../../components/Hero_Section/Hero_Section";
import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Hotel_Slider from "../../components/Slider/Hotel_Slider";

const Homepage = () => {
  return (
    <div>
      <Navigation />
      <Hero_Section />
      <Hotel_Slider />
      <Banner />
      <Destination />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Homepage;
