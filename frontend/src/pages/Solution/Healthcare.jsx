import React, { useState, useEffect } from "react";
import TrustedBy from "../../components/SpaceOccupancy/TrustedBy";
import SecurityTabs from "../../components/SpaceOccupancy/SecurityTabs";
import { PiMagnifyingGlassFill, PiStackLight } from "react-icons/pi";
import { BsFastForward, BsDatabaseLock } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import { RiShieldKeyholeLine } from "react-icons/ri";
import {
  MdOutlineMonitorHeart,
  MdOutlinePsychology,
  MdOutlineWarningAmber,
} from "react-icons/md";
import { GiAwareness } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";
import CameraSolutions from "../../components/Solution/CameraSolutions";
import CarouselCard from "../../components/cards/CarouselCard";
// import south_wales_police from "../../assets/images/Solution/new-south-wales-police-logo.png";
// import FAT_Logo_Water from "../../assets/images/Solution/FAT-Logo-Watercolor-stacked.jpg";
// import Chukchansi_Gold_Resort from "../../assets/images/Solution/Chukchansi_Gold_Resort.png";
import BannerSection from "../../components/BannerSection";

const Healthcare = () => {
  const [BannerData, setBannerData] = useState(null);
  const [cardCarouselData, setCardCarouselData] = useState([]);
  const [certificateData, setcertificateData] = useState([])

  const securityTabs = [
    {
      label: "Strengthen safety",
      title: " Safeguard hospital premises",
      description:
        "Safeguard healthcare facilities with nexyos’s video surveillance for hospitals with a wide variety of medical security cameras that help ensure complete coverage and data protection.",
      points: [
        {
          icon: <PiMagnifyingGlassFill size={60} className="text-xl" />,
          title: "Enhance visibilit",
          desc: "Installing hospital CCTV  systems in crucial areas like the ER  provides complete coverage and boosts safety.",
        },
        {
          icon: <BsFastForward size={60} className="text-xl" />,
          title: "Detect faster",
          desc: "Hospital video surveillance with 360-degree views allow unusual activities to be detected immediately.",
        },
        {
          icon: <BsDatabaseLock size={60} className="text-xl" />,
          title: "Keep data safe",
          desc: "Our cybersecurity team works at every stage to keep patient data such as HIPAA  safe and protected.",
        },
      ],
      link: "Connect with an expert ",
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/Healthcare-50-50-media-text-container-850x850-1.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=800&q=80&w=800&s=cd1e383435bdfcfb9bbf59e180c43a30",
    },
    {
      label: "Provide better care",
      title: "Ensure patient wellbeing",
      description:
        "Free up dedicated staff and help ensure the safety and comfort of patients with powerfully built live security cameras for clinics that promote a better quality of care in hospitals.",
      points: [
        {
          icon: <HiOutlineBellAlert size={60} className="text-xl" />,
          title: "Assist patients faster",
          desc: "nexyos’s healthcare security systems provide live video to alert staff when patients need assistance.",
        },
        {
          icon: <HiOutlineEye size={60} className="text-xl" />,
          title: "Monitor patient safety",
          desc: "Our patient video monitoring systems provide coverage of small to large patient rooms to monitor safety.",
        },
        {
          icon: <RiShieldKeyholeLine size={60} className="text-xl" />,
          title: "Protect investments",
          desc: "nexyos’s medical office cameras are vandal-resistant to prevent tampering without interrupting video feed.",
        },
      ],
      link: "Connect with an expert ",
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/Healthcare-50-50-media-text-container-850x850-2.jpg?auto=format&fit=clip&q=80&w=800&s=64ffa3ea453218156b7a2003b794b821",
    },
    {
      label: "Better operations",
      title: " Create holistic security",
      description:
        "nexyos’s open platform security system for healthcare and hospital video surveillance enables easy integration with third-party cameras and physical security systems, enhancing efficiency.",
      points: [
        {
          icon: <MdOutlineMonitorHeart size={60} className="text-xl" />,
          title: "Simplify security processes",
          desc: "nexyos’s healthcare security solutions work with any video management system to streamline security.",
        },
        {
          icon: <MdOutlinePsychology size={60} className="text-xl" />,
          title: "Increase efficiency",
          desc: "AI-powered object detection simplifies processes, reduces operational costs and mitigates risks.",
        },
        {
          icon: <PiStackLight size={60} className="text-xl" />,
          title: "Enhance scalability",
          desc: "Integrations with other hospital surveillance systems and tools allow easy expansion as facilities grow.",
        },
      ],
      link: "Connect with an expert ",
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/Healthcare-50-50-media-text-container-850x850-3.jpg?auto=format&fit=clip&q=80&w=800&s=a21f8c4d8d297ae5364edc2266a80ce0",
    },
    {
      label: "Enhance security",
      title: "Improve situational awareness",
      description:
        "Enhance security in privacy-concern areas in your hospital with the HALO Smart Sensor. This all-in-one device can detect and alert security teams to vaping, changes to air quality and security events.",
      points: [
        {
          icon: <GiAwareness size={60} className="text-xl" />,
          title: "Greater awareness",
          desc: "Observe patient safety in privacy-concern areas where audio and video recording is not permitted.",
        },
        {
          icon: <FaBriefcaseMedical size={60} className="text-xl" />,
          title: "Protect assets",
          desc: "Get alerts to air quality, humidity or temperature changes that could damage medicine and equipment.",
        },
        {
          icon: <MdOutlineWarningAmber size={60} className="text-xl" />,
          title: "Instant alerts, faster responses",
          desc: "Receive alerts of vaping, gunshots, fighting or a fire, so your security team can respond faster.",
        },
      ],
      link: "Discover HALO Smart Sensor",
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/Halo_50x50_Healthcare.jpg?auto=format&fit=clip&q=80&w=800&s=a7f7730d84475982f470d0590688b4b7",
    },
  ];

  const cameraItems = [
    {
      title: "Sarix Fisheye Camera",
      description:
        "A low-profile and cost-effective 360-degree security camera for coverage of large hospital areas from a single vantage point.",
      img: "https://pelco-891395695.imgix.net/product/product_card_fisheye.png?auto=format&fit=clip&q=80&w=1168&s=92b98b0d9f733e6dccd808ec718ae524",
      link: "#",
    },
    {
      title: "Sarix Value Series",
      description:
        "Affordable and reliable video security solution for healthcare facilities with high image quality that meets regulatory standards.",
      img: "https://pelco-891395695.imgix.net/product/product_card_sarix_family.png?auto=format&fit=clip&q=80&w=1168&s=461ec0357c991804deb97c4bedd6b468",
      link: "https://www.pelco.com/cameras/sarix-value",
    },
    {
      title: "Sarix Professional 4 Series",
      description:
        "Analytics-enabled indoor and outdoor fixed IP security cameras that provide high-quality video for hospital applications.",
      img: "https://pelco-891395695.imgix.net/product/product_card_sarix-pro-4.png?auto=format&fit=clip&q=80&w=1168&s=87127aa75c73fb1b25bbc74e2338486c",
      link: "#",
    },
  ];
  // const citySurveillanceSlides = [
  //   {
  //     id: 1,
  //     image:
  //       "https://pelco-891395695.imgix.net/t-mobile-arena-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=5c12a5c6de374a476c72f64ea0e5eed5",
  //     logo: "https://pelco-891395695.imgix.net/c1_v1_t-mobile_Logo-copy.png?auto=format&fit=clip&q=80&w=328&s=1aa181bc178265d424c448c722ac7979",
  //     title: "T‑Mobile Arena",
  //     quote:
  //       "To provide a best-in-class entertainment experience, T‑Mobile Arena invested in Pelco’s surveillance systems for uncompromised safety and security.",
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
  //     title: "Chukchansi Gold Casino & Resort",
  //     quote:
  //       "“We’ve been able to meet regulatory demands and ensure a safe and secure experience for our staff and guests by leveraging new technology. We couldn’t be more pleased.”",
  //     author:
  //       "Tommy McDonald, Surveillance Manager for Chukchansi Gold Casino and Resort",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://pelco-891395695.imgix.net/fresno-airport-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=927f54157ce1650ebb64df05303cf532",
  //     logo: "https://pelco-891395695.imgix.net/c1_v1_Fresno_Yosemite_Airport_Logo.png?auto=format&fit=clip&q=80&w=328&s=8c5dd9217a49ba9dbb48f6d20c3220cd",
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
  //       "https://pelco-891395695.imgix.net/chukchansi-casino-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=264b574f4e148c9367d53722c3d8fce3",
  //     logo: "https://pelco-566282893.imgix.net/c1_v1_Chukchansi_Logo_2023-01-12-022321_iycj.png?auto=format&fit=clip&q=80&w=328&s=7b23920962b8e96f270824d266b3c2b0",
  //     title: "Chukchansi Gold Casino & Resort",
  //     quote:
  //       "“We’ve been able to meet regulatory demands and ensure a safe and secure experience for our staff and guests by leveraging new technology. We couldn’t be more pleased.”",
  //     author:
  //       "Tommy McDonald, Surveillance Manager for Chukchansi Gold Casino and Resort",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://pelco-891395695.imgix.net/t-mobile-arena-image-850x638.jpg?auto=format&fit=clip&q=80&w=900&s=5c12a5c6de374a476c72f64ea0e5eed5",
  //     logo: "https://pelco-891395695.imgix.net/c1_v1_t-mobile_Logo-copy.png?auto=format&fit=clip&q=80&w=328&s=1aa181bc178265d424c448c722ac7979",
  //     title: "T‑Mobile Arena",
  //     quote:
  //       "To provide a best-in-class entertainment experience, T‑Mobile Arena invested in Pelco’s surveillance systems for uncompromised safety and security.",
  //     author: "Ahmet Yılmaz, Director of Urban Security, Istanbul Municipality",
  //     link: "#",
  //     linkText: "Read this case study",
  //     logoClass: "w-80 mb-6",
  //   },
  // ];
  const certifications = [
    {
      icon: "https://pelco-891395695.imgix.net/c1_v1_Cybersecurity_Compliant.png?auto=format&fit=clip&q=80&w=1168&s=25654c4b78f3309486cd721707e9279e",
      title: "Cybersecurity",
      description:
        "Experience a trusted and cyber secure platform - TLS 1.2, RMF, FIPS 140-2.",
    },
    {
      icon: "https://pelco-891395695.imgix.net/c1_v1_NDAA_Compliant.png?auto=format&fit=clip&q=80&w=1168&s=e41dac6fda53fbeb237540f07ae5bb38",
      title: "NDAA Compliant",
      description: "NDAA Section 889 compliant cameras.",
    },
    {
      icon: "https://pelco-891395695.imgix.net/c1_v1_Onvif_Compliant.png?auto=format&fit=clip&q=80&w=1168&s=3ad35323e5fb7a127320e01612762827",
      title: "ONVIF-conformant",
      description: "Pelco products are ONVIF Profile S, G, T and M conformant.",
    },
    {
      icon: "https://pelco-891395695.imgix.net/c1_v1_GSA_Compliant.png?auto=format&fit=clip&q=80&w=1168&s=59b97914d2f341061f061f57b541bea2",
      title: "GSA Approved",
      description: "Trade Agreement Act or Country of Origin US - Pelco GSA",
    },
  ];
  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/health-care/section-1"
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
        "https://nexyos.deeptech.pk/api/health-care/section-2"
      );
      const data = await response.json();
      setCardCarouselData(data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
const fetchCertificateData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/health-care/section-3"
      );
      const data = await response.json();
      setcertificateData(data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  useEffect(() => {
    fetchBannerData();
    fetchCardCarouselData();
    fetchCertificateData();
  }, []);
  return (
    <>
      {BannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-black"
          title={BannerData.heading}
          subtitle={BannerData.description}
          image={BannerData.image}
        />
      )}
      {/* Trusted By Section */}
      <TrustedBy />

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Content */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Hospital CCTV cameras with advanced features
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          See how our hospital security systems and cameras work to enhance
          visibility and detection to serve the unique needs of your healthcare
          facilities.
        </p>
      </div>
      <SecurityTabs tabs={securityTabs} />

      <CameraSolutions
        heading="Nexyos hospital security solutions"
        subheading="Our line of healthcare security solutions covers all hospital areas, from urgent care and the emergency department to doctors’ offices, with a variety of security cameras."
        items={cameraItems}
      />

      <div className="mt-32">
        <h4>Our customer stories</h4>
       {/* Carousel Section */}
            <CarouselCard slides={cardCarouselData} />
      </div>
      <section className="py-12 bg-white text-center mt-48">
        <h2 className="text-2xl font-bold mb-2">
          Compliance and certifications
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-10">
          Create a smarter and safer world with Pelco’s wide range of cameras
          and sensors working together to meet global security standards.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {certificateData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={item.image}
                alt={item.title}
                className=" mb-4"
                style={{ height: "100px", width: "46%" }}
              />
              <h3 className="text-lg font-semibold">{item.heading}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Healthcare;
