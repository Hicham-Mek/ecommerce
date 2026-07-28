import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CategoriesSection from "../components/home/CategoriesSection";
import Benefits from "../components/home/Benefits";
import Newsletter from "../components/home/Newsletter";
import Banner from "../components/home/Banner";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <Benefits />
      <Banner />
      <Newsletter />
    </>
  );
};

export default Home;
