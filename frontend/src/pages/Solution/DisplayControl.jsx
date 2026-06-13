import React, { useState, useEffect } from "react";
import SolutionDetailLayout from "../../components/Solution/SolutionDetailLayout";
import { getSolutionMeta } from "../../utils/getSolutionMeta";
import heroImage from "../../assets/images/nexyos/CCTVSurveillanceCamerasBg.jpg";
import featureUnifiedIcon from "../../assets/images/icon/cloudwhite.png";
import featureAutomationIcon from "../../assets/images/icon/AI.png";
import featureResilienceIcon from "../../assets/images/icon/POE.png";
import layoutImage from "../../assets/images/nexyos/panaromic.png";
import collaborationImage from "../../assets/images/nexyos/Store1.jpg";
import insightsImage from "../../assets/images/nexyos/Protect_your_customers.png";
import operationsImage from "../../assets/images/nexyos/Recorders and Video Management Systems.jpg";
import smartCityImage from "../../assets/images/Solution/solution-for-urban-roadways.jpg";
import enterpriseImage from "../../assets/images/Solution/solution-for-offices.jpg";
import controlRoomImage from "../../assets/images/Solution/solution-for-factories.jpg";

const META = getSolutionMeta("/solution/displayControl");

const stats = [
  { label: "Mission Critical Sites", value: "1200+", color: "text-warning" },
  { label: "Average Response Time Improvement", value: "34%", color: "text-info" },
  { label: "Integrations & APIs", value: "60+", color: "text-success" },
];

const featureHighlights = [
  {
    title: "Unified Command Center",
    description:
      "Aggregate live camera feeds, sensors, and analytics dashboards into configurable video walls and operator workspaces.",
    icon: featureUnifiedIcon,
  },
  {
    title: "Context-Aware Automation",
    description:
      "Trigger automated layouts and alerts when incidents, occupancy spikes, or scheduled events occur.",
    icon: featureAutomationIcon,
  },
  {
    title: "Edge-to-Cloud Resilience",
    description:
      "Ensure reliable operations with redundant nodes, smart failover, and encrypted remote access for distributed teams.",
    icon: featureResilienceIcon,
  },
];

const capabilityBlocks = [
  {
    title: "Dynamic Layout Engine",
    subtitle: "Design any command room",
    description:
      "Drag and drop feeds, apps, and KPIs onto video walls, create saved presets for shift change, and sync layouts across distributed teams instantly.",
    bullets: [
      "Scale from single consoles to immersive multi-surface command centers.",
      "Preview and publish screen arrangements without interrupting live monitoring.",
      "Embed SCADA, mapping, and analytics widgets alongside camera streams.",
    ],
    image: layoutImage,
  },
  {
    title: "Real-Time Collaboration",
    subtitle: "Connect operators everywhere",
    description:
      "Operators share incidents, annotate video, and escalate with built-in collaboration tools while keeping sensitive evidence secure.",
    bullets: [
      "Automated alert routing to security, facilities, or emergency response teams.",
      "Red team / blue team workflows for training and after-action reviews.",
      "Native integrations with Teams, Slack, and email for quick distribution.",
    ],
    image: collaborationImage,
  },
  {
    title: "Intelligent Insights",
    subtitle: "Decisions backed by data",
    description:
      "AI and analytics surface anomalies, predict maintenance windows, and present contextual overlays to guide every response.",
    bullets: [
      "Adaptive dashboards that react to weather, occupancy, and sensor thresholds.",
      "Time-series reporting to prove compliance and document incidents.",
      "Export-ready insights for executive briefings and board updates.",
    ],
    image: insightsImage,
  },
];

const integrationPartners = [
  "Milestone XProtect",
  "Genetec Security Center",
  "Nexyos Video Surveillance",
  "SCADA & BMS Platforms",
  "Smart HVAC & Lighting",
  "Emergency Notification Systems",
];

const useCases = [
  {
    title: "Critical Infrastructure",
    description:
      "Monitor substations, pipelines, energy grids, and utilities with consolidated situational awareness and automated risk alerts.",
    image: operationsImage,
  },
  {
    title: "Smart City Operations",
    description:
      "Coordinate traffic, public safety, and environmental data across agencies while keeping citizens informed in real time.",
    image: smartCityImage,
  },
  {
    title: "Campus & Enterprise",
    description:
      "Unify security, facilities, IT, and emergency response into a single action framework for multi-site organizations.",
    image: enterpriseImage,
  },
];

const workflow = [
  {
    title: "Assess",
    description: "Ingest sensors, VMS, third-party data, and operator notes into a unified timeline.",
  },
  {
    title: "Decide",
    description: "AI-driven playbooks highlight next steps while escalation paths trigger automatically.",
  },
  {
    title: "Act",
    description: "Automate signage, notify teams, and sync video wall presets within seconds.",
  },
  {
    title: "Review",
    description: "Generate incident summaries, KPIs, and evidence packages for continuous improvement.",
  },
];

