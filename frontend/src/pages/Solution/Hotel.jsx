import React from 'react'
import TrustedBy from '../../components/SpaceOccupancy/TrustedBy'
import SecurityTabs from '../../components/SpaceOccupancy/SecurityTabs'
import SmartWorkspace from '../../components/SpaceOccupancy/SmartWorkspace'
import HighlightsSection from '../../components/Solution/HighlightsSection'
import InterestedSection from '../../components/Solution/InterestedSection'
import retail_related_links from "../../assets/images/nexyos/retail_related_links.png";
import extrance from "../../assets/images/nexyos/extrance.jpg";
import Store1 from "../../assets/images/nexyos/Store1.jpg";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { PiSecurityCamera } from "react-icons/pi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsGraphUpArrow } from "react-icons/bs";
import { LuNewspaper } from "react-icons/lu";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrShieldSecurity } from "react-icons/gr";
import BannerSection from '../../components/BannerSection'

const Hotel = () => {

  const sensorHighlights = [
    {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/lorawan-and-poe-icon.png?t=1754899499415',
      title: "Multi-Transmission",
      description:
          "LoRaWAN®, Ethernet, Cellular, and Wi-Fi Halow transmission give easy access to different application requirements.",
  },
  {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/ai-icon.png?t=1754899499415',
      title: "Advanced Technologies",
      description:
          "Applying AI, ToF, PIR, thermopile, and radar technologies to enhance counting accuracy and people counters performance.",
  },
  {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/accuracy-icon.png?t=1754899499415',
      title: "Up to 99.8% Ultra-high Accuracy",
      description:
          "Increasing accuracy to 99.8% to satisfy application requirements.",
  },
  {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/privacy-detection-icon.png?t=1754899499415',
      title: "100% Anonymous Detection",
      description:
          "It is GDPR compliant with no personally identifiable information caught.",
  },
  {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/compatibility-icon.png?t=1754899499415',
      title: "Great Compatibility",
      description:
          "Our appliances easily connect with third-party platforms using open APIs and MQTT/HTTP(s), making integration with existing systems simple for customers.",
  },
  {
      image: 'https://www.milesight.com/static/pc/en/solution/people-counting/central-management-icon.png?t=1754899499415',
      title: "No Wiring, No Hassle",
      description:
          "Our wireless people counter requires no wiring, reducing installation costs and protecting heritage buildings while offering hassle-free and low-maintenance operation.",
  },
  ];

const data = [
  {
    title: "Entrance & Exit Management",
    description:
      "Advanced deep learning technology achieves an industry-leading algorithm effect to bring convenience to users",
    image: extrance,
  },
  {
    title: "Store",
    description:
      "Secure your store with high definition video evidence and quick emergency response",
    image: Store1,
  },
  {
    title: "Retail",
    description:
      "Caters to businesses that may vary in size but share the need for smarter operations, better security, and more insightful business",
    image: retail_related_links,
  },
];

const securityTabs = [
  {
    label: "Safer communities",
    title: "Improve visibility and security",
    description:
      "Enhance your video security for public safety with city security cameras that meet the needs of an evolving city environment while fostering future growth opportunities.",
    points: [
      {
        icon: <HiOutlineExclamationTriangle size={60}  className="text-xl" />,
        title: "Prevent crime",
        desc: "Real-time alerts and video analytics help you detect threats, identify suspicious activity and respond.",
      },
      {
        icon: <PiSecurityCamera size={60} className="text-xl" />,
        title: "Cover more areas",
        desc: "From fixed, PTZ and panoramic, our street security cameras cover wide areas and provide clear video 24/7.",
      },
      {
        icon: <TiWeatherPartlySunny size={60} className="text-xl" />,
        title: " Protect your investments",
        desc: "Our public security cameras are designed to withstand extreme temperatures, harsh weather and tampering.",
      },
    ],
      link: 'Connect with an expert ',
      linkPath: "/contact",
    image:
      "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-1.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=800&q=80&w=800&s=662a0baa601ea6c0a7969a3681319d2b", 
  },
  {
    label: "Real-time responsiveness",
    title: "Take action when it’s needed most",
    description:
      "Our city surveillance camera system is designed to assist city agencies, support responses in both man-made and natural disasters and encourage collaboration between private and public agencies.",
    points: [
      {
        icon: <BsGraphUpArrow size={60} className="text-xl" />,
        title: "Gain real-time insights",
        desc: "Stay focused on critical tasks and effective responses with reports that can provide timely information.",
      },
      {
        icon: <LuNewspaper size={60} className="text-xl" />,
        title: "Proactively detect threats",
        desc: "Real-time alerts enable citywide surveillance teams to detect threats and guide responses.",
      },
       {
        icon: <LiaShippingFastSolid size={60} className="text-xl" />,
        title: " Respond faster",
        desc: "City camera systems with Pelco Smart Analytics accurately detect objects and critical events.",
      },
    ],
      link: 'Connect with an expert ',
      linkPath: "/contact",
    image:
      "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-2.jpg?auto=format&fit=clip&q=80&w=800&s=f4c336d73a87badf3cb5f09cd08fc6c8",

  },
  {
    label: "Flexible and trusted",
    title: "Elevated systems through integration",
    description:
      "Centralize data from video security for public safety as well as third-party public surveillance cameras, physical security systems and other solutions to deliver citywide situational awareness.",
    points: [
      {
        icon: <FaBalanceScaleLeft size={60} className="text-xl" />,
        title: "Scale your security",
        desc: "Integration with other IT and town video surveillance systems allows easy expansion as cities grow.",
      },
      {
        icon: <RiSecurePaymentLine  size={60} className="text-xl" />,
        title: "Secure your streets",
        desc: "Obtain data by linking license plate monitoring, detection and recognition to find cars and individuals.",
      },
            {
        icon: <GrShieldSecurity  size={60} className="text-xl" />,
        title: "Compliant solutions",
        desc: "Our street security camera systems are trusted globally and meet regulatory requirements, including NDAA",
      },
    ],
      link: 'Connect with an expert ',
      linkPath: "/contact",
    image:
      "https://pelco-566282893.imgix.net/50-50-module-images/Safe-Cities-50-50-media-text-container-850x850-3.jpg?auto=format&fit=clip&q=80&w=800&s=e4647adb37edc98768ff0a28b08f8756",
  },
];


  return (
    <div>
     {/* Hero Section */}
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title="Smart People Counting Solution for Different Applications"
          subtitle="The Reliable People Counter Makes Decisions Smart"
          image='https://www.milesight.com/static/pc/en/solution/people-counting/occupancy-and-people-counting-solution.jpg?t=1754899499415'
        />

<TrustedBy/>
<SecurityTabs tabs={securityTabs}/>
<SmartWorkspace/>
<HighlightsSection
        title="Highlights of Milesight People Counting Sensors"
        highlights={sensorHighlights}
      />
<InterestedSection sectionTitle="You may also be interested in" items={data}/>
    </div>
  )
}

export default Hotel
