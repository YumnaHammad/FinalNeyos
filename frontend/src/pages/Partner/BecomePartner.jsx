import React, { useState, useEffect } from "react";

import Contact from "../../components/Contact";
import HeroSection from "../../components/Partner/BecomePartner/HeroSection";
import PartnerSection from "../../components/Partner/BecomePartner/PartnerSection";
import Partnership from "../../components/Partner/BecomePartner/Partnership";
import Application from "../../components/Partner/BecomePartner/Application";
import CallToAction from "../../components/Partner/BecomePartner/CallToAction";
import WhyChooseUs from "../../components/WhyChooseUs";
import BannerSection from "../../components/BannerSection";

const BecomePartner = () => {
  const [, setIsVisible] = useState(false);
  const [PartnerData, setPartnerData] = useState(null);
  const [BannerData, setBannerData] = useState(null);
  // const subHeadings = PartnerData
  //   ? [
  //       PartnerData.sub_heading1,
  //       PartnerData.sub_heading2,
  //       PartnerData.sub_heading3,
  //     ].filter(Boolean)
  //   : [];
  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/become-partner/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetchPartnerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/become-partner/section-3"
      );
      const data = await response.json();
      setPartnerData(data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    fetchPartnerData();
    fetchBannerData();
  }, []);
  // CSS animations
  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0; 
        transform: translateX(-50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0; 
        transform: translateX(50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInDown {
      from { 
        opacity: 0; 
        transform: translateY(-30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
      40%, 43% { transform: translate3d(0,-30px,0); }
      70% { transform: translate3d(0,-15px,0); }
      90% { transform: translate3d(0,-4px,0); }
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
  `;

  return (
    <>
      <style>{animations}</style>
      {/* Hero Section */}
      {BannerData && (
        <BannerSection
          gradient="linear-gradient(
    135deg,
    rgba(102, 126, 234) 0%,
    rgba(118, 75, 162)100%
  )"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title={BannerData.heading}
          subtitle={BannerData.description}
          image={BannerData.image}
        />
      )}
      {/* Become a Partner Section */}
      <PartnerSection />
      {/* Why Partner with Nexyos Section */}
      {PartnerData && (
        <WhyChooseUs
          heading={PartnerData.heading || " Why Partner with Nexyos?"}
          subHeadings={[
            PartnerData.sub_heading1,
            PartnerData.sub_heading2,
            PartnerData.sub_heading3,
          ].filter(Boolean)}
          image={PartnerData.image || ""}
          badgeText="Interactive Preview"
        />
      )}
      {/* Partnership Types Section with Swiper */}
      <Partnership />
      {/* Application Process Section */}
      <Application />
      {/* Call to Action Section */}
      <CallToAction />
      {/* Contact */}
      <Contact />
    </>
  );
};

export default BecomePartner;
