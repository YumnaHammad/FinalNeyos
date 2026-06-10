import React, { useEffect, useState } from "react";

const normalizeArray = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  return [];
};

const Intelligent_Traffic_Solution = () => {
  const [section1, setSection1] = useState([]);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [section4, setSection4] = useState([]);
  const [section5, setSection5] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urls = [
          "https://nexyos.deeptech.pk/api/intelligent-traffic/section-1",
          "https://nexyos.deeptech.pk/api/intelligent-traffic/section-2",
          "https://nexyos.deeptech.pk/api/intelligent-traffic/section-3",
          "https://nexyos.deeptech.pk/api/intelligent-traffic/section-4",
          "https://nexyos.deeptech.pk/api/intelligent-traffic/section-5",
        ];

        const res = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));

        setSection1(normalizeArray(res[0]));
        setSection2(normalizeArray(res[1]));
        setSection3(normalizeArray(res[2]));
        setSection4(normalizeArray(res[3]));
        setSection5(normalizeArray(res[4]));
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  const hero = section1[0];

  return (
    <section className="solution-page overflow-hidden pt-5 pb-5 pb-lg-6">
      {/* SECTION 1 */}
      <header
        className="position-relative overflow-hidden mb-5"
        style={{
          backgroundImage: `linear-gradient(128deg, rgba(10,18,74,0.82), rgba(0,140,140,0.85)), url(${hero?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-gradient-primary opacity-25" />
        <div className="container position-relative text-white py-5 py-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6 col-lg-7" data-aos="fade-right">
              <span className="badge bg-warning text-dark fw-semibold text-uppercase letter-spacing mb-3">
                Intelligent Traffic Solution
              </span>
              <h1 className="display-4 fw-bold mb-3 lh-sm">{hero?.heading}</h1>
              <p className="lead text-white-75 mb-4">{hero?.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2 */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" data-aos="fade-up">
            {section2.map((metric) => (
              <div className="col" key={metric.label}>
                <div className="card h-100 border-0 shadow-sm rounded-4 py-4 px-3 hover-lift bg-light-subtle text-center">
                  <div className="display-6 fw-bold text-primary">{metric.value}</div>
                  <p className="fw-semibold text-muted mb-1">{metric.label}</p>
                  <p className="small text-secondary mb-0">{metric.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="metro" className="py-5 py-lg-6 bg-light">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            A Platform Built For Every Mode And Corridor Type
          </h2>
          <div className="row g-4">
            {section3.map((segment, index) => (
              <div className="col-lg-4" key={index} data-aos="fade-up" data-aos-delay={index * 80}>
                <div className="card h-100 border-0 rounded-4 overflow-hidden hover-lift shadow-sm">
                  <div className="ratio ratio-4x3">
                    <img src={segment.image} alt={segment.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold">{segment.title}</h3>
                    <p className="text-muted mb-0">{segment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <h2 className="h3 fw-bold mb-3">End-To-End Traffic Operations Stack</h2>
              <ul className="list-unstyled text-muted small">
                {section4.map((stage) => (
                  <li key={stage.heading} className="mb-4">
                    <h3 className="h6 fw-semibold text-primary mb-2">{stage.heading}</h3>
                    <ul className="mb-0 ps-3">
                      {stage.bullets?.map((bullet, i) => (
                        <li key={i} className="mb-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container">
          <h2 className="h3 fw-bold text-center mb-4" data-aos="fade-up">
            Deployment Roadmap Tailored To Your City
          </h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {section5.map((item, index) => (
              <div className="col" key={index} data-aos="fade-up" data-aos-delay={index * 70}>
                <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 hover-lift p-4">
                  <h3 className="h6 fw-semibold text-warning mb-2">{item.year}</h3>
                  <p className="text-white-50 mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Intelligent_Traffic_Solution;
