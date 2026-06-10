import React, { useState, useEffect } from "react";

const heroImage = "https://images.pexels.com/photos/1000623/pexels-photo-1000623.jpeg?auto=compress&cs=tinysrgb&w=1600";
const occupancyIcon = "https://raw.githubusercontent.com/feathericons/feather/master/icons/map-pin.svg";
const guidanceIcon = "https://raw.githubusercontent.com/feathericons/feather/master/icons/compass.svg";
const enforcementIcon = "https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg";
const analyticsImage = "https://images.pexels.com/photos/532001/pexels-photo-532001.jpeg?auto=compress&cs=tinysrgb&w=1600";
const curbsideImage = "https://images.pexels.com/photos/1886798/pexels-photo-1886798.jpeg?auto=compress&cs=tinysrgb&w=1600";
const transitImage = "https://images.pexels.com/photos/248539/pexels-photo-248539.jpeg?auto=compress&cs=tinysrgb&w=1600";
const controlImage = "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=1600";

const stats = [
  { label: "Spaces Digitized", value: "85K+", detail: "across smart cities, campuses, and retail hubs" },
  { label: "Manual Patrol Hours Saved", value: "62%", detail: "through automated enforcement workflows" },
  { label: "Driver Satisfaction", value: "4.7 ★", detail: "average rating across mobile and kiosk guidance" },
  { label: "Revenue Uplift", value: "28%", detail: "via demand-based pricing and improved turnover" },
];

const journeyLayers = [
  {
    icon: occupancyIcon,
    title: "Per-Bay Intelligence",
    description:
      "Multi-sensor fusion detects availability, overstays, and illegal parking with centimeter accuracy—even in low-light conditions.",
  },
  {
    icon: guidanceIcon,
    title: "Driver Journey Orchestration",
    description:
      "Coordinate reservations, wayfinding, loyalty perks, and EV readiness so every visit is seamless from arrival to exit.",
  },
  {
    icon: enforcementIcon,
    title: "Policy Automation Engine",
    description:
      "Codify complex rules and automatically trigger signage updates, alerts, or tickets. Keep turnover healthy with minimal manual effort.",
  },
];

const capabilityShowcase = [
  {
    heading: "Sensor Mesh & Digital Twin",
    text: "Blend AI cameras, LPR, radar, and magnetic sensors into a live digital twin of every bay. Integrate legacy assets without rip-and-replace.",
    image: analyticsImage,
  },
  {
    heading: "Experience Layer & Commerce",
    text: "Deliver branded mobile apps, kiosks, and dynamic signage that handle reservations, validations, and frictionless payments.",
    image: curbsideImage,
  },
  {
    heading: "Operations Command Studio",
    text: "Monitor occupancy heatmaps, enforcement queues, and compliance KPIs from a unified cockpit while orchestrating events in minutes.",
    image: transitImage,
  },
];

const integrationPartners = [
  "ANPR & LPR Platforms",
  "EV Charging Networks",
  "Building Access Control",
  "Municipal Payment Systems",
  "Transportation Hubs",
  "Urban Mobility APIs",
];

const useCases = [
  {
    title: "Mixed-Use & Retail",
    description:
      "Balance shopper, tenant, and delivery demand with dynamic allocation and loyalty-based prioritization across shared garages.",
    image: curbsideImage,
  },
  {
    title: "Transit & Mobility Hubs",
    description:
      "Coordinate park-and-ride, rideshare, and public transport zones with predictive scheduling and live insights that keep cities flowing.",
    image: transitImage,
  },
  {
    title: "Corporate & Campus",
    description:
      "Automate permit management, visitor allocations, and EV charger utilization across distributed facilities worldwide.",
    image: analyticsImage,
  },
];

const workflow = [
  {
    step: "Discover",
    description: "Assess current assets, mobility goals, and policy expectations. Design your data-driven digital twin.",
  },
  {
    step: "Deploy",
    description: "Roll out sensors, signage, and integrations using phased playbooks optimized for minimal disruption.",
  },
  {
    step: "Automate",
    description: "Configure pricing logic, routing rules, and enforcement triggers to eliminate manual interventions.",
  },
  {
    step: "Evolve",
    description: "Analyze trends, stakeholder feedback, and revenue impact to continuously refine operations.",
  },
];

