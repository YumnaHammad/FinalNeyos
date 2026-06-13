import React from 'react'
import SolutionDetailLayout from '../../components/Solution/SolutionDetailLayout';
import { SolutionDetailSection } from '../../components/Solution/SolutionDetailLayout';

const HERO_IMAGE =
  'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1600';

const features = [
  {
    title: 'Intelligent climate control',
    description:
      'Automated HVAC scheduling based on occupancy, weather forecasts, and energy tariffs to maintain comfort while reducing waste.',
  },
  {
    title: 'Unified building dashboard',
    description:
      'Monitor temperature, humidity, air quality, and equipment health from a single operations view across campuses and facilities.',
  },
  {
    title: 'Predictive maintenance',
    description:
      'Sensor-driven alerts surface filter changes, compressor issues, and airflow anomalies before they impact occupants or uptime.',
  },
];

const Smart_HVAC_Management = () => {
  return (
    <SolutionDetailLayout
      title="Smart HVAC Management"
      subtitle="Optimize heating, ventilation, and air conditioning across your portfolio with IoT sensors, automation, and real-time analytics."
      image={HERO_IMAGE}
      badge="Smart Buildings"
    >
      <SolutionDetailSection
        title="Comfort, efficiency, and visibility—unified"
        lead="Nexyos Smart HVAC Management connects sensors, BMS integrations, and analytics so facilities teams can deliver healthier spaces at lower operating cost."
      >
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {features.map((feature) => (
            <div className="col" key={feature.title}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <h3 className="h5 fw-semibold mb-2">{feature.title}</h3>
                <p className="text-muted mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SolutionDetailSection>
    </SolutionDetailLayout>
  );
};

export default Smart_HVAC_Management;
