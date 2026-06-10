// DeveloperPartner.jsx
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Contact from "../../components/Contact";
import WhyChooseUs from "../../components/WhyChooseUs";
import PartnerProgram from "../../components/Partner/DeveloperPartner/PartnerProgram";
import SolutionsSlider from "../../components/sliders/SolutionsSlider";
import BenefitsGrid from "../../components/BenefitsGrid";
import HeroSection from "../../components/HeroSection";
import { color } from "framer-motion";
const DeveloperPartner = () => {
  // const [currentImage, setCurrentImage] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [developerPartnerData, setDeveloperPartnerData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [benefitData, setBenefitData] = useState([]);
  // const subHeadings = developerPartnerData
  //   ? [
  //       developerPartnerData.sub_heading1,
  //       developerPartnerData.sub_heading2,
  //       developerPartnerData.sub_heading3,
  //     ].filter(Boolean)
  //   : [];
  // const handleHeadingClick = (imageKey) => {
  //   setCurrentImage(imageKey);
  // };

  const fetchDeveloperPartnerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/developer-partner/section-3"
      );
      const data = await response.json();
      setDeveloperPartnerData(data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetchSolutionData = async () => {
    const res = await fetch(
      "https://nexyos.deeptech.pk/api/cctv-partner/section-4"
    );
    const data = await res.json();
    setCardData(Array.isArray(data) ? data : []);
  };
  const fetchBenefitSectionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/developer-partner/section-5"
      );
      const data = await response.json();
      setBenefitData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  // Animation effects
  useEffect(() => {
    setIsVisible(true);
    fetchDeveloperPartnerData();
    fetchSolutionData();
    fetchBenefitSectionData();
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
      <HeroSection
        title="Developer Partner Program"
        subtitle=" Build innovative solutions with our cutting-edge IoT and video
                surveillance technologies. Access comprehensive APIs, SDKs, and
                developer resources."
        terminalTitle="Developer Terminal"
        Terminalcode={{
         textColor: "#00d4ff",
         code:`// Nexyos Developer Partner Program
const developerPartner = {
  name: "Your Company",
  expertise: ["IoT", "AI", "Video Analytics"],
  benefits: ["API Access", "SDK Support", "Technical Guidance"]
};

// Join our ecosystem
developerPartner.join();`,
        }}
        badge={{
          text: "Live",
          bgColor: "#00d4ff",
          textColor: "#000",
        }}
        secondaryButton={{
          label: "View on GitHub",
          icon: "ph ph-github",
          textColor: "#00d4ff",
          borderColor: "2px solid #00d4ff",
          backgroundColor: "transparent",
          onClick: () => {},
        }}
        primaryButton={{
          label: "Get Started",
          icon: "ph ph-rocket",
          bgColor: "#00d4ff",
          textColor: "#000",
          borderColor: "#00d4ff",
          onClick: () => {},
        }}
      />
      {/* Developer Partner Program Section */}
      <PartnerProgram />
      {/* Why Become a Developer Partner Section */}
      {developerPartnerData && (
        <WhyChooseUs
          heading={developerPartnerData.heading || ""}
          subHeadings={[
            developerPartnerData.sub_heading1,
            developerPartnerData.sub_heading2,
            developerPartnerData.sub_heading3,
          ].filter(Boolean)}
          image={developerPartnerData.image || ""}
          badgeText="Live Preview"
        />
      )}
      {/* Developer Tools Section with Swiper */}
      <SolutionsSlider
        title="Developer Tools & Resources"
        icon="ph ph-toolbox"
        subtitle="Nexyos provides comprehensive development resources including APIs,SDKs, documentation, and testing tools to help developer partners
            build innovative solutions quickly and efficiently. Our developer
            ecosystem supports multiple programming languages and platforms."
        data={cardData}
      />
      {/* Benefits Section */}
      <BenefitsGrid
        title="Developer Partner Benefits"
        subtitle="Join our developer ecosystem and unlock exclusive benefits designed to accelerate your growth"
        icon="ph ph-star"
        data={benefitData}
      />
      {/* Contact */}
      <Contact />
    </>
  );
};

export default DeveloperPartner;
