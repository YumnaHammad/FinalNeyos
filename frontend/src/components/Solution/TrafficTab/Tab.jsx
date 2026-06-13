import React, { useState } from 'react';
import { FaRoad } from 'react-icons/fa';
import { GiDoorHandle } from 'react-icons/gi';
import { MdOutlineLocalParking } from 'react-icons/md';
import '../../../styles/Solutions.css';

const tabs = [
  {
    label: 'Road Traffic Management',
    icon: <FaRoad size={18} />,
    title: 'Road Traffic Management',
    subtitle: 'Intelligent Cameras for Road Traffic Monitoring',
    bullets: [
      'AI-powered LPR & Vehicle Attributes Recognition',
      'High Speed Capture with Great Details',
      'Real-time Speed Measurement',
      'Precise License Plate Recognition',
      'Traffic Flow Analysis',
      'Traffic Violation Detection',
    ],
    image:
      'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/road-traffic-management.jpg?t=1751621798627',
  },
  {
    label: 'Entrance & Exit Management',
    icon: <GiDoorHandle size={18} />,
    title: 'Entrance & Exit Management',
    subtitle: 'Leave Safety and Efficiency in Good Hands',
    bullets: [
      'AI-powered LPR & Vehicle Attributes Recognition',
      'Superior Image in Challenging Light Conditions',
      'Black/White List Alarm & No-plate Detection',
      'Wiegand Protocol for Access Control',
      'Standalone Solution with built-in SD Card',
    ],
    image:
      'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/entrance-and-exit-management.jpg?t=1751621798627',
  },
  {
    label: 'Parking Management',
    icon: <MdOutlineLocalParking size={18} />,
    title: 'Parking Management',
    subtitle: 'Lead the Intelligent Way of Indoor & Outdoor Parking',
    bullets: [
      'Indoor Parking Guidance with Customizable Indicator',
      'Occupancy Detection Up to 100 Spaces',
      'AI LPR Parking Detection Up to 4 Spaces',
      'Flexible Parking Detection Configuration',
      'Seamless Integration with Third-party VMS',
    ],
    image:
      'https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/parking-management.jpg?t=1751621798627',
  },
];

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <div className="solutions-traffic">
      <div className="solutions-traffic__content">
        <div>
          <h2 className="solutions-traffic__title">{current.title}</h2>
          <p className="solutions-traffic__subtitle">{current.subtitle}</p>
          <ul className="solutions-traffic__bullets">
            {current.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <img src={current.image} alt={current.title} className="solutions-traffic__image" />
      </div>
      <div className="solutions-traffic__tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActiveTab(index)}
            onMouseEnter={() => setActiveTab(index)}
            className={`solutions-traffic__tab ${activeTab === index ? 'solutions-traffic__tab--active' : ''}`}
          >
            <span className="solutions-traffic__tab-icon">{tab.icon}</span>
            <span className="solutions-traffic__tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
