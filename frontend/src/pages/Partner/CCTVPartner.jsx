// CCTVPartner.jsx
import React, { useState, useEffect } from "react";
import Contact from "../../components/Contact";
import HeroSection from "../../components/HeroSection";
import WhyChooseUs from "../../components/WhyChooseUs";
import SolutionsSlider from "../../components/sliders/SolutionsSlider";
import BenefitsGrid from "../../components/BenefitsGrid";
import PartnerHighlight from "../../components/PartnerHighlight";

const CCTVPartner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cctvPartnerData, setCctvPartnerData] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [benefitData, setBenefitData] = useState([]);
  const [partnerSectionData, setPartnerSectionData] = useState(null);
  const subHeadings = cctvPartnerData
    ? [
        cctvPartnerData.sub_heading1,
        cctvPartnerData.sub_heading2,
        cctvPartnerData.sub_heading3,
      ].filter(Boolean)
    : [];
  const fetchCctvPartnerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/cctv-partner/section-3"
      );
      const data = await response.json();
      setCctvPartnerData(data);
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
        "https://nexyos.deeptech.pk/api/cctv-partner/section-5"
      );
      const data = await response.json();
      setBenefitData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  const fetchPartnerSectionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/cctv-partner/section-2"
      );
      const data = await response.json();
      setPartnerSectionData(data);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  useEffect(() => {
    setIsVisible(true);
    fetchCctvPartnerData();
    fetchSolutionData();
    fetchBenefitSectionData();
    fetchPartnerSectionData();
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
        title="CCTV Channel Partner Program"
        subtitle=" Join Nexyos as a CCTV Channel Partner and deliver cutting-edge
                security solutions to your customers. Access our comprehensive
                portfolio of surveillance technologies and build a profitable
                security business."
        terminalTitle="Security Command Center"
        Terminalcode={{
          textColor: "#00ff00",
          code: `> Nexyos CCTV Partner Program
> Security Level: MAXIMUM
> Surveillance Status: ACTIVE
> AI Detection: ENABLED
> Access Control: SECURED

Welcome to the future of security!`,
        }}
        badge={{
          text: "SECURE",
          bgColor: "#e74c3c",
          textColor: "white",
        }}
        secondaryButton={{
          label: "Security Solutions",
          icon: "ph ph-shield-check",
          textColor: "#00d4ff",
          borderColor: "2px solid #00d4ff",
          backgroundColor: "transparent",
          onClick: () => {},
        }}
        primaryButton={{
          label: "Become Partner",
          icon: "ph ph-handshake",
          bgColor: "#e74c3c",
          textColor: "white",
          borderColor: "#e74c3c",
          onClick: () => {},
        }}
      />
      {/* CCTV Channel Partner Program Section */}
      {partnerSectionData && (
        <PartnerHighlight
          image={partnerSectionData.image}
          imageAlt="CCTV Partner"
          badge={{
            text: "Security Zone",
            bgColor: "#e74c3c",
            textColor: "#fff",
          }}
          cameraIcon="ph ph-camera"
          heading={partnerSectionData.heading}
          headingIcon="ph ph-shield-check"
          description={partnerSectionData.description}
          stats={[
            {
              icon: "ph ph-camera",
              value: partnerSectionData.sub_heading1,
              label: "Cameras",
            },
            {
              icon: "ph ph-globe",
              value: partnerSectionData.sub_heading2,
              label: "Countries",
            },
            {
              icon: "ph ph-users",
              value: partnerSectionData.sub_heading3,
              label: "Partners",
            },
          ]}
        />
      )}
      {/* Why Choose Nexyos CCTV Section */}
      {cctvPartnerData && (
        <WhyChooseUs
          heading={cctvPartnerData.heading || ""}
          subHeadings={[
            cctvPartnerData.sub_heading1,
            cctvPartnerData.sub_heading2,
            cctvPartnerData.sub_heading3,
          ].filter(Boolean)}
          image={cctvPartnerData.image || ""}
          badgeText="Live Preview"
        />
      )}
      {/* CCTV Solutions Section with Swiper */}
      <SolutionsSlider
        title="CCTV Solutions & Products"
        icon="ph ph-camera"
        subtitle="Our comprehensive CCTV portfolio includes high-definition IP
            cameras, advanced NVR systems, intelligent video analytics, and
            cloud-based solutions. From small business installations to
            enterprise-grade security systems, we provide scalable solutions
            that meet diverse customer requirements."
         background="linear-gradient(135deg, #1a1a1a 0%, #2c3e50 25%, #34495e 50%, #2c3e50 75%, #1a1a1a 100%)"
        data={cardData}
      />
      {/* Channel Partner Benefits Section */}
      <BenefitsGrid
        title="Channel Partner Benefits"
        subtitle="Discover the advantages of becoming a Nexyos CCTV channel partner"
        icon="ph ph-star"
        data={benefitData}
      />
      {/* Contact */}
      <Contact />
    </>
  );
};

export default CCTVPartner;
