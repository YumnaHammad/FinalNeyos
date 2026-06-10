import React, { useState, useEffect } from 'react';
import '../../style/Solution.css';
import Tab from '../../components/Solution/TrafficTab/Tab';
import HotProductSlider from '../../components/Solution/OutstandingFeatures/HotProductSlider';
import Contact from '../../components/Contact';
import { FiDownload } from 'react-icons/fi';
import Features from '../../components/Solution/Features/Features';
import TrafficFunctionsAndScenarios from '../../components/TrafficFunctionsAndScenarios';
import SolutionVideo from '../../components/SolutionVideo';
import SBI_education from '../../assets/images/Solution/SBI-education.jpg';
import healthcare_banner from '../../assets/images/Solution/healthcare-banner.jpg';
import SBI_energy from '../../assets/images/Solution/SBI-energy.jpg';
import pub_transport_banner from '../../assets/images/Solution/pub-transport-banner.jpg';
import manfacturing_banner from '../../assets/images/Solution/manfacturing_banner.jpg';
import logistics from '../../assets/images/Solution/logistics.jpg';
import for_stores from '../../assets/images/Solution/solution-for-stores.jpg';
import urban_roadways from '../../assets/images/Solution/solution-for-urban-roadways.jpg';
import for_offices from '../../assets/images/Solution/solution-for-offices.jpg';
import for_factories from '../../assets/images/Solution/solution-for-factories.jpg';
import classroom_hub from '../../assets/images/Solution/solution-for-classroom-hub.jpg';
import car_dealerships from '../../assets/images/Solution/solution-for-car-dealerships.jpg';
import bus_stop from '../../assets/images/Solution/solution-for-bus-stop.jpg';
import SBS_Apartment from '../../assets/images/Solution/SBS-Apartment.jpg';
import Speed_Measurement from '../../assets/images/Solution/Function-_Speed-Measurement.svg';
import Violation_Detection from '../../assets/images/Solution/Function-_Violation-Detection.svg';
import Vehicle_Information_Collection from '../../assets/images/Solution/Function-_Vehicle-Information-Collection.svg';
import Incident_Detection from '../../assets/images/Solution/Function-_Incident-Detection.svg';
import Portable_Enforcement from '../../assets/images/Solution/Function-_Portable-Enforcement.svg';
import Perimeter_Protection from '../../assets/images/Solution/Function-_Perimeter-Protection.svg';
import Function_Attendance from '../../assets/images/Solution/Function-_Attendance.svg';
import Access_Control from '../../assets/images/Solution/Function-_Access-Control.svg';
import People_Counting from '../../assets/images/Solution/Function-_People-Counting.svg';
import E_E_Management from '../../assets/images/Solution/Function-_E&E-Management.svg';
import Visitor_Management from '../../assets/images/Solution/Function-_Visitor-Management.svg';
import line_haul from '../../assets/images/Solution/SBF-line-haul.svg';
import Radar_Sensor_based_Care from '../../assets/images/Solution/Radar-Sensor-based-Care.png';
import GNSS_Vehicle_Trajectory from '../../assets/images/Solution/GNSS-Vehicle-Trajectory-Mgmt.-icon.png';
import onboard_passenger_counting from '../../assets/images/Solution/onboard-passenger-counting-icon.png';
import Advanced_Driving_Assistance from '../../assets/images/Solution/Advanced-Driving-Assistance.png';
import { Subtitles } from 'lucide-react';
import BannerSection from '../../components/BannerSection';

