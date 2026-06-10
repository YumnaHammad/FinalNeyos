// TechnologyPartner.jsx
import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Contact from "../../components/Contact";
import HeroSection from "../../components/HeroSection";
import PartnerHighlight from "../../components/PartnerHighlight";
import WhyChooseUs from "../../components/WhyChooseUs";
import SolutionsSlider from "../../components/sliders/SolutionsSlider";
import BenefitsGrid from "../../components/BenefitsGrid";

const TechnologyPartner = () => {
  const [currentImage, setCurrentImage] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [sectionData, setSectionData] = useState(null);
  const [partnerSectionData, setPartnerSectionData] = useState(null);
  const [technologyPartnerData, setTechnologyPartnerData] = useState(null);
  const [technologySolutionData, setTechnologySolutionData] = useState(null);
  const [benefitData, setBenefitData] = useState([]);
  // Technology Solutions data for Swiper
  const technologySolutions = [
    {
      title: "AI & Machine Learning",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
      description: "Advanced AI algorithms and ML frameworks",
      icon: "ph ph-brain",
      color: "#ff6b6b",
    },
    {
      title: "IoT Platforms",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
      description: "Connected device management and analytics",
      icon: "ph ph-wifi",
      color: "#4ecdc4",
    },
    {
      title: "Cloud Solutions",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
      description: "Scalable cloud infrastructure and services",
      icon: "ph ph-cloud",
      color: "#45b7d1",
    },
    {
      title: "Edge Computing",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
      description: "Real-time processing at the network edge",
      icon: "ph ph-cpu",
      color: "#96ceb4",
    },
    {
      title: "Data Analytics",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
      description: "Big data processing and insights",
      icon: "ph ph-chart-line",
      color: "#feca57",
    },
    {
      title: "Security Solutions",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
      description: "Cybersecurity and threat protection",
      icon: "ph ph-shield-check",
      color: "#ff9ff3",
    },
    {
      title: "5G & Connectivity",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
      description: "Next-generation network technologies",
      icon: "ph ph-signal",
      color: "#54a0ff",
    },
    {
      title: "Smart City Tech",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
      description: "Urban infrastructure and automation",
      icon: "ph ph-buildings",
      color: "#5f27cd",
    },
  ];

  const handleHeadingClick = (imageKey) => {
    setCurrentImage(imageKey);
  };

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // In-page CSS styles with animations
  const pageStyles = {
    heroSection: {
      background:
        "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
      animation: "fadeInUp 1.2s ease-out",
    },
    heroTitle: {
      color: "#00d4ff",
      fontSize: "3.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
      background: "linear-gradient(45deg, #00d4ff, #ff6b6b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "slideInLeft 1.5s ease-out 0.3s both",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      marginBottom: "2.5rem",
      color: "#e0e0e0",
      animation: "slideInLeft 1.5s ease-out 0.6s both",
    },
    terminal: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      border: "2px solid #00d4ff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
      backdropFilter: "blur(10px)",
      animation: "slideInRight 1.5s ease-out 0.3s both",
      transition: "all 0.3s ease",
    },
    terminalHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    terminalDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      marginRight: "0.5rem",
    },
    terminalText: {
      color: "#00d4ff",
      fontSize: "0.9rem",
      margin: "0",
      fontFamily: "monospace",
    },
    liveBadge: {
      backgroundColor: "#00d4ff",
      color: "#000",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "600",
      animation: "pulse 2s infinite",
    },
    primaryButton: {
      backgroundColor: "#00d4ff",
      borderColor: "#00d4ff",
      color: "#000",
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "none",
      animation: "slideInUp 1s ease-out 0.9s both",
    },
    outlineButton: {
      backgroundColor: "transparent",
      borderColor: "#00d4ff",
      color: "#00d4ff",
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "2px solid #00d4ff",
      animation: "slideInUp 1s ease-out 1.2s both",
    },
    section: {
      padding: "80px 0",
      backgroundColor: "#ffffff",
      animation: "fadeIn 1s ease-out",
    },
    sectionDark: {
      padding: "80px 0",
      backgroundColor: "#f8f9fa",
      animation: "fadeIn 1s ease-out",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#0f3460",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "slideInDown 1s ease-out",
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "#666",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto",
      lineHeight: "1.7",
      animation: "slideInDown 1s ease-out 0.3s both",
    },
    card: {
      backgroundColor: "#ffffff",
      border: "3px solid transparent",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      height: "100%",
      backgroundImage:
        "linear-gradient(white, white), linear-gradient(45deg, #00d4ff, #ff6b6b, #4ecdc4)",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      animation: "slideInUp 1s ease-out 0.3s both",
    },
    cardTitle: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#0f3460",
      marginBottom: "1rem",
      background: "linear-gradient(45deg, #00d4ff, #ff6b6b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    cardText: {
      fontSize: "1rem",
      color: "#555",
      lineHeight: "1.8",
      marginBottom: "2rem",
    },
    statsContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "2rem",
    },
    statItem: {
      textAlign: "center",
      animation: "fadeInUp 1s ease-out 0.6s both",
    },
    statIcon: {
      width: "50px",
      height: "50px",
      backgroundColor: "#00d4ff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 0.5rem auto",
      fontSize: "1.5rem",
      color: "#ffffff",
      transition: "all 0.3s ease",
    },
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#00d4ff",
      marginBottom: "0.25rem",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#666",
    },
    interactiveHeading: {
      cursor: "pointer",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "2px solid #e9ecef",
      transition: "all 0.3s ease",
      backgroundColor: "#ffffff",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden",
      animation: "slideInLeft 1s ease-out",
    },
    headingHover: {
      borderColor: "#00d4ff",
      backgroundColor: "#f0f8ff",
      transform: "translateX(10px)",
      boxShadow: "0 5px 20px rgba(0, 212, 255, 0.2)",
    },
    headingIcon: {
      color: "#00d4ff",
      marginRight: "0.75rem",
    },
    imageContainer: {
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      animation: "slideInRight 1s ease-out 0.3s both",
    },
    imageBadge: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      backgroundColor: "#ff6b6b",
      color: "#ffffff",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    playButton: {
      position: "absolute",
      bottom: "1rem",
      right: "1rem",
      width: "50px",
      height: "50px",
      backgroundColor: "#000000",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "1.25rem",
      transition: "all 0.3s ease",
    },
    darkSection: {
      background:
        "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #533483 100%)",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
      animation: "fadeIn 1s ease-out",
    },
    darkSectionTitle: {
      color: "#00d4ff",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "slideInDown 1s ease-out",
    },
    darkSectionSubtitle: {
      color: "#e0e0e0",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto",
      fontSize: "1.1rem",
      lineHeight: "1.7",
      animation: "slideInDown 1s ease-out 0.3s both",
    },
    swiperContainer: {
      padding: "2rem 0",
      animation: "fadeIn 1s ease-out 0.3s both",
    },
    swiperCard: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.4s ease",
      position: "relative",
      overflow: "hidden",
      height: "100%",
    },
    swiperCardHover: {
      transform: "translateY(-15px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      borderColor: "#fff",
    },
    swiperIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem auto",
      fontSize: "2rem",
      color: "#ffffff",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      transition: "all 0.3s ease",
    },
    swiperTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "0.75rem",
    },
    swiperDescription: {
      fontSize: "0.9rem",
      color: "#e0e0e0",
      lineHeight: "1.5",
    },
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    benefitCard: {
      backgroundColor: "#ffffff",
      border: "2px solid #e9ecef",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      animation: "fadeInUp 1s ease-out",
    },
    benefitCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      borderColor: "#00d4ff",
    },
    benefitIcon: {
      fontSize: "3rem",
      color: "#00d4ff",
      marginBottom: "1rem",
      transition: "all 0.3s ease",
    },
    benefitTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#0f3460",
      marginBottom: "0.75rem",
    },
    benefitText: {
      fontSize: "0.95rem",
      color: "#666",
      lineHeight: "1.6",
    },
    navigationButton: {
      backgroundColor: "rgba(0, 212, 255, 0.2)",
      border: "2px solid #00d4ff",
      color: "#00d4ff",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
    },
    navigationButtonHover: {
      backgroundColor: "rgba(0, 212, 255, 0.4)",
      transform: "scale(1.1)",
    },
  };

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
  const fetchSectionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/cctv-partner/section-2"
      );
      const data = await response.json();
      setSectionData(data);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  const fetchPartnerSectionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/technology-partner/section-2"
      );
      const data = await response.json();
      setPartnerSectionData(data);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  const fetcTechnologyPartnerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/technology-partner/section-3"
      );
      const data = await response.json();
      setTechnologyPartnerData(data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetcTechnologySolutionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/technology-partner/section-4"
      );
      const data = await response.json();
      setTechnologySolutionData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
    const fetchBenefitSectionData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/technology-partner/section-5"
      );
      const data = await response.json();
      setBenefitData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
  };
  useEffect(() => {
    fetchSectionData();
    fetchPartnerSectionData();
    fetcTechnologyPartnerData();
    fetcTechnologySolutionData();
    fetchBenefitSectionData();
  }, []);
  return (
    <>
      <style>{animations}</style>
      {/* <Banner /> */}

      {/* Hero Section */}
      <HeroSection
        title="Technology Partner Program"
        subtitle="Join forces with Nexyos to create the next generation of IoT and video surveillance 
               technologies. Collaborate, innovate, and shape the future together."
        terminalTitle="Technology Partner Terminal"
        Terminalcode={{
          textColor: "#00d4ff",
          code: `> Nexyos Technology Partner Program
                  > Initializing partnership protocols...
                  > Status: READY
                  > Available technologies: 8
                  > Connection: ESTABLISHED

                  Welcome to the future of collaboration!`,
        }}
        badge={{
          text: "Live",
          bgColor: "#00d4ff",
          textColor: "#000",
        }}
        secondaryButton={{
          label: "Explore Opportunities",
          icon: "ph ph-rocket",
          textColor: "#00d4ff",
          borderColor: "2px solid #00d4ff",
          backgroundColor: "transparent",
          onClick: () => {},
        }}
        primaryButton={{
          label: "Partner With Us",
          icon: "ph ph-handshake",
          bgColor: "#00d4ff",
          textColor: "#000",
          borderColor: "#00d4ff",
          onClick: () => {},
        }}
      />
      {/* Technology Partner Program Section */}
      {partnerSectionData && (
        <PartnerHighlight
          image={partnerSectionData.image}
          imageAlt="CCTV Partner"
          badge={{
            text: "Tech Innovation Hub",
            bgColor: "#e74c3c",
            textColor: "#fff",
          }}
          cameraIcon="ph ph-play"
          heading={partnerSectionData.heading}
          headingIcon="ph ph-lightbulb"
          description={partnerSectionData.description}
          stats={[
            {
              icon: "ph ph-lightbulb",
              value: partnerSectionData.sub_heading1,
              label: "Innovations",
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
      {/* Why Partner with Nexyos Section */}
      {technologyPartnerData && (
        <WhyChooseUs
          heading={technologyPartnerData.heading || ""}
          subHeadings={[
            technologyPartnerData.sub_heading1,
            technologyPartnerData.sub_heading2,
            technologyPartnerData.sub_heading3,
          ].filter(Boolean)}
          image={technologyPartnerData.image || ""}
          badgeText="Interactive Preview"
        />
      )}
      {/* Technology Solutions Section with Swiper */}
      {technologySolutionData && (
        <SolutionsSlider
          title="Technology Solutions & Capabilities"
          icon="ph ph-cube"
          subtitle=" Our technology partners bring diverse expertise across emerging
            technologies, enabling us to deliver comprehensive solutions that
            address complex business challenges. From AI and IoT to cloud
            computing and edge processing, we collaborate to create innovative,
            scalable solutions."
          background="linear-gradient(135deg, rgb(15, 52, 96) 0%, rgb(22, 33, 62) 50%, rgb(83, 52, 131) 100%)"
          data={technologySolutionData}
        />
      )}
      {/* Partnership Benefits Section */}
      <BenefitsGrid
         title="Partnership Benefits"
        subtitle="  Discover the advantages of partnering with Nexyos and how we can
            help grow your business"
        icon="ph ph-star"
        data={benefitData}/>
        {/* Contact */}
      <Contact />
    </>
  );
};

export default TechnologyPartner;
