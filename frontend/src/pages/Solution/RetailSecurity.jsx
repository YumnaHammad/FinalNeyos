import React, { useState, useEffect } from "react";
import ImageRightText from "../../components/ImageRightText";
import CarouselCard from "../../components/cards/CarouselCard";
import south_wales_police from "../../assets/images/Solution/new-south-wales-police-logo.png";
import Download from "../../components/Download";
import BannerSection from "../../components/BannerSection";
import WhatWeOfferSection from "../../components/WhatWeOfferSection";

const RetailSecurity = () => {
  const [BannerData, setBannerData] = useState(null);
  const [whatOfferData, setWhatOfferData] = useState(null);
  const [imageCardData, setImageCardData] = useState([]);
  const [downloadData, setDownloadData] = useState(null);
  const citySurveillanceSlides = [
    {
      id: 1,
      image:
        "https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=927f54157ce1650ebb64df05303cf532",
      logo: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=2ed45e331cb291638271f90eaa80d020",
      title: "Istanbul Municipality",
      quote:
        "The smart city surveillance system has significantly enhanced our ability to monitor and respond to urban security challenges. The AI-powered analytics provide real-time insights that help us maintain public safety across the city.",
      author: "Ahmet Yılmaz, Director of Urban Security, Istanbul Municipality",
      link: "#",
      linkText: "Read this case study",
      logoClass: "w-80 mb-6",
    },
    {
      id: 2,
      image:
        "https://pelco-891395695.imgix.net/chukchansi-casino-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=264b574f4e148c9367d53722c3d8fce3",
      logo: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
      title: "Fresno Police Department",
      quote:
        "Our city surveillance network has revolutionized how we approach public safety. The integrated system allows us to monitor critical areas 24/7 and respond to incidents with unprecedented speed and accuracy.",
      author: "Chief Michael Johnson, Fresno Police Department",
      link: "#",
      linkText: "Read this case study",
      logoClass: "w-80 mb-6",
    },
    {
      id: 3,
      image:
        "https://pelco-891395695.imgix.net/gosford-city-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=939612851ec86a545784eec108db0593",
      logo: south_wales_police,
      title: "Fresno Yosemite International Airport",
      quote:
        "The comprehensive surveillance solution has transformed our airport security operations. We can now monitor all critical areas simultaneously while maintaining efficient passenger flow and ensuring safety standards.",
      author: "Joe Maskovich, Chief of Public Safety for Fresno Airports",
      link: "#",
      linkText: "Read this case study",
      logoClass: "w-80 mb-6",
    },
    {
      id: 4,
      image:
        "https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=927f54157ce1650ebb64df05303cf532",
      logo: "https://pelco-566282893.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=2ed45e331cb291638271f90eaa80d020",
      title: "Murtala Muhammed Airport",
      quote:
        "Implementing the smart surveillance system has greatly improved our operational efficiency and security posture. The advanced analytics help us identify potential threats before they become incidents.",
      author: "Sarah Williams, Security Director, Murtala Muhammed Airport",
      link: "#",
      linkText: "Read this case study",
      logoClass: "w-80 mb-6 ",
    },
    {
      id: 5,
      image:
        "https://pelco-891395695.imgix.net/chukchansi-casino-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=264b574f4e148c9367d53722c3d8fce3",
      logo: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
      title: "Hard Rock Hotel & Casino",
      quote:
        "Our integrated surveillance system provides comprehensive coverage of our entire property. The AI-powered features help us maintain a safe environment for our guests while optimizing our security operations.",
      author: "David Rodriguez, Director of Security, Hard Rock Hotel & Casino",
      link: "#",
      linkText: "Read this case study",
      logoClass: "w-80 mb-6",
    },
  ];
  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/retail-security/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetchOfferData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/retail-security/section-2"
      );
      const data = await response.json();
      setWhatOfferData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const fetchImageCardData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/retail-security/section-3"
      );
      const data = await response.json();
      setImageCardData(data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

    const fetchDownloadPdfData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/retail-security/section-5"
      );
      const data = await response.json();
      setDownloadData(Array.isArray(data) ? data[0] : data);

    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

  useEffect(() => {
    fetchBannerData();
    fetchOfferData();
    fetchImageCardData();
    fetchDownloadPdfData();
  }, []);
  return (
    <div>
      {/* Hero Section */}
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
      <div className="mt-5">
        {whatOfferData && (
          <WhatWeOfferSection
            title="What we offer"
            description="   Hikvision's Smart Retail Solution digs into retailers' essential needs and untapped demands, and empowers them with unparalleled capabilities to Connect, Protect, and Perceive for smart, fluid security management and business operations. Hikvision's retail solution caters to businesses that may vary in size but share the need for smarter operations, better security, and more insightful business."
            variant="cards"
            items={whatOfferData.map((item) => ({
              image: item.image,
              title: item.heading,
              description: item.description,
            }))}
          />
        )}

        {imageCardData.length >= 2 && (
          <>
            <ImageRightText
              title={imageCardData[0].heading}
              description={imageCardData[0].sub_heading}
              linkText="Explore more"
              linkHref={imageCardData[0].link}
              imageSrc={imageCardData[0].image}
              imageAlt="Connect stores and align management"
              reverse={true}
              imageHeight="23rem"
            />
            <ImageRightText
              title={imageCardData[1].heading}
              description={imageCardData[1].sub_heading}
              linkText="Explore more"
              linkHref={imageCardData[1].link}
              imageSrc={imageCardData[1].image}
              imageAlt="Father and daughter in supermarket"
              imageHeight="23rem"
              reverse={false}
            />
          </>
        )}
        <div className="mt-10">
          <h2 className="text-center text-4xl font-bold">Success Stories</h2>
          <CarouselCard slides={citySurveillanceSlides} />
        </div>
        {downloadData && (<Download 
        image = {downloadData.image}
        heading= {downloadData.heading}
        sub_heading ={downloadData.sub_heading}
        paragraph = {downloadData.paragraph}
        pdf = {downloadData.pdf} />)}
      </div>
    </div>
  );
};

export default RetailSecurity;
