import React, { useEffect, useState } from "react";
import SolutionDetailLayout from "../../components/Solution/SolutionDetailLayout";
import { getSolutionMeta } from "../../utils/getSolutionMeta";

const META = getSolutionMeta("/solution/EnergyEfficiency");

const normalizeArray = (res) => {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.items)) return res.items;
  return [];
};

const EnergyEfficiency = () => {
  const [section1, setSection1] = useState(null);
  const [section2, setSection2] = useState([]);
  const [section3, setSection3] = useState([]);
  const [section4Left, setSection4Left] = useState([]);
  const [section4Right, setSection4Right] = useState([]);
  const [section5, setSection5] = useState([]);
  const [section6, setSection6] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urls = [
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-1",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-2",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-3",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-4-left-side",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-4-right-side",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-5",
          "https://nexyos.deeptech.pk/api/energy-efficiency/section-6",
        ];

        const res = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));

        setSection1(res[0]?.data || res[0]);
        setSection2(normalizeArray(res[1]));
        setSection3(normalizeArray(res[2]));
        setSection4Left(normalizeArray(res[3]));
        setSection4Right(normalizeArray(res[4]));
        setSection5(normalizeArray(res[5]));
        setSection6(res[6]?.data || res[6]);
      } catch (err) {
        console.error("Energy Efficiency API Error:", err);
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
      shortTitle={META.label}
      relatedGroupId="smart"
      subtitle={section1?.description || META.desc}
      image={section1?.image || META.heroImage}
      badge={section1?.badge || META.groupTitle}
    >
      {/* SECTION 2 — OUTCOMES */}
      <section className="py-5 py-lg-6 container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {section2.map((item, i) => (
            <div className="col" key={i}>
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                <h3 className="display-6 fw-bold text-success mb-2">{item.value}</h3>
                <p className="fw-semibold text-muted mb-1">{item.label}</p>
                <p className="small text-secondary mb-0">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — LEVERS */}
      <section id="levers" className="py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {section3.map((item, i) => (
              <div className="col" key={i}>
                <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift p-4 text-center">
                  <div className="rounded-circle bg-white d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: 70, height: 70 }}>
                    <img src={item.icon} alt={item.title} style={{ width: 32, height: 32 }} />
                  </div>
                  <h3 className="h5 fw-semibold mb-2">{item.title}</h3>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 LEFT */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              {section4Left.map((item, i) => (
                <div key={i}>
                  <h2 className="h3 fw-bold mb-3">{item.heading}</h2>
                  <p className="text-muted mb-4">{item.description}</p>
                </div>
              ))}
            </div>

            {/* SECTION 4 RIGHT */}
            <div className="col-lg-7">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {section4Right.map((item, i) => (
                  <div className="col" key={i}>
                    <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden hover-lift">
                      <div className="ratio ratio-16x9">
                        <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="card-body p-4">
                        <h3 className="h6 fw-semibold mb-2">{item.title}</h3>
                        <p className="text-muted mb-0 small">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — ROADMAP */}
      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {section5.map((item, i) => (
              <div className="col" key={i}>
                <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 hover-lift p-4">
                  <h3 className="h6 fw-semibold text-warning mb-2">
                    {i + 1}. {item.stage}
                  </h3>
                  <p className="text-white-50 mb-0">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <h2 className="h3 fw-bold mb-3">{section6?.heading}</h2>
          <p className="text-muted mb-4">{section6?.description}</p>
        </div>
      </section>
    </SolutionDetailLayout>
  );
};

export default EnergyEfficiency;