const DisplayControl = () => {
  const [section1Data, setSection1Data] = useState(null);
  const [section2Data, setSection2Data] = useState(null);
  const [section3Data, setSection3Data] = useState(null);
  const [section4Data, setSection4Data] = useState(null);
  const [section5Data, setSection5Data] = useState(null);
  const [section6Data, setSection6Data] = useState(null);

  const fetchSection1Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/display-control/section-1"
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
        "https://nexyos.deeptech.pk/api/display-control/section-2"
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
        "https://nexyos.deeptech.pk/api/display-control/section-3"
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
        "https://nexyos.deeptech.pk/api/display-control/section-4"
      );
      const data = await response.json();
      setSection4Data(Array.isArray(data) ? data : data);
    } catch (error) {
      console.error("Error fetching section 4 data:", error);
    }
  };

  const fetchSection5Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/display-control/section-5"
      );
      const data = await response.json();
      setSection5Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 5 data:", error);
    }
  };

  const fetchSection6Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/display-control/section-6"
      );
      const data = await response.json();
      setSection6Data(Array.isArray(data) ? data : data);
    } catch (error) {
      console.error("Error fetching section 6 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
    fetchSection2Data();
    fetchSection3Data();
    fetchSection4Data();
    fetchSection5Data();
    fetchSection6Data();
  }, []);

  return (
    <SolutionDetailLayout
      title={section1Data?.heading || "Command Rooms That Think Ahead Of Every Incident"}
      shortTitle={META.label}
      relatedGroupId="smart"
      subtitle={
        section1Data?.description ||
        "Nexyos Display & Control orchestrates mission-critical environments with a 360° view of video, IoT, analytics, and workflows—in a single pane optimized for fast, confident decisions."
      }
      image={section1Data?.image || heroImage || META.heroImage}
      badge={META.groupTitle}
      actions={
        <>
          <a href="#capabilities" className="solution-detail__btn solution-detail__btn--primary">
            Explore Capabilities
          </a>
          <a href="/sales-inquiry" className="solution-detail__btn solution-detail__btn--ghost">
            Book A Live Demo
          </a>
        </>
      }
    >
      {/* Section 2 - Stats Section from API */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4" data-aos="fade-up">
            {section2Data && section2Data.length > 0 ? (
              section2Data.map((item, index) => (
                <div className="col-md-4" key={item.id || index}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 text-center py-4 px-3 hover-lift">
                    <div className={`display-5 fw-bold ${item.color || stats[index]?.color || "text-primary"}`}>
                      {item.value || item.heading}
                    </div>
                    <p className="text-muted mb-0">{item.label || item.description || item.sub_heading}</p>
                  </div>
                </div>
              ))
            ) : (
              stats.map((item) => (
                <div className="col-md-4" key={item.label}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 text-center py-4 px-3 hover-lift">
                    <div className={`display-5 fw-bold ${item.color}`}>{item.value}</div>
                    <p className="text-muted mb-0">{item.label}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 3 - Feature Highlights from API */}
      <section className="pb-5 pb-lg-6">
        <div className="container">
          <div className="row g-4">
            {section3Data && section3Data.length > 0 ? (
              section3Data.map((feature, index) => (
                <div className="col-md-4" data-aos="fade-up" data-aos-delay={index * 80} key={feature.id || index}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 position-relative overflow-hidden hover-lift">
                    <div className="position-absolute top-0 start-0 end-0 h-100 bg-gradient-primary opacity-0 transition-opacity" />
                    <div className="card-body p-4 text-center position-relative">
                      <div
                        className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                        style={{ width: 72, height: 72 }}
                      >
                        {feature.icon ? (
                          <img src={feature.icon} alt={feature.title || feature.heading} style={{ width: 40, height: 40 }} />
                        ) : (
                          <img src={featureHighlights[index]?.icon || featureUnifiedIcon} alt={feature.title || feature.heading} style={{ width: 40, height: 40 }} />
                        )}
                      </div>
                      <h3 className="h5 fw-semibold mb-2">{feature.title || feature.heading}</h3>
                      <p className="text-muted mb-0">{feature.description || feature.paragraph || feature.sub_heading}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featureHighlights.map((feature, index) => (
                <div className="col-md-4" data-aos="fade-up" data-aos-delay={index * 80} key={feature.title}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 position-relative overflow-hidden hover-lift">
                    <div className="position-absolute top-0 start-0 end-0 h-100 bg-gradient-primary opacity-0 transition-opacity" />
                    <div className="card-body p-4 text-center position-relative">
                      <div
                        className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                        style={{ width: 72, height: 72 }}
                      >
                        <img src={feature.icon} alt={feature.title} style={{ width: 40, height: 40 }} />
                      </div>
                      <h3 className="h5 fw-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted mb-0">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 4 - Capabilities from API */}
      <section id="capabilities" className="bg-light py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-3" data-aos="fade-up">
            {section4Data?.[0]?.heading || "Everything A Modern Command Center Needs"}
          </h2>
          <p className="text-center text-muted mb-5" data-aos="fade-up" data-aos-delay="80">
            {section4Data?.[0]?.description || section4Data?.[0]?.paragraph || "Combine live video, telemetry, geospatial intelligence, and response workflows in one adaptive environment."}
          </p>
          <div className="row g-4">
            {section4Data && section4Data.length > 0 ? (
              section4Data.map((block, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 100} key={block.id || index}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift">
                    <div className="ratio ratio-16x9">
                      <img 
                        src={block.image || capabilityBlocks[index]?.image} 
                        alt={block.title || block.heading} 
                        className="w-100 h-100" 
                        style={{ objectFit: "cover" }} 
                      />
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      {block.subtitle && (
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2">{block.subtitle}</span>
                      )}
                      <h3 className="h5 fw-semibold mb-2">{block.title || block.heading}</h3>
                      <p className="text-muted mb-3">{block.description || block.paragraph || block.sub_heading}</p>
                      {block.bullets && block.bullets.length > 0 && (
                        <ul className="text-muted mb-0 ps-3 small">
                          {block.bullets.map((bullet, idx) => (
                            <li className="mb-2" key={idx}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              capabilityBlocks.map((block, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={index * 100} key={block.title}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-lift">
                    <div className="ratio ratio-16x9">
                      <img src={block.image} alt={block.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="card-body p-4 d-flex flex-column">
                      <span className="badge bg-primary bg-opacity-10 text-primary mb-2">{block.subtitle}</span>
                      <h3 className="h5 fw-semibold mb-2">{block.title}</h3>
                      <p className="text-muted mb-3">{block.description}</p>
                      <ul className="text-muted mb-0 ps-3 small">
                        {block.bullets.map((bullet) => (
                          <li className="mb-2" key={bullet}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 5 - Integration Section from API */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6" data-aos="fade-right">
            <h2 className="h3 fw-bold mb-3">
              {section5Data?.heading || "Connect Your Entire Technology Stack"}
            </h2>
            <p className="text-muted mb-4">
              {section5Data?.description || section5Data?.paragraph || "Nexyos Display & Control is vendor-agnostic and API-first. Integrate legacy VMS, next-gen AI analytics, building management systems, and public safety platforms with ready-made connectors and open standards."}
            </p>
            <div className="d-flex flex-wrap gap-2">
              {section5Data?.partners && section5Data.partners.length > 0 ? (
                section5Data.partners.map((partner, index) => (
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
                  src={section5Data?.image || controlRoomImage} 
                  alt={section5Data?.heading || "Control room overview"} 
                  className="w-100" 
                  style={{ maxHeight: 360, objectFit: "cover" }} 
                />
                <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white px-4 py-3">
                  <p className="mb-0 small">
                    {section5Data?.sub_heading || "Unified dashboards, live alerts, and automation rules keep teams synchronized even across distributed locations."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Use Cases from API */}
      <section className="bg-dark text-white py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            {section6Data?.[0]?.heading || "Where Nexyos Display & Control Delivers"}
          </h2>
          <div className="row g-4">
            {section6Data && section6Data.length > 0 ? (
              section6Data.map((useCase, index) => (
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
            <h2 className="h3 fw-bold mb-3">Incident To Insight In Four Steps</h2>
            <p className="text-muted mb-4">
              Our operational workflow keeps every stakeholder aligned—from first alert through post-event analysis.
            </p>
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {workflow.map((step, index) => (
                <div className="col" key={step.title}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-3 hover-lift" data-aos="fade-up" data-aos-delay={index * 70}>
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: 46, height: 46 }}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold mb-1">{step.title}</h3>
                        <p className="text-muted mb-0 small">{step.description}</p>
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
                  background: "linear-gradient(135deg, rgba(12,92,160,0.95), rgba(40,180,170,0.85))",
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 className="h4 fw-semibold mb-3">Accelerate Deployment With Nexyos Experts</h3>
                    <p className="text-white-75 mb-4">
                      From control room design to integration and training, our professional services team brings certified experience
                      delivering complex command environments around the globe.
                    </p>
                    <ul className="text-white-75 list-unstyled mb-0">
                      <li className="mb-2">• Rapid deployment packs and on-site commissioning</li>
                      <li className="mb-2">• 24/7 monitoring, patching, and health diagnostics</li>
                      <li>• Governance, compliance, and cyber-hardening best practices</li>
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
    </SolutionDetailLayout>
  );
};

export default DisplayControl;
