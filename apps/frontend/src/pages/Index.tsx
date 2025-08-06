import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PopularTours from "@/components/PopularTours";
import FeaturedHotels from "@/components/FeaturedHotels";
import TravelTips from "@/components/TravelTips";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <PopularTours />
      <FeaturedHotels />
      <TravelTips />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
