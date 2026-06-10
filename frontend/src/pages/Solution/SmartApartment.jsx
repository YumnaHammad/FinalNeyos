import React ,{useEffect,useState} from 'react';
import TrustedBy from '../../components/SpaceOccupancy/TrustedBy';
import SecurityTabs from '../../components/SpaceOccupancy/SecurityTabs';
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiSecurityCamera } from 'react-icons/pi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { LuNewspaper } from 'react-icons/lu';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { FaBalanceScaleLeft } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { GrShieldSecurity } from 'react-icons/gr';
import Download from '../../components/Download';
import ReliableResources from '../../components/Solution/SmartRestroom/ReliableResources';
import BannerSection from '../../components/BannerSection';

const SmartApartment = () => {
     const [section1Data, setSection1Data] = useState(null);
     const [section2Data, setSection2Data] = useState(null);
     const [section3Data, setSection3Data] = useState(null);
  const securityTabs = [
    {
      label: "Smart Security",
      title: "Enhanced apartment security and access control",
      description:
        "Comprehensive security solutions for modern apartment complexes, providing residents with peace of mind while ensuring property managers maintain full control over access and safety.",
      points: [
        {
          icon: <HiOutlineExclamationTriangle size={60}  className="text-xl" />,
          title: "Access Control",
          desc: "Smart key cards, biometric entry, and mobile app access provide secure and convenient entry for residents and authorized visitors.",
        },
        {
          icon: <PiSecurityCamera size={60} className="text-xl" />,
          title: "24/7 Surveillance",
          desc: "High-definition cameras with AI analytics monitor common areas, parking lots, and entry points for enhanced security.",
        },
        {
          icon: <TiWeatherPartlySunny size={60} className="text-xl" />,
          title: "Emergency Response",
          desc: "Integrated emergency systems with instant alerts and direct communication to security personnel and emergency services.",
        },
      ],
        link: 'Learn More About Security',
        linkPath: "/contact",
      image:
        "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-1.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=800&q=80&w=800&s=662a0baa601ea6c0a7969a3681319d2b", 
    },
    {
      label: "Smart Management",
      title: "Efficient property management and maintenance",
      description:
        "Streamlined apartment management systems that automate routine tasks, improve communication between residents and management, and optimize operational efficiency.",
      points: [
        {
          icon: <BsGraphUpArrow size={60} className="text-xl" />,
          title: "Maintenance Tracking",
          desc: "Digital work orders, real-time status updates, and automated scheduling ensure timely maintenance and repairs.",
        },
        {
          icon: <LuNewspaper size={60} className="text-xl" />,
          title: "Resident Portal",
          desc: "Online portal for rent payments, maintenance requests, package notifications, and community announcements.",
        },
         {
          icon: <LiaShippingFastSolid size={60} className="text-xl" />,
          title: "Energy Management",
          desc: "Smart thermostats, lighting controls, and utility monitoring help reduce costs and improve sustainability.",
        },
      ],
        link: 'Explore Management Features',
        linkPath: "/contact",
      image:
        "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-2.jpg?auto=format&fit=clip&q=80&w=800&s=f4c336d73a87badf3cb5f09cd08fc6c8",
  
    },
    {
      label: "Smart Living",
      title: "Enhanced resident experience and comfort",
      description:
        "Modern amenities and smart home features that improve resident satisfaction, increase property value, and create a connected community environment.",
      points: [
        {
          icon: <FaBalanceScaleLeft size={60} className="text-xl" />,
          title: "Smart Amenities",
          desc: "Connected fitness centers, smart package lockers, and automated common area management enhance resident convenience.",
        },
        {
          icon: <RiSecurePaymentLine  size={60} className="text-xl" />,
          title: "Community Features",
          desc: "Digital community boards, event management, and social networking features foster resident engagement and community building.",
        },
              {
          icon: <GrShieldSecurity  size={60} className="text-xl" />,
          title: "IoT Integration",
          desc: "Seamless integration with smart home devices, allowing residents to control lighting, climate, and security from their smartphones.",
        },
      ],
        link: 'Discover Smart Living',
        linkPath: "/contact",
      image:
        "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-3.jpg?auto=format&fit=clip&q=80&w=800&s=e4647adb37edc98768ff0a28b08f8756",
    },
  ];
  const fetchSection1Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-apartment/section-1"
      );
      const data = await response.json();
      setSection1Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 1 data:", error);
    }
  };

  const fetchSection2Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-apartment/section-2"
      );
      const data = await response.json();
      setSection2Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 2 data:", error);
    }
  };

  const fetchSection3Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-apartment/section-3"
      );
      const data = await response.json();
      setSection3Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 3 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
    fetchSection2Data();
    fetchSection3Data();
  }, []);
  return (
    <>
      {/* Section 1 - Hero Section from API */}
      {section1Data && (
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title={section1Data.heading}
          subtitle={section1Data.paragraph}
          image={section1Data.image}
        />
      )}

      <div className="mt-5">
        {/* Section 2 - Additional Content from API */}
        {section2Data && (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-8xl mx-auto">
              <div className="text-center my-40">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {section2Data.heading}
                </h2>
                {section2Data.paragraph && (
                  <p className="text-lg text-gray-600  leading-relaxed">
                    {section2Data.paragraph}
                  </p>
                )}
                {section2Data.sub_heading && (
                  <p className="text-lg text-gray-600  mx-auto leading-relaxed mt-4">
                    {section2Data.sub_heading}
                  </p>
                )}
              </div>
              {section2Data.image && (
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={section2Data.image}
                    alt={section2Data.heading}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <TrustedBy />
        <SecurityTabs tabs={securityTabs}/>
        <ReliableResources/>

        {/* Section 3 - Download Section from API */}
        {section3Data && (
          <Download 
            image={section3Data.image}
            heading={section3Data.heading}
            sub_heading={section3Data.sub_heading}
            paragraph={section3Data.paragraph}
            pdf={section3Data.pdf} 
          />
        )}
      </div>
    </>
  );
};

export default SmartApartment;

