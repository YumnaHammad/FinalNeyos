import React from 'react';
import TrustedBy from '../../components/SpaceOccupancy/TrustedBy';
import SecurityTabs from '../../components/SpaceOccupancy/SecurityTabs';
import { GiAwareness } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";
import { MdOutlineWarningAmber } from "react-icons/md";
import { PiShieldCheck } from "react-icons/pi";
import { BsThermometerHalf } from "react-icons/bs";
import { RiAirplayLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import BannerSection from '../../components/BannerSection';

const HALOSmartSensor = () => {

  const bannerImage = "https://pelco-891395695.imgix.net/hero-images/HALO-Smart-Sensor-Hero-3344x800.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=610&q=80&w=2550&s=b29292c1ca50304aef344e60eec74347";
  
  const securityTabs = [
    {
      label: "Smart Detection",
      title: "Advanced environmental monitoring",
      description:
        "The HALO Smart Sensor is an all-in-one device that provides comprehensive environmental monitoring and security detection capabilities for healthcare facilities, schools, and commercial spaces.",
      points: [
        {
          icon: <GiAwareness size={60} className="text-xl" />,
          title: "Air quality monitoring",
          desc: "Continuously monitor air quality, humidity, and temperature to ensure optimal conditions for patients and equipment.",
        },
        {
          icon: <MdOutlineWarningAmber size={60} className="text-xl" />,
          title: "Vaping detection",
          desc: "Advanced sensors detect vaping activities in restricted areas, helping maintain clean air environments and policy compliance.",
        },
        {
          icon: <FaBriefcaseMedical size={60} className="text-xl" />,
          title: "Security event alerts",
          desc: "Detect gunshots, fighting, or other security incidents and immediately alert security teams for rapid response.",
        },
      ],
      link: 'Learn more about HALO',
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/HALO-Smart-Sensor-50-50-media-text-container-850x850-1.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=800&q=80&w=800&s=cd1e383435bdfcfb9bbf59e180c43a30",
    },
    {
      label: "Privacy Protection",
      title: "Monitor without recording",
      description:
        "HALO Smart Sensor provides situational awareness in privacy-concerned areas where audio and video recording is not permitted, ensuring safety while respecting privacy regulations.",
      points: [
        {
          icon: <PiShieldCheck size={60} className="text-xl" />,
          title: "Privacy-compliant monitoring",
          desc: "Monitor patient safety and security in sensitive areas without violating privacy regulations or HIPAA requirements.",
        },
        {
          icon: <BsThermometerHalf size={60} className="text-xl" />,
          title: "Environmental protection",
          desc: "Get alerts for air quality, humidity, or temperature changes that could damage medicine and medical equipment.",
        },
        {
          icon: <RiAirplayLine size={60} className="text-xl" />,
          title: "Real-time alerts",
          desc: "Receive instant notifications of vaping, gunshots, fighting, or fire incidents for faster emergency response.",
        },
      ],
      link: 'Request a demo',
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/HALO-Smart-Sensor-50-50-media-text-container-850x850-2.jpg?auto=format&fit=clip&q=80&w=800&s=64ffa3ea453218156b7a2003b794b821",
    },
    {
      label: "Smart Integration",
      title: "Seamless system connectivity",
      description:
        "HALO Smart Sensor integrates effortlessly with existing security systems, building management systems, and IoT platforms to provide comprehensive facility monitoring and control.",
      points: [
        {
          icon: <MdOutlineIntegrationInstructions size={60} className="text-xl" />,
          title: "Easy integration",
          desc: "Connect with existing security systems, access control, and building management systems for unified facility monitoring.",
        },
        {
          icon: <TbDeviceAnalytics size={60} className="text-xl" />,
          title: "Advanced analytics",
          desc: "AI-powered analytics provide insights into environmental patterns and security trends for proactive facility management.",
        },
        {
          icon: <IoCloudUploadOutline size={60} className="text-xl" />,
          title: "Cloud connectivity",
          desc: "Cloud-based monitoring and management allow remote access to sensor data and alerts from anywhere, anytime.",
        },
      ],
      link: 'Get started today',
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/HALO-Smart-Sensor-50-50-media-text-container-850x850-3.jpg?auto=format&fit=clip&q=80&w=800&s=a21f8c4d8d297ae5364edc2266a80ce0",
    },
    {
      label: "Applications",
      title: "Versatile deployment options",
      description:
        "HALO Smart Sensor is designed for deployment across various environments including healthcare facilities, educational institutions, commercial buildings, and government facilities.",
      points: [
        {
          icon: <HiOutlineLightBulb size={60} className="text-xl" />,
          title: "Healthcare facilities",
          desc: "Monitor patient rooms, operating theaters, and medication storage areas while maintaining privacy compliance.",
        },
        {
          icon: <MdOutlineSecurity size={60} className="text-xl" />,
          title: "Educational institutions",
          desc: "Detect vaping in restrooms, monitor air quality in classrooms, and ensure student safety across campus facilities.",
        },
        {
          icon: <BiSupport size={60} className="text-xl" />,
          title: "Commercial spaces",
          desc: "Protect assets, monitor environmental conditions, and enhance security in offices, retail spaces, and industrial facilities.",
        },
      ],
      link: 'Explore applications',
      linkPath: "/contact",
      image:
        "https://pelco-891395695.imgix.net/50-50-module-images/HALO-Smart-Sensor-50-50-media-text-container-850x850-4.jpg?auto=format&fit=clip&q=80&w=800&s=a7f7730d84475982f470d0590688b4b7",
    },
  ];
  
  return (
    <>
     {/* Hero Section */}
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title="HALO Smart Sensor"
          subtitle="Advanced environmental monitoring and security detection in a single, privacy-compliant device for healthcare, education, and commercial facilities."
          image={bannerImage}
        />
      {/* Trusted By Section */}
      <TrustedBy />
      
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Content */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          All-in-one environmental and security monitoring
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          The HALO Smart Sensor combines advanced environmental monitoring with intelligent security detection to provide comprehensive facility protection while maintaining privacy compliance.
        </p>
      </div>
      
      <SecurityTabs tabs={securityTabs} />
      
      {/* Additional Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">
              <GiAwareness size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Environmental Monitoring</h3>
            <p className="text-gray-600">
              Monitor air quality, temperature, humidity, and other environmental factors that affect facility operations and occupant health.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">
              <MdOutlineWarningAmber size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Security Detection</h3>
            <p className="text-gray-600">
              Detect vaping, gunshots, fighting, and other security incidents with advanced sensor technology and AI-powered analytics.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">
              <PiShieldCheck size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Privacy Compliance</h3>
            <p className="text-gray-600">
              Monitor sensitive areas without audio or video recording, ensuring compliance with privacy regulations and HIPAA requirements.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HALOSmartSensor;
