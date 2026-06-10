import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import '../../style/SecurityTabs.css'
import { Link } from "react-router-dom";

export default function SecurityTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full bg-white py-10">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-36 py-12 border rounded-2xl text-lg font-medium relative transition ${
              activeTab === index
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg shadow py-40 px-28 md:px-12 mt-16 flex flex-col md:flex-row gap-52">
        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-left">
            {tabs[activeTab].title}
          </h2>
          <p className="text-gray-700 mb-6 text-left text-sm">
            {tabs[activeTab].description}
          </p>
          <div className="space-y-6 mt-36">
            {tabs[activeTab].points.map((point, idx) => (
              <>
              <div key={idx} className="flex gap-4 mb-28">
                <div className="text-[#121535] me-14">{point.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-left">{point.title}</h3>
                  <p className="text-black text-left text-sm">{point.desc}</p>
                </div>
              </div></>
            ))}         
          </div>
          
          {/* Link Section */}
          {tabs[activeTab].link && tabs[activeTab].linkPath && (
            <Link   to={tabs[activeTab].linkPath} className="flex items-start mt-8 cursor-pointer group2 justify-items-start" style={{textDecoration: 'none'}}>
              <h5 className="text-lg font-medium mr-2 transition-all duration-300 group2-hover:text-blue-600 group2-hover:translate-x-1 SecurityTablink">
                {tabs[activeTab].link}
              </h5>
              <FaArrowRightLong className="text-sm ms-12 flex items-start transition-all duration-300 group2-hover:translate-x-2 group2-hover:text-blue-600 text-[#121535]" />
            </Link>
          )}
          
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={tabs[activeTab].image}
            alt={tabs[activeTab].title}
            className="rounded-lg shadow "
          />
        </div>
      </div>
    </div>
  );
}
