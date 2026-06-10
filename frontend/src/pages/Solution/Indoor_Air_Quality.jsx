import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Indoor_Air_Quality.scss";

const defaultHeroImage =
  "https://images.pexels.com/photos/4792492/pexels-photo-4792492.jpeg?auto=compress&cs=tinysrgb&w=1600";

const sensors = [
  {
    name: "Wellness Beacons",
    desc: "Compact, aesthetic sensors capture CO₂, TVOCs, particulates, humidity, and sound to monitor wellbeing.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/airplay.svg",
  },
  {
    name: "Environmental Gateways",
    desc: "Edge gateways aggregate data from BMS, HVAC, lighting, and occupancy for a single source of truth.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/cloud.svg",
  },
  {
    name: "Responder Automations",
    desc: "Automated playbooks adjust ventilation, trigger cleaning, and inform occupants when thresholds are breached.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/refresh-cw.svg",
  },
];

const healthImpacts = [
  {
    label: "CO₂ Exposure",
    value: "<800 ppm",
    detail: "Supports cognitive function and minimizes drowsiness in classrooms and meeting rooms.",
  },
  {
    label: "Particulate Matter",
    value: "↓ 63%",
    detail: "High-efficiency filtration with proactive maintenance reduces allergens and pollutants.",
  },
  {
    label: "Ventilation Effectiveness",
    value: "+45%",
    detail: "Dynamic ventilation and purging strategies protect high-density spaces throughout the day.",
  },
];

const habitats = [
  {
    title: "Workplace & Commercial",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600",
    points: [
      "Integrate IAQ insights with hot-desking, room booking, and WELL certification initiatives.",
      "Provide employees with transparency dashboards, wellness notifications, and comfort controls.",
    ],
  },
  {
    title: "Education & Healthcare",
    image: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=1600",
    points: [
      "Monitor sensitive spaces—labs, clinics, classrooms—for pathogens, VOC spikes, and humidity thresholds.",
      "Execute rapid response workflows for cleaning staff and facility managers when anomalies occur.",
    ],
  },
  {
    title: "Hospitality & Residential",
    image: "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=1600",
    points: [
      "Deliver guest-facing wellness experiences via mobile apps, digital signage, and voice assistants.",
      "Integrate with smart HVAC, window control, and scent diffusion for curated atmospheres.",
    ],
  },
];

const programSteps = [
  {
    title: "Assess",
    text: "Audit IAQ goals, regulatory requirements, and existing BMS/IoT assets. Define KPIs for wellbeing, energy, and sustainability.",
  },
  {
    title: "Instrument",
    text: "Deploy sensors and integrate BMS data. Establish baselines, occupancy profiles, and automated alerting thresholds.",
  },
  {
    title: "Act",
    text: "Enable automated ventilation, filtration, UV, and cleaning workflows. Share insights with occupants in real time.",
  },
  {
    title: "Improve",
    text: "Leverage analytics to optimize energy use, maintenance cycles, and occupant experience across the portfolio.",
  },
];

