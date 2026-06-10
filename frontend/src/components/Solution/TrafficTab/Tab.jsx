import React, { useState } from "react";
import { MdOutlineTraffic, MdOutlineLocalParking } from "react-icons/md";
import { TbBarrierBlock } from "react-icons/tb";
import '../../../style/Solution.css';
import { FaRoad } from "react-icons/fa";
import { GiDoorHandle } from "react-icons/gi";
const tabs = [
  {
    label: "Road Traffic Management",
    icon: <FaRoad size={28} />,
    title: "Road Traffic Management",
    subtitle: "Intelligent Cameras for Road Traffic Monitoring",
    bullets: [
      "AI-powered LPR & Vehicle Attributes Recognition",
      "High Speed Capture with Great Details",
      "Real-time Speed Measurement",
      "Precise License Plate Recognition",
      "Traffic Flow Analysis",
      "Traffic Violation Detection for Road Traffic Monitoring",
    ],
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/road-traffic-management.jpg?t=1751621798627",
  },
  {
    label: "Entrance & Exit Management",
    icon: <GiDoorHandle size={28} />,
    title: "Entrance & Exit Management",
    subtitle: "Leave Safety and Efficiency in Good Hands",
    bullets: [
      "AI-powered LPR & Vehicle Attributes Recognition",
      "Superior Image in Challenging Light Condition",
      "Black/White List Alarm & No-plate Vehicle Detection",
      "Wiegand Protocol for Access Control System",
      "Standalone Solution with built-in SD Card",
    ],
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/entrance-and-exit-management.jpg?t=1751621798627",
  },
  {
    label: "Parking Management",
    icon: <MdOutlineLocalParking size={28} />,
    title: "Parking Management",
    subtitle:
      "Lead the Intelligent Way of Indoor & Outdoor Parking Management",
    bullets: [
      "Indoor Parking Guidance with Customizable Indicator",
      "Occupancy Detection Up to 100 Parking Spaces",
      "AI LPR Parking Detection Up to 4 Parking Spaces",
      "Flexible Parking Detection Configuration",
      "Seamless Integration with Third-party VMS",
    ],
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/parking-management.jpg?t=1751621798627",
  },
];

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <div className="Tab_container px-20 py-60 md:my-76 ">
      <div className="flex justify-center">
        <div className="bg-white rounded-xl border p-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-[95%] lg:w-[80%] mb-20">
          <div className="text-left p-20 md:ms-30 py-16 ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1" data-aos="fade-right">
              {current.title}
            </h2>
            <h6 className="text-sm mb-4">{current.subtitle}</h6>
            <ul className="tablist text-gray-600 space-y-1">
              {current.bullets.map((item, idx) => (
                <li className="text-sm" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <img
              src={current.image}
              alt={current.label}
              className="TrafficTab w-full object-cover rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>


      <div className="flex justify-center mt-8 bg-gray-100 p-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            onMouseEnter={() => setActiveTab(index)}
            className={`tab-button  flex md:flex-row flex-col justify-center  items-center px-5 py-3 rounded-xl transition-all duration-200 shadow-sm border
              ${activeTab === index
                ? "bg-white text-blue-600"
                : ""
              }`}
          >
            <div className="bg-[#00667C] text-white rounded-4xl px-9 py-9 me-8">{tab.icon}</div>
            <span className={`text-sm font-medium mt-1 text-center  ${activeTab === index
                ? "text-[#00667C]"
                : ""
              }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
