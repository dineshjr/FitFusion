import NavBar from "../LandingPageComponents/NavBar";
import HeroSection from "../LandingPageComponents/Herosection";
import FeatureSection from "../LandingPageComponents/FeatureSection";
import FeaturesListSection from "../LandingPageComponents/FeaturesListSection";
import TestimonialSection from '../LandingPageComponents/TestimonialSection';
import Benefits from '../LandingPageComponents/Benefits';
import FaqSection from "../LandingPageComponents/FaqSection";
import NewsletterTemplate from "../LandingPageComponents/Newsletter";

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
