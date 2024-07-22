import NavBar from "../Components/LandingPageComponents/NavBar";
import HeroSection from "../Components/LandingPageComponents/Herosection";
import FeatureSection from "../Components/LandingPageComponents/FeatureSection";
import FeaturesListSection from "../Components/LandingPageComponents/FeaturesListSection";
import TestimonialSection from '../Components/LandingPageComponents/TestimonialSection';
import Benefits from '../Components/LandingPageComponents/Benefits';
import FaqSection from "../Components/LandingPageComponents/FaqSection";
import NewsletterTemplate from "../Components/LandingPageComponents/Newsletter";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <HeroSection/>
      <FeatureSection/>
      <FeaturesListSection/>
      <TestimonialSection/>
      <Benefits/>
      <FaqSection/>
      <NewsletterTemplate/>
    </div>
  );
};

export default LandingPage;
