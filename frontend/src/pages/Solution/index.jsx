import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../../styles/Solutions.css';
import Tab from '../../components/Solution/TrafficTab/Tab';
import HotProductSlider from '../../components/Solution/OutstandingFeatures/HotProductSlider';
import Contact from '../../components/Contact';
import { FiDownload } from 'react-icons/fi';
import Features from '../../components/Solution/Features/Features';
import TrafficFunctionsAndScenarios from '../../components/TrafficFunctionsAndScenarios';
import SolutionVideo from '../../components/SolutionVideo';
import SolutionsHero from '../../components/Solution/SolutionsHero';
import { solutionNavGroups, solutionStickyTabs } from '../../config/solutionNav';

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

const Solution = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [activeIndustryTab, setActiveIndustryTab] = useState('education');
  const [activeCategory, setActiveCategory] = useState('All');

  const downloads = [
    { title: 'Supported Regions List' },
    { title: 'White Paper: Intelligent Traffic Camera' },
    { title: 'Troubleshooting ANPR Solution' },
    { title: 'Brochure: Intelligent Traffic Camera' },
  ];

  const industryTabs = [
    { id: 'education', label: 'Education', image: SBI_education, subtitle: 'Empower better education', path: '/solution/Education', links: [{ label: 'Education', path: '/solution/Education' }] },
    { id: 'energy', label: 'Energy', image: SBI_energy, subtitle: 'Improving safety, productivity, and sustainability', path: '/solution/EnergyEfficiency', links: [{ label: 'Energy Efficiency', path: '/solution/EnergyEfficiency' }] },
    { id: 'healthcare', label: 'Healthcare', image: healthcare_banner, subtitle: 'Securing smarter healthcare', path: '/solution/healthcare', links: [{ label: 'Healthcare', path: '/solution/healthcare' }] },
    { id: 'logistics', label: 'Logistics', image: logistics, subtitle: 'Reducing risks, increasing efficiency', path: '/solution/smartParking', links: [{ label: 'Smart Parking', path: '/solution/smartParking' }] },
    { id: 'manufacturing', label: 'Manufacturing', image: manfacturing_banner, subtitle: 'Manufacturing a safer and smarter future', path: '/solution/Manufacturing', links: [{ label: 'Manufacturing', path: '/solution/Manufacturing' }] },
    { id: 'public-transport', label: 'Public Transport', image: pub_transport_banner, subtitle: 'Intelligent route to transportation safety', path: '/solution/IntelligentTrafficSolution', links: [{ label: 'Intelligent Traffic', path: '/solution/IntelligentTrafficSolution' }] },
  ];

  const scenarios = [
    { title: 'Apartments', img: SBS_Apartment },
    { title: 'Factories', img: for_factories },
    { title: 'Classroom Hub', img: classroom_hub },
    { title: 'Urban Roadways', img: urban_roadways },
    { title: 'Offices', img: for_offices },
    { title: 'Stores', img: for_stores },
    { title: 'Bus Stop', img: bus_stop },
    { title: 'Car Dealerships', img: car_dealerships },
  ];

  const successStories = [
    { title: 'Nexyos Protects Pupils Going to School in Dubai', description: '100 school buses equipped with CCTV cameras to get pupils safely to and from school.' },
    { title: 'Keeping students safe at Western India campuses', description: 'Government of Gujarat DTE uses Nexyos cameras to protect education facilities across Western India.' },
    { title: "Nexyos protects India's Uka Tarsadia University", description: "Securing Uka Tarsadia University's Maliba Campus with forward-thinking security infrastructure." },
  ];

  const categories = ['All', 'General', 'Education', 'Logistics', 'Traffic', 'Energy', 'Retail', 'Healthcare', 'Public Transport'];

  const functionCards = [
    { id: 1, title: 'Speed Measurement', category: ['All', 'Traffic'], icon: Speed_Measurement },
    { id: 2, title: 'Violation Detection', category: ['All', 'Traffic'], icon: Violation_Detection },
    { id: 3, title: 'Vehicle Information Detection', category: ['All', 'Traffic'], icon: Vehicle_Information_Collection },
    { id: 4, title: 'Incident Detection', category: ['All', 'Traffic'], icon: Incident_Detection },
    { id: 5, title: 'Portable Enforcement', category: ['All', 'General', 'Traffic'], icon: Portable_Enforcement },
    { id: 6, title: 'Perimeter Protection', category: ['All', 'General', 'Education', 'Logistics', 'Energy'], icon: Perimeter_Protection },
    { id: 7, title: 'Time Attendance', category: ['All', 'General', 'Logistics', 'Energy'], icon: Function_Attendance },
    { id: 8, title: 'Access Control', category: ['All', 'General', 'Education', 'Logistics', 'Energy', 'Retail'], icon: Access_Control },
    { id: 9, title: 'People Counting', category: ['All', 'General', 'Retail'], icon: People_Counting },
    { id: 10, title: 'Entrance & Exit Management', category: ['All', 'General', 'Education', 'Logistics', 'Energy', 'Retail'], icon: E_E_Management },
    { id: 11, title: 'Visitor Management', category: ['All', 'General', 'Education', 'Logistics', 'Energy'], icon: Visitor_Management },
    { id: 12, title: 'Line Haul Management', category: ['All', 'Logistics'], icon: line_haul },
    { id: 13, title: 'Radar Sensor-based Care', category: ['All', 'Healthcare'], icon: Radar_Sensor_based_Care },
    { id: 14, title: 'Advanced Driving Assistance', category: ['All', 'Public Transport'], icon: Advanced_Driving_Assistance },
    { id: 15, title: 'Onboard Passenger Counting', category: ['All', 'Public Transport'], icon: onboard_passenger_counting },
    { id: 16, title: 'GNSS Vehicle Trajectory', category: ['All', 'Public Transport'], icon: GNSS_Vehicle_Trajectory },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const section = document.getElementById(tabId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sectionIds = solutionStickyTabs.map((t) => t.id);
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) current = id;
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndustry = industryTabs.find((t) => t.id === activeIndustryTab) || industryTabs[0];

  return (
    <div className="solutions-page">
      <SolutionsHero />

      <nav className="solutions-sticky-nav">
        <div className="solutions-sticky-nav__inner">
          {solutionStickyTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`solutions-sticky-nav__tab ${activeTab === tab.id ? 'solutions-sticky-nav__tab--active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <section className="solutions-section" id="featured">
        <h2 className="solutions-section__title">Explore Our Solutions</h2>
        <p className="solutions-section__lead">
          From video surveillance to smart buildings and intelligent traffic — discover purpose-built
          solutions for every environment.
        </p>
        <div className="solutions-featured-grid">
          {solutionNavGroups.flatMap((group) =>
            group.items.map((item) => (
              <Link key={item.path} to={item.path} className="solutions-card">
                <div className="solutions-card__body">
                  <p className="solutions-card__tag">{group.title}</p>
                  <h3 className="solutions-card__title">{item.label}</h3>
                  <p className="solutions-card__desc">{item.desc}</p>
                  <span className="solutions-card__cta">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <Tab />
        </div>
        <p className="solutions-section__lead" style={{ marginTop: '2rem', marginBottom: 0 }}>
          Intelligent traffic cameras with AI-powered ANPR technology for safer roads and efficient
          traffic management.
        </p>
      </section>

      <section className="solutions-section" id="industry" style={{ background: '#fff' }}>
        <h2 className="solutions-section__title">Solutions by Industry</h2>
        <p className="solutions-section__lead">
          Tailored to meet varied needs — from traffic to healthcare, retail, and beyond.
        </p>
        <div className="solutions-industry-tabs">
          {industryTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveIndustryTab(tab.id)}
              className={`solutions-industry-tab ${activeIndustryTab === tab.id ? 'solutions-industry-tab--active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="solutions-industry-hero">
          <img src={activeIndustry.image} alt={activeIndustry.label} />
          <div className="solutions-industry-hero__overlay">
            <h3>{activeIndustry.label}</h3>
            <p>{activeIndustry.subtitle}</p>
            <div className="solutions-industry-hero__links">
              {activeIndustry.links.map((link) => (
                <Link key={link.path} to={link.path} className="solutions-industry-hero__link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '2.5rem 0 1rem', color: '#0f172a' }}>
          Success Stories
        </h3>
        <div className="solutions-stories-grid">
          {successStories.map((story) => (
            <article key={story.title} className="solutions-story-card">
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="solutions-section" id="scenario">
        <h2 className="solutions-section__title">Solutions by Scenario</h2>
        <p className="solutions-section__lead">
          Focused on each business process — dedicated solutions for every scenario.
        </p>
        <div className="solutions-scenario-grid">
          {scenarios.map((item) => (
            <div key={item.title} className="solutions-scenario-card">
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="solutions-section" id="function" style={{ background: '#fff' }}>
        <h2 className="solutions-section__title">Solutions by Function</h2>
        <p className="solutions-section__lead">
          Building-block applications designed to solve particular problems — combine on demand.
        </p>
        <div className="solutions-function-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`solutions-function-filter ${activeCategory === cat ? 'solutions-function-filter--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="solutions-function-grid">
          {functionCards
            .filter((card) => activeCategory === 'All' || card.category.includes(activeCategory))
            .map((card) => (
              <div key={card.id} className="solutions-function-item">
                <div className="solutions-function-item__icon">
                  <img src={card.icon} alt="" />
                </div>
                <p>{card.title}</p>
              </div>
            ))}
        </div>
      </section>

      <HotProductSlider />

      <div className="solutions-section" style={{ paddingTop: '2rem' }}>
        <h2 className="solutions-section__title">Outstanding Features</h2>
        <Features />
      </div>

      <TrafficFunctionsAndScenarios />
      <SolutionVideo />

      <div className="solutions-section" style={{ background: '#f1f5f9' }}>
        <h2 className="solutions-section__title">Downloads</h2>
        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {downloads.map((item) => (
            <div key={item.title} className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 px-5 py-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg">
                <FiDownload size={20} className="text-[#006071]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
                <button type="button" className="text-xs font-bold text-[#006071] mt-1 hover:underline">
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