const Indoor_Air_Quality = () => {
  const [header, setHeader] = useState({ image: defaultHeroImage, heading: "", desc: "" });
  const [sensorsHeader, setSensorsHeader] = useState([]);
  const [sensorsList, setSensorsList] = useState(sensors);
  const [healthImpactsList, setHealthImpactsList] = useState(healthImpacts);
  const [habitatsList, setHabitatsList] = useState(habitats);
  const [habitatsLeftData, setHabitatsLeftData] = useState({ heading: "IAQ For Every Habitat", desc: "Organizations use Nexyos to achieve healthy buildings across their entire portfolio—from high-rise offices to classrooms and hospitality suites.", created_at: "", updated_at: "" });
  const [programStepsList, setProgramStepsList] = useState(programSteps);
  const [partnerData, setPartnerData] = useState({
    heading: "Partner With Nexyos For Healthier Buildings",
    desc: "Our wellness strategists, building engineers, and analytics teams help you move from reactive compliance to proactive occupant experience.",
    bullets: [
      "Comprehensive IAQ strategy, roadmap, and ROI modeling.",
      "BMS integration, commissioning, and managed wellness operations.",
      "Occupant engagement programs, ESG reporting, and continuous improvement coaching.",
    ],
    created_at: "2025-11-28T06:52:26.000000Z",
    updated_at: "2025-12-12T10:58:49.000000Z",
  });

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-1")
      .then((res) => {
        const data = res.data;
        const item = Array.isArray(data) ? data[0] : data || {};
        const image = item.image || item.img || item.image_url || item.src || defaultHeroImage;
        const heading = item.heading || item.Heading || item.head || item.title || "Indoor Air Quality";
        const desc = item.desc || item.description || item.body || "";
        setHeader({ image, heading, desc });
      })
      .catch((err) => {
        console.error("Error fetching IAQ header:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-2")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSensorsList(
          data.map((item, i) => ({
            id: item.id || item._id || i,
            name: item.heading || item.title || item.name || "Sensor",
            desc: item.description || item.desc || item.body || "",
            icon: item.image || item.icon || item.image_url || null,
          }))
        );
    })
    .catch((err) => {
      console.error("Error fetching sensors:", err);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-3")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length) {
          setHealthImpactsList(
            data.map((item, i) => ({
              label: item.counting|| `Impact ${i + 1}`,
              value: item.heading || "",
              detail: item.description || "",
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching health impacts:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-4-right-side")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length) {
          setHabitatsList(
            data.map((item, i) => ({
              title: item.title || item.heading || item.name || `Habitat ${i + 1}`,
              image: item.image || item.img || item.image_url || "",
              points: Array.isArray(item.points) ? item.points : item.description ? [item.description] : [],
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching habitats:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-4-left-side")
      .then((res) => {
        const data = res.data;
        const item = Array.isArray(data) ? data[0] : data || {};
        console.log('section-4-left-side item:', item);
        const heading = item.heading || item.title || item.name || "IAQ For Every Habitat";
        const desc = item.description || item.desc || item.body || "Organizations use Nexyos to achieve healthy buildings across their entire portfolio—from high-rise offices to classrooms and hospitality suites.";
        setHabitatsLeftData({
          heading,
          desc,
          created_at: item.created_at || item.createdAt || item.created || "",
          updated_at: item.updated_at || item.updatedAt || item.updated || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching habitats left data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-5")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length) {
          setProgramStepsList(
            data.map((item, i) => ({
              title: item.title || item.heading || item.name || `Step ${i + 1}`,
              text: item.description || item.desc || item.text || item.body || "",
            }))
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching program steps:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/air-quality/section-6")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const item = data.length ? data[0] : res.data || {};
        const heading = item.heading || item.title || item.name || partnerData.heading;
        const desc = item.description || item.desc || item.body || partnerData.desc;
        let bullets = [];
        if (Array.isArray(item.points) && item.points.length) bullets = item.points;
        else if (Array.isArray(item.bullets) && item.bullets.length) bullets = item.bullets;
        else if (Array.isArray(item.list) && item.list.length) bullets = item.list;
        else if (item.items && Array.isArray(item.items)) bullets = item.items;
        else if (item.description && !desc) bullets = [item.description];

        setPartnerData({ heading, desc, bullets, created_at: item.created_at || item.createdAt || item.created || partnerData.created_at, updated_at: item.updated_at || item.updatedAt || item.updated || partnerData.updated_at });
      })
      .catch((err) => {
        console.error("Error fetching partner section:", err);
      });
  }, []);

  return (
    <section className="solution-page overflow-hidden pt-5 pb-5 pb-lg-6">
      <header
        className="position-relative overflow-hidden mb-5"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(0,115,95,0.85), rgba(0,173,172,0.78)), url(${header.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25" />
        <div className="container position-relative text-white text-start py-5 py-lg-6">
            <div className="col-lg-8 text-start" data-aos="fade-right">
              <h1
                className="display-4 fw-bold mb-3 lh-sm text-start"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                {header.heading}
              </h1>
              {header.desc ? (
                <p className="lead text-white-75 mb-4" style={{ fontSize: "clamp(1rem, 1.8vw, 1.5rem)" }}>
                  {header.desc}
                </p>
              ) : null}
              {/* <div className="d-flex flex-wrap gap-3">
                <a href="#sensors" className="btn btn-light text-uppercase fw-semibold px-4 shadow-sm">Explore Platform</a>
                <a href="/contact" className="btn btn-outline-light text-uppercase fw-semibold px-4">Consult An IAQ Expert</a>
              </div> */}
            </div>
        </div>
      </header>

      <section id="sensors" className="py-5 py-lg-6 container px-3 px-lg-5" style={{ paddingTop: '4rem' }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sensorsList.map((sensor, index) => (
            <div className="col" key={sensor.id || index} data-aos="fade-up" data-aos-delay={index * 80}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 72, height: 72 }}>
                  {sensor.icon && (
              <img src={sensor.icon} alt={sensor.name || sensor.heading || 'sensor'} style={{ width: 34, height: 34 }} />
            )}
                </div>
                <h3 className="h5 fw-semibold mb-2">{sensor.name}</h3>
                <p className="text-muted mb-0">{sensor.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 py-lg-6 pt-24 bg-light">
        <div className="container">
          <div className="row g-4">
            {healthImpactsList.map((impact, index) => (
              <div className="col-lg-4" key={impact.label} data-aos="fade-up" data-aos-delay={index * 60}>
                <div className="card h-100 border-0 rounded-4 shadow-sm p-4 hover-lift">
                  <h3 className="display-6 fw-bold text-success mb-2">{impact.label}</h3>
                  <p className="fw-semibold text-muted mb-1">{impact.value}</p>
                  <p className="small text-secondary mb-0">{impact.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6">
        <div className="container text-center">
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-lg-5 text-center" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">{habitatsLeftData.heading}</h2>
              <p className="text-muted mb-4">
                {habitatsLeftData.desc}
              </p>
              <p className="text-muted small mb-1">Created: {habitatsLeftData.created_at}</p>
              <p className="text-muted small">Updated: {habitatsLeftData.updated_at}</p>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="row row-cols-1 row-cols-lg-2 g-4">
                {habitatsList.map((space) => (
                  <div className="col" key={space.title}>
                    <div className="card border-0 rounded-4 shadow-sm overflow-hidden hover-lift">
                      <div className="ratio ratio-16x9">
                        <img src={space.image} alt={space.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="card-body p-4">
                        <h3 className="h6 fw-semibold mb-2">{space.title}</h3>
                        <ul className="text-muted small ps-3 mb-0">
                          {space.points.map((point) => (
                            <li key={point} className="mb-1">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            Build A Program People Trust
          </h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-12">
            {programStepsList.map((step, index) => (
              <div className="col" key={step.title} data-aos="fade-up" data-aos-delay={index * 70}>
                <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 hover-lift p-4 mt-4">
                  <h3 className="h6 fw-semibold text-warning mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-white-50 mb-0">{step.text}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
      </section>

      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">{partnerData.heading}</h2>
              <p className="text-muted mb-4">{partnerData.desc}</p>
              <p className="text-muted small mb-1">Created: {partnerData.created_at}</p>
              <p className="text-muted small">Updated: {partnerData.updated_at}</p>
              {/* <ul className="text-muted small mb-0">
                {(partnerData.bullets && partnerData.bullets.length ? partnerData.bullets : [
                  "Comprehensive IAQ strategy, roadmap, and ROI modeling.",
                  "BMS integration, commissioning, and managed wellness operations.",
                  "Occupant engagement programs, ESG reporting, and continuous improvement coaching.",
                ]).map((b, i) => (
                  <li key={i} className="mb-2">{b}</li>
                ))}
              </ul> */}
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div
                className="card border-0 h-100 text-white rounded-4 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(0,140,125,0.95), rgba(0,190,160,0.85))",
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 className="h4 fw-semibold mb-3">IAQ Strategy Session</h3>
                    <p className="text-white-75 mb-4">
                      Collaborate with Nexyos experts to blueprint wellness goals, technology roadmap, and change management needed to
                      deliver healthier spaces across your portfolio.
                    </p>
                  </div>
                  <div className="pt-4">
                    <a href="/contact" className="btn btn-light fw-semibold text-uppercase px-4">
                      Book A Session
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

export default Indoor_Air_Quality;