const Solution = () => {
  const [activeTab, setActiveTab] = useState("");
  const [activeTabContent, setActiveTabContent] = useState("education");
  const [activeIndustryTab, setActiveIndustryTab] = useState("education");
  const [activeCategory, setActiveCategory] = useState("All");

  const downloads = [
    { title: 'Supported Regions List' },
    { title: 'White Paper: Intelligent Traffic Camera' },
    { title: 'Troubleshooting ANPR Solution' },
    { title: 'Brochure: Milesight Intelligent Traffic Camera' },
  ];

  const tabs = [
    { id: "industry", label: "Solutions by Industry" },
    { id: "scenario", label: "Solutions by Scenario" },
    { id: "function", label: "Solutions by Function" },
  ];

  const Industrytabs = [
    { id: "education", label: "Education", image: SBI_education, Subtitle: "Empower better education", buttons: ["Education"], },
    { id: "energy", label: "Energy", image: SBI_energy, Subtitle: "Improving safety, productivity, and sustainability", buttons: ["Oil & Gas", "Mining", "Power & Utilities"], },
    { id: "healthcare", label: "Healthcare", image: healthcare_banner, Subtitle: "Securing smarter Healthcare", buttons: ["Hospitals"], },
    { id: "logistics", label: "Logistics", image: logistics, Subtitle: "Reducing risks, increasing efficiency", buttons: ["Logistics"], },
    { id: "manufacturing", label: "Manufacturing", image: manfacturing_banner, Subtitle: "Manufacturing a safer and smarter future", buttons: ["Manufacturing Plants", "Chemical Industry", "Vehicle Manufacturing", "Electronics Manufacturing", "Food Processing"], },
    { id: "public-transport", label: "Public Transport", image: pub_transport_banner, Subtitle: "The intelligent route to transportation safety and efficiency", buttons: ["Transit Bus"], },
  ];


  const scenarios = [
    {
      title: "Apartments",
      img: SBS_Apartment,
    },
    {
      title: "Factories",
      img: for_factories,
    },
    {
      title: "Classroom Hub",
      img: classroom_hub,
    },
    {
      title: "Urban Roadways",
      img: urban_roadways,
    },
    {
      title: "Offices",
      img: for_offices,
    },
    {
      title: "Stores",
      img: for_stores,
    },
    {
      title: "Bus Stop",
      img: bus_stop,
    },
    {
      title: "Car Dealerships",
      img: car_dealerships,
    },
  ];

  const successStories = [
    {
      title: "Nexyos Protects Pupils Going to School in Dubai",
      description:
        "100 school buses for the Dubai-Sharjah-Ajman’s National Charity School equipped with Hikvision CCTV cameras to Get pupils safely to and from their schools",
    },
    {
      title:
        "Keeping students safe at Western India campuses",
      description:
        "The Government of Gujarat Directorate of Technical Education (DTE) use Hikvision cameras to protect and administer education facilities and services across Western India.",
    },
    {
      title:
        "Nexyos and Forward-Thinking protect India's Uka Tarsadia University",
      description:
        "Nexyos's assistance was enlisted to secure Uka Tarsadia University's newer Maliba Campus in India. This solution was notable for a number of reasons.",
    },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const section = document.getElementById(tabId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Scroll detection for main tab activation
  useEffect(() => {
    const sections = tabs.map(t => document.getElementById(t.id));
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // offset for fixed header
      let current = "";
      sections.forEach((sec, index) => {
        if (sec && scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          current = tabs[index].id;
        }
      });
      setActiveTab(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const categories = [
    "All",
    "General",
    "Education",
    "Logistics",
    "Traffic",
    "Energy",
    "Retail",
    "Healthcare",
    "Public Transport"
  ];

  const functionCards = [
    {
      id: 1,
      title: "Speed Measurement",
      category: ["All", "Traffic"],
      icon: Speed_Measurement
    },
    {
      id: 2,
      title: "Violation Detection",
      category: ["All", "Traffic"],
      icon: Violation_Detection
    },
    {
      id: 3,
      title: "Vehicle Information Detection",
      category: ["All", "Traffic"],
      icon: Vehicle_Information_Collection
    },
    {
      id: 4,
      title: "Incident Detection",
      category: ["All", "Traffic"],
      icon: Incident_Detection
    },
    {
      id: 5,
      title: "Portable Enforcement",
      category: ["All", "General", "Traffic"],
      icon: Portable_Enforcement
    },
    {
      id: 6,
      title: "Perimeter Protection",
      category: ["All", "General", "Education", "Logistics", "Energy"],
      icon: Perimeter_Protection
    },
    {
      id: 7,
      title: "Time Attendance",
      category: ["All", "General", "Logistics", "Energy"],
      icon: Function_Attendance
    },
    {
      id: 8,
      title: "Access Control",
      category: ["All", "General", "Education", "Logistics", "Energy", "Retail"],
      icon: Access_Control
    },
    {
      id: 9,
      title: "People Counting",
      category: ["All", "General", "Retail"],
      icon: People_Counting
    },
    {
      id: 10,
      title: "Entrance & Exit Management",
      category: ["All", "General", "Education", "Logistics", "Energy", "Retail"],
      icon: E_E_Management
    },
    {
      id: 11,
      title: "Visitor Management",
      category: ["All", "General", "Education", "Logistics", "Energy"],
      icon: Visitor_Management
    },
    {
      id: 12,
      title: "Line Haul Management",
      category: ["All", "Logistics"],
      icon: line_haul
    },
    {
      id: 13,
      title: "Radar Sensor-based Care",
      category: ["All", "Healthcare"],
      icon: Radar_Sensor_based_Care
    },
    {
      id: 14,
      title: "Advanced Driving Assistance",
      category: ["All", "Public Transport"],
      icon: Advanced_Driving_Assistance
    },
    {
      id: 15,
      title: "Onboard Passenger Counting",
      category: ["All", "Public Transport"],
      icon: onboard_passenger_counting
    },
    {
      id: 16,
      title: "GNSS Vehicle Trajectory Management",
      category: ["All", "Public Transport"],
      icon: GNSS_Vehicle_Trajectory
    }
  ];

  return (
    <div>
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title="Powering Smart Surveillance"
          subtitle="Explore how cutting-edge AI and IoT solutions transform security landscapes globally."
          image="https://static.vecteezy.com/system/resources/previews/011/389/863/mp4/moving-cars-on-the-motorway-during-sunset-busy-traffic-on-a-freeway-or-highway-top-view-of-the-road-the-golden-rays-of-the-evening-sun-illuminate-the-transport-ukraine-kyiv-october-3-2021-free-video.mp4"
        />
      {/* Tabs with scroll */}
      <div className="fixed top-[74px] bg-white z-100 w-full" >
        <div className="flex gap-6 px-4 py-3 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative text-gray-800 font-medium focus:outline-none"
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-600 rounded"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ROAD TRAFFIC MANAGEMENT */}
      <Tab />

      {/* SAFETY & EFFICIENCY */}
      <div className='container mb-60 p-0 md:pt-10 flex justify-center items-center flex-col'>
        <h5>For Better Road Safety & Efficient Traffic Management</h5>
        <div className=" text-justify">
          <p className="text-sm">
            With the growth of urban and rural populations, as well as the increasing number of vehicles on the roads, traffic congestion, accidents, and parking issues are constantly on the rise, presenting new challenges to traffic management agencies. Milesight is delighted to introduce our Intelligent Traffic Solution. We integrate powerful, high-quality cameras with back-end software, elevating intelligent traffic management to a new level with exceptional imagery and advanced AI-powered ANPR technology, ensuring road traffic safety and efficient traffic management.
          </p>
        </div>
      </div>

      {/* Industry Tab Content */}
      <section className="max-w-7xl mx-auto px-20 py-12" id="industry">
        <h2 className="text-4xl font-bold text-center mb-4" id="industry">Solutions by Industry</h2>
        <div className='ps-16 py-24'>
          <p className="text-left text-lg text-black mb-10">
            Tailored to meet varied needs
          </p>
          <p className="text-left text-black">
            Covering a wide range of industries – from traffic to shipping, from
            retail to healthcare and beyond – our solutions are built on solid
            ground.
          </p>
        </div>

        {/* Scrollable Tabs */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6 min-w-max px-2 border-b border-gray-300 justify-center">
            {Industrytabs.map((tab) => {
              const isActive = activeIndustryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveIndustryTab(tab.id);
                  }}
                  className={`IndustryTabButton relative py-12 px-28 text-base whitespace-nowrap font-medium transition-all duration-300 ${isActive
                    ? "active "
                    : "text-black"
                    }`}
                  style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Image Section with Overlay */}
        <div className="relative mt-10 h-[400px] w-full rounded-xl overflow-hidden ">
          {Industrytabs.filter(tab => tab.id === activeIndustryTab).map((tab) => (
            <div key={tab.id} className="relative h-full w-full">
              <img
                src={tab.image}
                alt={tab.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center ps-52">
                <h3 className="text-white text-4xl md:text-5xl font-bold mb-4 text-left">
                  {tab.label}
                </h3>
                <p className="text-white text-lg mb-6 text-left">{tab.Subtitle}</p>
                <h5 className="text-white text-2xl md:text-3xl font-semibold mb-4 text-left">
                  Related solutions:
                </h5>
                <div className="flex flex-wrap gap-4">
                  {tab.buttons.map((btnLabel, idx) => (
                    <button
                      key={idx}
                      className="border border-white text-white px-20 py-4 rounded-full hover:bg-white hover:text-black transition"
                      style={{ borderRadius: "15px" }}
                    >
                      {btnLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}</div>
        {/* Success Stories */}

        <div className="relative h-full w-full py-10 px-4 md:px-8 lg:px-16 bg-white">
          <h2 className="text-2xl font-bold mb-8 py-12 text-left">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-gray-100 py-44 px-40 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-bold text-lg mb-3 text-left">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed text-left mt-5">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Scenario Tab Content */}
      <section className="px-20 py-12 bg-white" id="scenario">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Solutions by Scenario
        </h2>
        <div className='mt-24 ps-16'>
          <p className="text-black font-extrabold mb-4 text-left">
            Focused on each business process
          </p>
          <p className="text-left text-black  mb-12">
            Each industry consists of a finite number of scenarios. We believe that
            the key to the success of an entire solution is its ability to meet the
            requirements and challenges in each scenario. That's why we keep digging
            into the basic needs and untapped demands scenario by scenario, and
            direct our best engineering to offer dedicated solutions there.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {scenarios.map((item, index) => (
              <div key={index} className="text-center">
                <div class="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                  <img
                    src={item.img}
                    alt={item.title}
                    class="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                    style={{ borderRadius: '0px', height: "13rem" }} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Function Tab Content */}
      <section className="w-full max-w-screen-xl mx-auto px-20 py-12" id="function">
        <h2 className="text-4xl font-bold text-center mb-4">
          Solutions by Function
        </h2>
        <div className="mt-52 text-left ps-16">
          <p className="text-lg text-left mb-8 font-semibold text-black">
            Designed to resolve everyday issues
          </p>
          <p className="text-left text-black max-w-4xl mb-10">
            Taking a building-block approach, we create functional applications
            based on common technologies. As solutions in their smallest units, each
            functional application is designed to solve a particular problem. In
            accordance with the complexity of requirements, customers have the
            flexibility to combine functional applications on demand.
          </p>
          {/* --- Tabs UI --- */}
          <div className="border-b border-gray-200 dark:border-neutral-700">
            <nav
              className={`Functionnav flex gap-x-1 transform translate-x-0 ${categories.length > 6
                  ? "overflow-x-auto whitespace-nowrap px-4"
                  : "justify-center"
                }`}
              role="tablist"
              aria-label="Function Tabs"
            >
              {categories.map((cat, index) => (
                <button
                  key={index}
                  type="button"
                  className={`FuctionButton px-28 py-12 whitespace-nowrap ${activeCategory === cat ? "active" : "text-black"
                    }`}
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-controls={`tab-panel-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>
          {/* --- Tab Content Panels --- */}
          <div className="grid gap-64 mt-28 grid-cols-3 sm:grid-cols-2 lg:grid-cols-6">
            {functionCards
              .filter(card => activeCategory === "All" || card.category.includes(activeCategory))
              .map(card => (
                <div key={card.id} className=''>
                  <div
                    className="flex flex-col items-center bg-white rounded-xl py-28 shadow-[2px_6px_10px_0px_rgba(0,_0,_0,_0.1)] hover:shadow-[11px_13px_10px_0px_rgba(0,_0,_0,_0.1)]"
                  >
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-52 object-contain mb-4"
                    />
                  </div>
                  <h3 className="text-sm mt-10 text-gray-800 text-center">
                    {card.title}
                  </h3></div>
              ))}
          </div>

        </div>
      </section>
      {/* HOT PRODUCTS */}
      <HotProductSlider />

      {/* OUTSTANDING FEATURES */}
      <div className='OutStanding_features'>
        <h2 className="text-4xl font-bold lg:my-28 my-16">Outstanding Features</h2>
        <Features />
      </div>

      {/* TRAFFIC FUNCTIONS & SCENARIOS */}
      <TrafficFunctionsAndScenarios />

      {/* Videos */}
      <SolutionVideo />

      {/* DOWNLOADS */}
      <div className="bg-gray-100 py-40">
        <h2 className="text-4xl font-bold text-center mb-20">Downloads</h2>

        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-8 px-6">
          {downloads.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 bg-white rounded-xl shadow px-6 py-6"
            >
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <img
                  src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/downloads.png?t=1751621798627"
                  alt="PDF Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <p className="text-gray-800 font-semibold text-sm sm:text-base mb-2 sm:mb-0">
                  {item.title}
                </p>
                <button className="flex items-center gap-2 text-[#00667C] font-medium text-sm hover:underline">
                  <FiDownload size={20} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contact />
    </div>
  );
};

export default Solution;
