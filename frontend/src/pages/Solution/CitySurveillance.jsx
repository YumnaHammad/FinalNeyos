import React, { useState, useEffect } from "react";
import TrustedBy from "../../components/SpaceOccupancy/TrustedBy";
import CarouselCard from "../../components/cards/CarouselCard";
import HighlightsSection from "../../components/Solution/HighlightsSection";
import InterestedSection from "../../components/Solution/InterestedSection";
import retail_related_links from "../../assets/images/nexyos/retail_related_links.png";
import extrance from "../../assets/images/nexyos/extrance.jpg";
import Store1 from "../../assets/images/nexyos/Store1.jpg";
import BannerSection from "../../components/BannerSection";

const CitySurveillance = () => {
  const [BannerData, setBannerData] = useState(null);
  const [cardCarouselData, setCardCarouselData] = useState([]);
  // const citySurveillanceSlides = [
  //   {
  //     id: 1,
  //     image:
  //       "https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=927f54157ce1650ebb64df05303cf532",
  //     logo: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=2ed45e331cb291638271f90eaa80d020",
  //     title: "Istanbul Municipality",
  //     quote:
  //       "The smart city surveillance system has significantly enhanced our ability to monitor and respond to urban security challenges. The AI-powered analytics provide real-time insights that help us maintain public safety across the city.",
  //     author: "Ahmet Yılmaz, Director of Urban Security, Istanbul Municipality",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://pelco-891395695.imgix.net/chukchansi-casino-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=264b574f4e148c9367d53722c3d8fce3",
  //     logo: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
  //     title: "Fresno Police Department",
  //     quote:
  //       "Our city surveillance network has revolutionized how we approach public safety. The integrated system allows us to monitor critical areas 24/7 and respond to incidents with unprecedented speed and accuracy.",
  //     author: "Chief Michael Johnson, Fresno Police Department",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://pelco-891395695.imgix.net/gosford-city-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=939612851ec86a545784eec108db0593",
  //     logo: south_wales_police,
  //     title: "Fresno Yosemite International Airport",
  //     quote:
  //       "The comprehensive surveillance solution has transformed our airport security operations. We can now monitor all critical areas simultaneously while maintaining efficient passenger flow and ensuring safety standards.",
  //     author: "Joe Maskovich, Chief of Public Safety for Fresno Airports",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=927f54157ce1650ebb64df05303cf532",
  //     logo: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=2ed45e331cb291638271f90eaa80d020",
  //     title: "Murtala Muhammed Airport",
  //     quote:
  //       "Implementing the smart surveillance system has greatly improved our operational efficiency and security posture. The advanced analytics help us identify potential threats before they become incidents.",
  //     author: "Sarah Williams, Security Director, Murtala Muhammed Airport",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6 ",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://pelco-891395695.imgix.net/chukchansi-casino-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=264b574f4e148c9367d53722c3d8fce3",
  //     logo: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
  //     title: "Hard Rock Hotel & Casino",
  //     quote:
  //       "Our integrated surveillance system provides comprehensive coverage of our entire property. The AI-powered features help us maintain a safe environment for our guests while optimizing our security operations.",
  //     author: "David Rodriguez, Director of Security, Hard Rock Hotel & Casino",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  // ];

  const sensorHighlights = [
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/lorawan-and-poe-icon.png?t=1754899499415",
      title: "Multi-Transmission",
      description:
        "LoRaWAN®, Ethernet, Cellular, and Wi-Fi Halow transmission provide flexible connectivity options for city-wide surveillance networks.",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/ai-icon.png?t=1754899499415",
      title: "AI-Powered Analytics",
      description:
        "Advanced AI algorithms enable real-time threat detection, behavior analysis, and predictive policing for enhanced urban security.",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/accuracy-icon.png?t=1754899499415",
      title: "High-Resolution Monitoring",
      description:
        "Ultra-high definition cameras with advanced image processing deliver crystal-clear surveillance footage for critical urban areas.",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/privacy-detection-icon.png?t=1754899499415",
      title: "Privacy-Compliant Surveillance",
      description:
        "GDPR-compliant systems that protect citizen privacy while maintaining effective public safety monitoring capabilities.",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/compatibility-icon.png?t=1754899499415",
      title: "Seamless Integration",
      description:
        "Open APIs and MQTT/HTTP(s) protocols enable easy integration with existing city infrastructure and emergency response systems.",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/solution/people-counting/central-management-icon.png?t=1754899499415",
      title: "Centralized Management",
      description:
        "Unified control center for managing city-wide surveillance networks, reducing operational complexity and improving response times.",
    },
  ];

  const data = [
    {
      title: "Traffic Management",
      description:
        "Intelligent traffic monitoring and control systems for optimizing urban mobility and reducing congestion",
      image: extrance,
    },
    {
      title: "Public Safety",
      description:
        "Comprehensive surveillance solutions for public spaces, transportation hubs, and critical infrastructure protection",
      image: retail_related_links,
    },
    {
      title: "Smart Parking",
      description:
        "Advanced parking management systems with real-time monitoring and automated guidance for efficient space utilization",
      image: Store1,
    },
  ];

  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/city-surveillance/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetchCardCarouselData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/city-surveillance/section-2"
      );
      const data = await response.json();
      setCardCarouselData(data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  useEffect(() => {
    fetchBannerData();
    fetchCardCarouselData();
  }, []);
  return (
    <>
      {BannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title={BannerData.heading}
          subtitle={BannerData.description}
          image={BannerData.image}
        />
      )}
      {/* Trusted By Section */}
      <TrustedBy />

      {/* Carousel Section */}
      <CarouselCard slides={cardCarouselData} />
      {/* Highlights Section */}
      <HighlightsSection
        title="Highlights of Milesight City Surveillance Solutions"
        highlights={sensorHighlights}
      />

      <InterestedSection
        sectionTitle="You may also be interested in"
        items={data}
      />
    </>
  );
};

export default CitySurveillance;