const SmartParking = () => {
  const [section1Data, setSection1Data] = useState(null);
  const [section2Data, setSection2Data] = useState(null);
  const [section3Data, setSection3Data] = useState(null);
  const [section4Data, setSection4Data] = useState(null);

  const fetchSection1Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-parking/section-1"
      );
      const data = await response.json();
      setSection1Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 1 data:", error);
    }
  };

  const fetchSection2Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-parking/section-2"
      );
      const data = await response.json();
      setSection2Data(Array.isArray(data) ? data : data);
    } catch (error) {
      console.error("Error fetching section 2 data:", error);
    }
  };

  const fetchSection3Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-parking/section-3"
      );
      const data = await response.json();
      setSection3Data(Array.isArray(data) ? data : data);
    } catch (error) {
      console.error("Error fetching section 3 data:", error);
    }
  };

  const fetchSection4Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-parking/section-4"
      );
      const data = await response.json();
      setSection4Data(Array.isArray(data) ? data : data);
    } catch (error) {
      console.error("Error fetching section 4 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
    fetchSection2Data();
    fetchSection3Data();
    fetchSection4Data();
  }, []);

  return (
    <section className="solution-page overflow-hidden pt-5 pb-5 pb-lg-6">
      {/* Section 1 - Hero Section from API */}
      <header
        className="position-relative overflow-hidden mb-5"
        style={{
          backgroundImage: section1Data?.image
            ? `linear-gradient(115deg, rgba(6,72,116,0.9), rgba(0, 142, 160, 0.82)), url(${section1Data.image})`
            : `linear-gradient(115deg, rgba(6,72,116,0.9), rgba(0, 142, 160, 0.82)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 bottom-0 end-0 start-0 bg-dark bg-opacity-25" />
        <div className="container py-5 py-lg-6 position-relative text-white">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-7" data-aos="fade-right">
              <div className="d-inline-flex align-items-center gap-2 mb-3">
                <span className="badge bg-warning text-dark fw-semibold text-uppercase letter-spacing">Smart Parking</span>
                <span className="small text-white-75">Powered by Nexyos Mobility Cloud</span>
              </div>
              <h1 className="display-4 fw-bold mb-3 lh-sm">
                {section1Data?.heading || "Turn Every Parking Asset Into A Connected Mobility Hub"}
              </h1>
              <p className="lead text-white-75 mb-4">
                {section1Data?.description || "Nexyos Smart Parking synchronizes sensors, guidance, enforcement, and revenue intelligence so cities and enterprises can boost mobility, meet sustainability goals, and delight drivers."}
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#journey" className="btn btn-light text-uppercase fw-semibold px-4 shadow-sm">
                  Explore The Journey
                </a>
                <a href="/contact" className="btn btn-outline-light text-uppercase fw-semibold px-4">
                  Book A Mobility Audit
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 ms-xl-auto" data-aos="fade-left" data-aos-delay="120">
              <div className="p-4 rounded-4 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 shadow-lg">
                <h2 className="h5 text-white fw-semibold mb-3">Trusted By</h2>
                <div className="row row-cols-2 gy-3 text-white-75 small">
                  <div className="col">
                    <p className="mb-1">Smart cities</p>
                    <h3 className="h5 fw-bold text-white mb-0">28</h3>
                  </div>
                  <div className="col">
                    <p className="mb-1">Airports & hubs</p>
                    <h3 className="h5 fw-bold text-white mb-0">19</h3>
                  </div>
                  <div className="col">
                    <p className="mb-1">Retail campuses</p>
                    <h3 className="h5 fw-bold text-white mb-0">46</h3>
                  </div>
                  <div className="col">
                    <p className="mb-1">EV-ready facilities</p>
                    <h3 className="h5 fw-bold text-white mb-0">62%</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 2 - Stats Section from API */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" data-aos="fade-up">
            {section2Data && section2Data.length > 0 ? (
              section2Data.map((item, index) => (
                <div className="col" key={item.id || index}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 py-4 px-3 hover-lift bg-light-subtle">
                    <h3 className="display-6 fw-bold text-primary mb-2">
                      {item.value || item.heading || stats[index]?.value}
                    </h3>
                    <p className="fw-semibold text-muted mb-1">
                      {item.label || item.title || stats[index]?.label}
                    </p>
                    <p className="small text-secondary mb-0">
                      {item.detail || item.description || item.sub_heading || stats[index]?.detail}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              stats.map((item) => (
                <div className="col" key={item.label}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 py-4 px-3 hover-lift bg-light-subtle">
                    <h3 className="display-6 fw-bold text-primary mb-2">{item.value}</h3>
                    <p className="fw-semibold text-muted mb-1">{item.label}</p>
                    <p className="small text-secondary mb-0">{item.detail}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 3 - Journey/Capabilities Section from API */}
      <section id="journey" className="py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">
                {section3Data?.[0]?.heading || section3Data?.heading || "A Connected Journey From Bay To Balance Sheet"}
              </h2>
              <p className="text-muted mb-4">
                {section3Data?.[0]?.description || section3Data?.[0]?.paragraph || section3Data?.description || section3Data?.paragraph || "Each layer of Nexyos Smart Parking serves drivers, operations, and strategy teams simultaneously. Pick the modules you need now and expand at your own pace."}
              </p>
              <ul className="list-unstyled">
                {section3Data && Array.isArray(section3Data) && section3Data.length > 0 && section3Data[0].features ? (
                  section3Data[0].features.map((feature, index) => (
                    <li key={feature.id || index} className="mb-4 d-flex gap-3 align-items-start">
                      <div className="rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                        <img 
                          src={feature.icon || journeyLayers[index]?.icon} 
                          alt={feature.title || feature.heading} 
                          style={{ width: 30, height: 30 }} 
                        />
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold mb-1">{feature.title || feature.heading}</h3>
                        <p className="text-muted mb-0 small">{feature.description || feature.paragraph || feature.sub_heading}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  journeyLayers.map((feature) => (
                    <li key={feature.title} className="mb-4 d-flex gap-3 align-items-start">
                      <div className="rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                        <img src={feature.icon} alt={feature.title} style={{ width: 30, height: 30 }} />
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted mb-0 small">{feature.description}</p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="row g-4">
                {section3Data && Array.isArray(section3Data) && section3Data.length > 0 && section3Data[0].capabilities ? (
                  section3Data[0].capabilities.map((item, index) => (
                    <div className="col-12" key={item.id || index}>
                      <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-lift flex-lg-row flex-column">
                        <div className="ratio ratio-16x9 flex-lg-shrink-0 flex-grow-1" style={{ maxWidth: index % 2 === 0 ? "45%" : "55%" }}>
                          <img 
                            src={item.image || capabilityShowcase[index]?.image} 
                            alt={item.heading || item.title} 
                            className="w-100 h-100" 
                            style={{ objectFit: "cover" }} 
                          />
                        </div>
                        <div className="card-body p-4">
                          <h3 className="h5 fw-semibold mb-2">{item.heading || item.title}</h3>
                          <p className="text-muted mb-0">{item.text || item.description || item.paragraph}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  capabilityShowcase.map((item, index) => (
                    <div className="col-12" key={item.heading}>
                      <div className="card border-0 shadow-sm rounded-4 overflow-hidden hover-lift flex-lg-row flex-column">
                        <div className="ratio ratio-16x9 flex-lg-shrink-0 flex-grow-1" style={{ maxWidth: index % 2 === 0 ? "45%" : "55%" }}>
                          <img src={item.image} alt={item.heading} className="w-100 h-100" style={{ objectFit: "cover" }} />
                        </div>
                        <div className="card-body p-4">
                          <h3 className="h5 fw-semibold mb-2">{item.heading}</h3>
                          <p className="text-muted mb-0">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Integration & Use Cases from API */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">
                {section4Data?.[0]?.heading || section4Data?.heading || "Connect Every Parking & Mobility System"}
              </h2>
              <p className="text-muted mb-4">
                {section4Data?.[0]?.description || section4Data?.[0]?.paragraph || section4Data?.description || section4Data?.paragraph || "Nexyos integrates with the systems you already trust, delivering a single source of truth and closed-loop operations. Open APIs and ready-made connectors accelerate the path from pilot to portfolio-wide rollout."}
              </p>
              <div className="d-flex flex-wrap gap-2">
                {section4Data?.[0]?.partners && section4Data[0].partners.length > 0 ? (
                  section4Data[0].partners.map((partner, index) => (
                    <span key={index} className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-2">
                      {partner}
                    </span>
                  ))
                ) : section4Data?.partners && section4Data.partners.length > 0 ? (
                  section4Data.partners.map((partner, index) => (
                    <span key={index} className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-2">
                      {partner}
                    </span>
                  ))
                ) : (
                  integrationPartners.map((partner) => (
                    <span key={partner} className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-2">
                      {partner}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="rounded-4 overflow-hidden shadow-lg position-relative">
                <img 
                  src={section4Data?.[0]?.image || section4Data?.image || controlImage} 
                  alt={section4Data?.[0]?.heading || section4Data?.heading || "Smart parking control room"} 
                  className="w-100" 
                  style={{ maxHeight: 360, objectFit: "cover" }} 
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white px-4 py-3">
                  <p className="mb-0 small">
                    {section4Data?.[0]?.sub_heading || section4Data?.sub_heading || "Central dashboards, automated alerts, and analytics provide a unified command center for every mobility asset."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            {section4Data?.[0]?.use_cases_heading || section4Data?.use_cases_heading || "Where Nexyos Smart Parking Delivers"}
          </h2>
          <div className="row g-4">
            {section4Data?.[0]?.use_cases && section4Data[0].use_cases.length > 0 ? (
              section4Data[0].use_cases.map((useCase, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 80} key={useCase.id || index}>
                  <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 overflow-hidden hover-lift">
                    <div className="ratio ratio-16x9">
                      <img 
                        src={useCase.image || useCases[index]?.image} 
                        alt={useCase.title || useCase.heading} 
                        className="w-100 h-100" 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <h3 className="h5 fw-semibold text-white mb-2">{useCase.title || useCase.heading}</h3>
                      <p className="text-white-50 mb-0">{useCase.description || useCase.paragraph || useCase.sub_heading}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : section4Data?.use_cases && section4Data.use_cases.length > 0 ? (
              section4Data.use_cases.map((useCase, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 80} key={useCase.id || index}>
                  <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 overflow-hidden hover-lift">
                    <div className="ratio ratio-16x9">
                      <img 
                        src={useCase.image || useCases[index]?.image} 
                        alt={useCase.title || useCase.heading} 
                        className="w-100 h-100" 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <h3 className="h5 fw-semibold text-white mb-2">{useCase.title || useCase.heading}</h3>
                      <p className="text-white-50 mb-0">{useCase.description || useCase.paragraph || useCase.sub_heading}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              useCases.map((useCase, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 80} key={useCase.title}>
                  <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 overflow-hidden hover-lift">
                    <div className="ratio ratio-16x9">
                      <img src={useCase.image} alt={useCase.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <h3 className="h5 fw-semibold text-white mb-2">{useCase.title}</h3>
                      <p className="text-white-50 mb-0">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">From Discovery To Continuous Optimization</h2>
              <p className="text-muted mb-4">
                Our deployment playbook delivers measurable results fast—supporting pilots, rapid scale-up, and ongoing operations.
              </p>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {workflow.map((item, index) => (
                  <div className="col" key={item.step}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-3 hover-lift" data-aos="fade-up" data-aos-delay={index * 80}>
                      <div className="d-flex align-items-start gap-3">
                        <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: 46, height: 46 }}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="h6 fw-semibold mb-1">{item.step}</h3>
                          <p className="text-muted mb-0 small">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div
                className="card border-0 h-100 text-white rounded-4 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(10,89,144,0.95), rgba(20,173,173,0.85))",
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 className="h4 fw-semibold mb-3">Ready To Modernize Your Parking Network?</h3>
                    <p className="text-white-75 mb-4">
                      Nexyos consultants help evaluate current systems, design the right sensor mix, and deliver operating blueprints
                      tailored to your city or enterprise.
                    </p>
                    <ul className="text-white-75 list-unstyled mb-0">
                      <li className="mb-2">• Assessment workshops and ROI modeling</li>
                      <li className="mb-2">• Deployment accelerators with managed services</li>
                      <li>• Training, analytics, and optimization support</li>
                    </ul>
                  </div>
                  <div className="pt-4">
                    <a href="/contact" className="btn btn-light fw-semibold text-uppercase px-4">
                      Schedule A Consultation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SmartParking;