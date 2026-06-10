import React, { useRef, useState, useEffect } from "react";
import TypicalApplications from "./TypicalApplications";
import IntegratedPlatforms from "./IntegratedPlatforms";
import SmartWorkspace from "./SmartWorkspace";
import FeatureProducts from "./FeatureProductsSlider";
import HighlightSlider from "../HighlightSlider";

const FeatureTiles = () => {
  const overviewRef = useRef(null);
  const applicationRef = useRef(null);
  const highlightRef = useRef(null);
  const benefitRef = useRef(null);
  const productsRef = useRef(null);
  const successRef = useRef(null);

  const [activeTab, setActiveTab] = useState("");

  const tabs = [
    { name: "Space Occupancy", key: "overview", ref: overviewRef },
    { name: "Typical Application", key: "application", ref: applicationRef },
    { name: "Highlight", key: "highlight", ref: highlightRef },
    { name: "Benefit", key: "benefit", ref: benefitRef },
    { name: "Products", key: "products", ref: productsRef },
    { name: "Success Story", key: "success", ref: successRef },
  ];
const cards = [
  {
    id: 1,
    name: "Flexible LoRaWAN® and PoE Versions",
    description:
      "Alternative LoRaWAN® and Ethernet transmission give easy access to different application requirements.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/lorawan-and-poe-icon.png?t=1752826692624",
  },
  {
      id: 2,
    name: "Versatile People Counting Technology for Diverse Scenarios",
    description:
      "Applying AI, PIR, and ToF recognition technologies tailored to different application needs",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/ai-tof-and-pir-icon.png?t=1752826692624",
  },
  {
      id: 3,
    name: "Up to 99.8% Ultra-high Accuracy",
    description:
      "Increasing accuracy to 99.8% with AI and ToF technologies.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/accuracy-icon.png?t=1752826692624",
  },
  {
      id: 4,
    name: "100% Anonymous Detection",
    description:
      "Being GDPR-compliant, no PII is involved with the help of privacy-featured technologies and LoRaWAN® transmission.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/anonymous-detection-icon.png?t=1752826692624",
  },
  {
      id: 5,
    name: "Staff Detection and Adults/Children Differentiation",
    description:
      "Giving direct access to recognize specific categories of individuals including staff detection and adults/children differentiation.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/staff-detection-and-adults-and-children-differentiation.png?t=1752826692624",
  },
    {
      id: 6,
    name: "Bi-Directional Smart People Counting",
    description:
      "Bi-Directional people counting with smart U-turn filtering to improve accuracy and performance.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/bi-directional-people-counting-and-smart-u-turn.png?t=1752826692624",
  },
    {
      id: 7,
    name: "Large Detection Area",
    description:
      "Covering a wide area of 78 square meters.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/large-detection-area.png?t=1752826692624",
  },
    {
      id: 8,
    name: "Milesight D2D Communication",
    description:
      "Allow for easily communicate between Milesight LoRaWAN® devices within 1 second.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/milesight-d2d-communication.png?t=1752826692624",
  },
    {
      id: 9,
    name: "Great Compatibility",
    description:
      "The strong scalable capacity unlocks the potential of the premises.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/compatibility-icon.png?t=1752826692624",
  },
];
  const scrollToSection = (ref, tabName) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(tabName); // for instant highlight on click
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // triggers when section is centered
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries.find((entry) => entry.isIntersecting);

      if (visibleSection) {
        const matchedTab = tabs.find(tab => tab.ref.current === visibleSection.target);
        if (matchedTab) {
          setActiveTab(matchedTab.key);
        }
      }

      // when scrolled above all
      const allAbove = entries.every((entry) => entry.boundingClientRect.top > 0);
      if (allAbove) {
        setActiveTab("");
      }
    }, options);

    tabs.forEach((tab) => {
      if (tab.ref.current) {
        observer.observe(tab.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      {/* Sticky Navigation */}
      <div className="Featuresnavlink bg-white flex flex-wrap  shadow-sm text-sm font-medium ">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`featurestab md:px-12 ${
              activeTab === tab.key ? "bg-[#00667C] text-white" : "text-black"
            }`}
          >
            <button
              onClick={() => scrollToSection(tab.ref, tab.key)}
              className="md:px-12 my-6 featuresbutton"
            >
              {tab.name}
            </button>
          </div>
        ))}
        
      </div>

      {/* Sections */}
      <section ref={overviewRef} className="text-center px-6 py-16 mt-36">
        <h1 className="text-3xl md:text-4xl font-bold mb-18"  data-aos="fade-right">
          Monitoring Meeting Room, Desk, and Other Workspace Occupancy
        </h1>
        <p className="max-w-4xl text-xs mx-auto text-gray-700 mb-4">
          Space occupancy measures how many people use a given area—a key priority for facility managers...
        </p>
        <p className="max-w-4xl text-xs mx-auto text-gray-700">
          Milesight provides IoT-enabled devices deployed in conference rooms...
        </p>
        <div className="mt-12 flex justify-center">
          <img
            src="http://milesight.com/static/pc/en/solution/smart-space-occupancy/space-occupancy-solution-topology.png?t=1752224588823"
            alt="Space Occupancy Diagram"
            className="max-w-5xl w-full rounded-md shadow-md"
          />
        </div>
      </section>

      <TypicalApplications ref={applicationRef} />
        <HighlightSlider title="Superior Highlights" items={cards} ref={highlightRef}/>
      <IntegratedPlatforms ref={benefitRef} />
      <SmartWorkspace ref={productsRef}/>
      <FeatureProducts  ref={successRef} />
    </div>
  );
};

export default FeatureTiles;
