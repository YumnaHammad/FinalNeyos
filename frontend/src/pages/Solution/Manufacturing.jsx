import React, { useEffect, useState } from "react";
import SolutionDetailLayout from "../../components/Solution/SolutionDetailLayout";
import { getSolutionMeta } from "../../utils/getSolutionMeta";

const META = getSolutionMeta("/solution/Manufacturing");

const normalizeArray = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  return [];
};

const Manufacturing = () => {
  const [section1, setSection1] = useState(null);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [section4Left, setSection4Left] = useState([]);
  const [section4Right, setSection4Right] = useState([]);
  const [section5, setSection5] = useState(null);
  const [section6, setSection6] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urls = [
          "https://nexyos.deeptech.pk/api/manufacturing/section-1",
          "https://nexyos.deeptech.pk/api/manufacturing/section-2",
          "https://nexyos.deeptech.pk/api/manufacturing/section-3",
          "https://nexyos.deeptech.pk/api/manufacturing/section-4-left-side",
          "https://nexyos.deeptech.pk/api/manufacturing/section-4-right-side",
          "https://nexyos.deeptech.pk/api/manufacturing/section-5",
          "https://nexyos.deeptech.pk/api/manufacturing/section-6",
        ];

        const res = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));

        setSection1(res[0]?.data || res[0]);
        setSection2(normalizeArray(res[1]));
        setSection3(normalizeArray(res[2]));
        setSection4Left(normalizeArray(res[3]));
        setSection4Right(normalizeArray(res[4]));
        setSection5(res[5]?.data || res[5]);
        setSection6(normalizeArray(res[6]));
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return <SolutionDetailLayout loading title={META.label} />;
  }

  return (
    <SolutionDetailLayout
      title={section1?.heading || META.label}
      subtitle={section1?.description || META.desc}
      image={section1?.image || META.heroImage}
      badge={section1?.badge || META.groupTitle}
    >
      {/* SECTION 2 - Pillars */}
      <section id="pillars" className="container py-5 py-lg-6">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {section2.map((pillar, i) => (
            <div className="col" key={i}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 70, height: 70 }}>
                  <img src={pillar.icon} alt={pillar.title} style={{ width: 32, height: 32 }} />
                </div>
                <h3 className="h5 fw-semibold mb-2">{pillar.title}</h3>
                <p className="text-muted mb-0">{pillar.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 - Metrics */}
      <section className="py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="row g-4">
            {section3.map((metric, i) => (
              <div className="col-lg-4" key={i}>
                <div className="card h-100 border-0 rounded-4 shadow-sm p-4 hover-lift">
                  <h3 className="display-6 fw-bold text-primary mb-2">{metric.value}</h3>
                  <p className="fw-semibold text-muted mb-1">{metric.label}</p>
                  <p className="small text-secondary mb-0">{metric.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 LEFT */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <ol className="list-unstyled m-0">
                {section4Left.map((stage, i) => (
                  <li key={i} className="mb-4 d-flex gap-3 align-items-start">
                    <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="h6 fw-semibold mb-2">{stage.heading}</h3>
                      <p className="text-muted mb-0 small">{stage.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 RIGHT - Workcells */}
      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container">
          <div className="row g-4">
            {section4Right.map((cell, i) => (
              <div className="col-lg-4" key={i}>
                <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 overflow-hidden hover-lift">
                  <div className="ratio ratio-4x3">
                    <img src={cell.image} alt={cell.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="card-body p-4">
                    <h3 className="h5 fw-semibold text-white mb-2">{cell.title}</h3>
                    <ul className="text-white-75 small mb-0 ps-3">
                      {cell.points?.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 CTA */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold mb-3">{section5?.heading}</h2>
          <p className="text-muted">{section5?.description}</p>
        </div>
      </section>
    </SolutionDetailLayout>
  );
};

export default Manufacturing;
