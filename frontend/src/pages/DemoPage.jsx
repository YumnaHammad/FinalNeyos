import React from "react";

const heroImage =
  "https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&cs=tinysrgb&w=1600";

const demoExperiences = [
  {
    title: "AI Video Surveillance",
    description:
      "Explore multi-sensor cameras, PTZ, and NVR orchestration with live credentials. See analytics, alerting, and playback in action.",
    link: "http://ipc.nexyos.com:18082/",
    creds: "User: nexyos / Password: nexyos2024",
    image: "https://www.milesight.com/static/pc/en/online-demo-collection/network-camera.png",
  },
  {
    title: "Nexyos IoT Cloud",
    description:
      "Manage LoRaWAN® devices, dashboards, and automations in a single interface. Understand how data flows from edge to cloud.",
    link: "http://iot.nexyos.com:18084/",
    creds: "Demo access with guided walkthrough.",
    image: "https://www.milesight.com/static/pc/en/online-demo-collection/iot-cloud.png?t=1744191186348",
  },
  {
    title: "LoRaWAN® Gateways",
    description:
      "Test gateway provisioning, packet inspection, and multi-tenant management. Validate how quickly you can bring devices online.",
    link: "http://ptz.nexyos.com:18081/",
    creds: "User: nexyos / Password: nexyos2024",
    image: "https://www.milesight.com/static/pc/en/online-demo-collection/ug63-sg50-online-demo.png?t=1744191186348",
  },
  {
    title: "5G/4G Industrial Router",
    description:
      "Experience remote management, VPN configuration, and traffic analytics for enterprise edge connectivity scenarios.",
    link: "http://nvr.nexyos.com:18089/",
    creds: "User: nexyos / Password: nexyos2024",
    image: "https://www.milesight.com/static/pc/en/online-demo-collection/cerllular-router.svg?t=1744191186348",
  },
];

const valueHighlights = [
  {
    title: "Guided Walkthroughs",
    detail: "Short videos and annotated tooltips help you evaluate features faster—no prior setup needed.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/compass.svg",
  },
  {
    title: "Real Credentials",
    detail: "Access live environments with production-grade datasets so you can test realistic scenarios.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/key.svg",
  },
  {
    title: "One Link For Teams",
    detail: "Share demos securely with stakeholders, partners, and customers to accelerate decision making.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/link.svg",
  },
];

const steps = [
  {
    heading: "Select Your Experience",
    text: "Pick from AI video surveillance, IoT Cloud, LoRaWAN® gateway, or router demos depending on your project focus.",
  },
  {
    heading: "Launch In Minutes",
    text: "Use the provided credentials to log in instantly—no installation or VPN required.",
  },
  {
    heading: "Collaborate & Evaluate",
    text: "Capture insights, compare configurations, and invite team members to review workflows together.",
  },
  {
    heading: "Engage Nexyos Experts",
    text: "Book a follow-up workshop to dive deeper, plan integrations, or request proof-of-concept support.",
  },
];

const DemoPage = () => {
  return (
    <section className="solution-page overflow-hidden pt-5 pb-5 pb-lg-6">
      <header
        className="position-relative overflow-hidden mb-5"
        style={{
          backgroundImage: `linear-gradient(110deg, rgba(12,55,105,0.88), rgba(22,136,190,0.82)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25" />
        <div className="container position-relative text-white py-5 py-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <span className="badge bg-light text-primary fw-semibold text-uppercase letter-spacing mb-3">
                Nexyos Online Demo Studio
              </span>
              <h1 className="display-4 fw-bold mb-3 lh-sm">Experience Nexyos Solutions Live In Minutes</h1>
              <p className="lead text-white-75 mb-4">
                Explore production-grade environments for AI video surveillance, IoT devices, LoRaWAN® gateways, and secure routers.
                Validate performance, workflows, and integrations before you go on-site.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#experiences" className="btn btn-warning text-uppercase fw-semibold px-4 shadow-sm">
                  Browse Demos
                </a>
                <a href="/contact" className="btn btn-outline-light text-uppercase fw-semibold px-4">
                  Plan A Guided Session
                </a>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="100">
              <div className="rounded-4 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 shadow-lg p-4">
                <h2 className="h6 text-white fw-semibold mb-3">Included With Every Demo</h2>
                <ul className="list-unstyled text-white-75 small mb-0">
                  <li className="mb-2">• Live data sets, configured devices, and realistic workflows.</li>
                  <li className="mb-2">• Pre-built dashboards, analytics, and automation playbooks.</li>
                  <li>• Optional recorded walkthroughs and one-on-one expert consultations.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5 py-lg-6 container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {valueHighlights.map((item, index) => (
            <div className="col" key={item.title} data-aos="fade-up" data-aos-delay={index * 80}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 70, height: 70 }}>
                  <img src={item.icon} alt={item.title} style={{ width: 34, height: 34 }} />
                </div>
                <h3 className="h5 fw-semibold mb-2">{item.title}</h3>
                <p className="text-muted mb-0">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experiences" className="py-5 py-lg-6 bg-light">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            Pick Your Live Experience
          </h2>
          <div className="row row-cols-1 row-cols-lg-2 g-4">
            {demoExperiences.map((demo, index) => (
              <div className="col" key={demo.title} data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden hover-lift">
                  <div className="ratio ratio-16x9">
                    <img src={demo.image} alt={demo.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="card-body p-4 d-flex flex-column justify-content-between h-100">
                    <div>
                      <h3 className="h5 fw-semibold mb-2">{demo.title}</h3>
                      <p className="text-muted mb-3">{demo.description}</p>
                      <p className="small text-secondary mb-4">{demo.creds}</p>
                    </div>
                    <a
                      href={demo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary fw-semibold text-uppercase px-4"
                    >
                      Launch Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6 container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5" data-aos="fade-right">
            <h2 className="h3 fw-bold mb-3">How It Works</h2>
            <p className="text-muted mb-4">
              Our demo studio is designed to help teams evaluate technology quickly and collaboratively—before launching a proof of concept.
            </p>
          </div>
          <div className="col-lg-7" data-aos="fade-left">
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {steps.map((step, index) => (
                <div className="col" key={step.heading}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 d-flex flex-column gap-3">
                    <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-1">{step.heading}</h3>
                      <p className="text-muted mb-0 small">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">Need A Customized Demo Journey?</h2>
              <p className="text-white-75 mb-4">
                Nexyos experts can assemble end-to-end scenarios for smart cities, campuses, retail, and industrial clients—complete with
                KPIs, integrations, and ROI modeling.
              </p>
              <ul className="text-white-75 small mb-0">
                <li className="mb-2">Vertical-specific playbooks and best practices.</li>
                <li className="mb-2">Integration support with VMS, BMS, ERP, and third-party analytics.</li>
                <li>Executive-ready reports and success criteria to kick-start your project.</li>
              </ul>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div
                className="card border-0 h-100 text-dark rounded-4 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255,247,133,0.95), rgba(255,255,204,0.9))",
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 className="h4 fw-semibold mb-3 text-primary">Book A Guided Demo Workshop</h3>
                    <p className="text-muted mb-4">
                      Tell us about your use case and we’ll curate the right experiences, datasets, and integration roadmap for your stakeholders.
                    </p>
                  </div>
                  <div className="pt-4">
                    <a href="/contact" className="btn btn-primary fw-semibold text-uppercase px-4">
                      Schedule Now
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

export default DemoPage;
