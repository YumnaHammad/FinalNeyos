import React from 'react';
import Contact from '../../components/Contact';
import SolutionsSection from '../../components/sliders/SolutionsSection';
import TimelineSlider from '../../components/ui/TimelineSlider';
import Sensing_Matter from '../../components/features/Sensing_Matter';
import Products from '../../components/Products';
import HeroCarousel from './HeroCarousel';
import TrustedBy from '../../components/features/SpaceOccupancy/TrustedBy';
import AnimatedCards from '../../components/ui/AnimatedCards';
import PartnersSection from '../../components/Partner/PartnersSection';
import './landing.css';

const Home = () => {
  return (
    <div className="landing-page w-full">
      <HeroCarousel />
      <Products />
      <Sensing_Matter />
      <TimelineSlider />
      <SolutionsSection />
      <PartnersSection />
      <AnimatedCards />
      <TrustedBy />
      <div className="landing-contact-wrap">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
