import React, { useState,forwardRef } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

const applications = [
  {
    key: "office",
    title: "Office Utilization",
    description:
      "To better understand office occupancy based on extensive data collected, the sensor can discover both the most and less frequently used areas to optimize the layout, making the office more occupant-friendly and further improving resource allocation.",
    position: { top: "52%", left: "60%" },
  },
  {
    key: "meeting",
    title: "Meeting Room Occupancy",
    description: "Based on real-time occupancy data, meeting room sensors enable efficient space utilization and booking management by detecting presence in meeting, conference, or collaborative spaces, supporting last-minute scheduling. They identify reserved but unused rooms and auto-release them to improve room availability. Additionally, they offer detailed occupancy analytics for a true understanding of space usage.",
    position: { top: "23%", left: "35%" },
  },
  {
    key: "cubicle",
    title: "Cubicle Detection",
    description: "The hybrid workplace model provides employees with greater flexibility. By leveraging the performance of PIR and ToF, the solution can update occupancy status immediately for better flow management and higher facility efficiency.",
    position: { top: "40%", left: "19%" },
  },
  {
    key: "workstation",
    title: "Workstation Detection",
    description: "With the help of the solution, any desk or seat is under control. The status of being occupied or vacant is clear to administrative staff. No extra efforts are needed for complicated counting and statistics management.",
    position: { top: "20%", left: "70%" },
  },
];

const TypicalApplications = forwardRef((props, ref) => {
  const [activeKey, setActiveKey] = useState("office");

  const activeApp = applications.find((a) => a.key === activeKey);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white px-8 py-16"
    style={{
  backgroundImage: `url('https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/background.jpg?t=1752224588823')`,
}}
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row items-start gap-12 mt-48">
        {/* Left List */}
        <div className="flex-1 max-w-lg justify-center">
          <h2 className="text-4xl font-semibold mb-6 text-white"  data-aos="fade-right">Typical Applications</h2>
<div className="ApplicationTab mt-48">
          {applications.map((app) => (
            <div key={app.key} className="mb-4">
              <div
                onClick={() => setActiveKey(app.key)}
                className={`flex justify-between items-center cursor-pointer py-2 transition-all ${
                  activeKey === app.key ? "text-white" : "text-gray-300"
                }`}
              >
                <h3 className="text-xl font-semibold text-white"  data-aos="fade-right">{app.title}</h3>
                <button
                  className={`m-0 px-4 py-4 flex items-center justify-center  ApplicationTabArrow ${
                    activeKey === app.key ? "ApplicationTabArrowActive" : ""
                  }`}
                >
                  {activeKey === app.key ? (<FiArrowDownRight className="ApplicationTabArrowDownRight" color="#00667C" size={18}/> ):( <GoArrowUpRight className='ApplicationTabArrowUpRight' color="white" size={18}/>)}
                </button>
              </div>

              {/* Only Office Utilization shows description */}
              {activeKey === app.key && app.description && (
                <div className="bg-[#0d2e56] text-left  px-12 py-12 rounded-md text-xs leading-relaxed text-blue-100">
                  {app.description}
                </div>
              )}
            </div>
          ))}</div>
        </div>

        {/* Right Image & Labels */}
        <div className="relative flex-1">
          <img
            src="https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/office-utilization.png?t=1752224588823"
            alt="3D Office"
            className="rounded-lg w-full object-contain"
          />

          {/* Render all markers */}
          {applications.map((app) => (
            <div
              key={app.key}
              className="absolute z-10"
              style={{
                top: app.position.top,
                left: app.position.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className={`md:text-sm px-12 py-1 transition-all Markers ${
                  activeKey === app.key
                    ? "active"
                    : ""
                }`}
              >
                {app.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default TypicalApplications;