import React from "react";

const heroImage =
  "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1600";

const personas = [
  {
    title: "Campus Safety",
    description:
      "Real-time incident alerts, door status analytics, and unified command dashboards keep students protected without disrupting daily life.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/shield.svg",
  },
  {
    title: "Digital Learning",
    description:
      "Hybrid-ready classrooms, content streaming, and device telemetry empower educators to deliver engaging instruction anywhere.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/monitor.svg",
  },
  {
    title: "Operations & Sustainability",
    description:
      "Smart HVAC, lighting, and occupancy insights lower energy spend while maintaining healthy, comfortable environments.",
    icon: "https://raw.githubusercontent.com/feathericons/feather/master/icons/activity.svg",
  },
];

const experienceMap = [
  {
    heading: "Connected Buildings",
    text: "Secure entry, room booking, space analytics, and digital signage feed a campus-wide digital twin.",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    heading: "Immersive Classrooms",
    text: "AI-enabled capture, collaboration tools, and assistive technology create inclusive learning experiences.",
    image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    heading: "Smart Campus Services",
    text: "Predictive maintenance, autonomous cleaning, and wayfinding bots elevate student services with fewer resources.",
    image: "https://images.pexels.com/photos/256368/pexels-photo-256368.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const path = [
  {
    title: "Vision & Design",
    description:
      "Align stakeholders across academic, IT, and facilities teams to define learner journeys and technology priorities.",
  },
  {
    title: "Pilot & Prove",
    description:
      "Deploy lighthouse spaces—active learning rooms, residence halls, or security operations center—measuring experience KPIs.",
  },
  {
    title: "Scale & Integrate",
    description:
      "Expand blueprint campus-wide with standardized kits, centralized management, and integration into SIS/LMS platforms.",
  },
  {
    title: "Optimize & Evolve",
    description:
      "Continuously monitor adoption, satisfaction, and outcomes; iterate curriculum support, sustainability programs, and services.",
  },
];

const Education = () => {
  return (
    <section className="solution-page overflow-hidden pt-5 pb-5 pb-lg-6">
      <header
        className="position-relative overflow-hidden mb-5"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(57,92,179,0.88), rgba(45,157,212,0.85)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-30" />
        <div className="container position-relative text-white py-5 py-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <span className="badge bg-light text-primary fw-semibold text-uppercase letter-spacing mb-3">
                Smart Education
              </span>
              <h1 className="display-4 fw-bold mb-3 lh-sm">Design Campuses That Inspire, Safeguard, and Adapt</h1>
              <p className="lead text-white-75 mb-4">
                Nexyos unifies safety, digital learning, and building intelligence so institutions can create exceptional experiences for
                students, faculty, and staff on campus or online.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#personas" className="btn btn-warning text-uppercase fw-semibold px-4 shadow-sm">
                  See Personas
                </a>
                <a href="/contact" className="btn btn-outline-light text-uppercase fw-semibold px-4">
                  Talk With Campus Advisors
                </a>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="100">
              <div className="rounded-4 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 shadow-lg p-4">
                <h2 className="h6 text-white fw-semibold mb-3">Outcomes Delivered</h2>
                <p className="text-white-75 small mb-2">• 35% faster emergency response through connected operations center.</p>
                <p className="text-white-75 small mb-2">• 50% increase in hybrid-learning satisfaction from faculty and students.</p>
                <p className="text-white-75 small mb-0">• 22% energy savings via smart schedules, occupancy, and HVAC automation.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="personas" className="py-5 py-lg-6 container">
        <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
          Empower Every Campus Persona
        </h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {personas.map((persona, index) => (
            <div className="col" key={persona.title} data-aos="fade-up" data-aos-delay={index * 80}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 70, height: 70 }}>
                  <img src={persona.icon} alt={persona.title} style={{ width: 32, height: 32 }} />
                </div>
                <h3 className="h5 fw-semibold mb-2">{persona.title}</h3>
                <p className="text-muted mb-0">{persona.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">Campus Experience Blueprint</h2>
              <p className="text-muted mb-4">
                Build a hyper-connected campus that supports every moment—from orientation to graduation—while keeping stakeholders safe,
                informed, and inspired.
              </p>
              <ul className="list-unstyled text-muted small mb-0">
                <li className="mb-2">Unified identity and access across classrooms, labs, and residences.</li>
                <li className="mb-2">Wayfinding, smart kiosks, and accessibility tools for inclusive navigation.</li>
                <li>Data-driven insights surface space utilization, engagement, and wellbeing trends.</li>
              </ul>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="row row-cols-1 row-cols-lg-2 g-4">
                {experienceMap.map((item) => (
                  <div className="col" key={item.heading}>
                    <div className="card border-0 rounded-4 shadow-sm overflow-hidden hover-lift">
                      <div className="ratio ratio-16x9">
                        <img src={item.image} alt={item.heading} className="w-100 h-100" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="card-body p-4">
                        <h3 className="h5 fw-semibold mb-2">{item.heading}</h3>
                        <p className="text-muted mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">Transformation Path</h2>
              <p className="text-muted mb-4">
                Partner with Nexyos to co-create a campus transformation plan grounded in measurable student success and operational
                excellence.
          </p>
        </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="row row-cols-1 g-3">
                {path.map((step, index) => (
                  <div className="col" key={step.title}>
                    <div className="card border-0 shadow-sm rounded-4 hover-lift p-4 d-flex flex-column flex-md-row gap-3">
                      <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="h6 fw-semibold mb-1">{step.title}</h3>
                        <p className="text-muted mb-0 small">{step.description}</p>
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
          <div className="row g-4 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">Join Leading Institutions Modernizing With Nexyos</h2>
              <p className="text-white-75 mb-4">
                From K-12 districts to research universities, Nexyos brings the strategy, technology, and services needed to deliver
                meaningful student outcomes.
              </p>
              <ul className="text-white-75 small mb-0">
                <li className="mb-2">Student experience innovation labs and design sprints.</li>
                <li className="mb-2">Managed safety operations, analytics, and digital learning support.</li>
                <li>Ongoing sustainability and ESG reporting for campus leadership and trustees.</li>
              </ul>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div
                className="card border-0 h-100 text-dark rounded-4 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255,214,112,0.95), rgba(255,242,204,0.9))",
                }}
              >
                <div className="card-body p-5 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h3 className="h4 fw-semibold mb-3 text-primary">Campus Experience Workshop</h3>
                    <p className="text-muted mb-4">
                      Collaborate with Nexyos designers, EdTech experts, and facilities specialists to build a roadmap tailored to your
                      vision, budget, and modernization timeline.
                    </p>
                  </div>
                  <div className="pt-4">
                    <a href="/contact" className="btn btn-primary fw-semibold text-uppercase px-4">
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

export default Education;
