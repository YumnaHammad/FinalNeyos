import React, { useEffect, useState } from "react";

const Application = () => {
  const [processSteps, setProcessSteps] = useState([]);

  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        const response = await fetch("https://nexyos.deeptech.pk/api/become-partner/section-5");
        const data = await response.json();
        setProcessSteps(data);
      } catch (error) {
        console.error("Error fetching process data:", error);
      }
    };

    fetchProcessData();
  }, []);

  const pageStyles = {
    processText: {
      fontSize: "0.95rem",
      color: "#666",
      lineHeight: "1.6",
    },
    processTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "0.75rem",
    },
    processIcon: {
      fontSize: "3rem",
      color: "#667eea",
      marginBottom: "1rem",
    },
    processCard: {
      backgroundColor: "#ffffff",
      border: "2px solid #e9ecef",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    processCardHover: {
      transform: "translateY(-8px)",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
      borderColor: "#667eea",
    },
    processGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "#666",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto",
      lineHeight: "1.7",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "1rem",
      textAlign: "center",
      animation: "slideInDown 1s ease-out",
    },
    section: {
      padding: "80px 0",
      backgroundColor: "#ffffff",
      animation: "fadeIn 1s ease-out",
    },
  };
  return (
    <>
      <div style={pageStyles.section}>
        <div className="container">
          <h2 style={pageStyles.sectionTitle}>
            <i className="ph ph-flow-arrow me-2"></i>
            How to Become a Partner
          </h2>
          <p style={pageStyles.sectionSubtitle}>
            Follow these simple steps to start your partnership journey with
            Nexyos
          </p>

          <div style={pageStyles.processGrid}>
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                style={pageStyles.processCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.borderColor = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#e9ecef";
                }}
              >
                <div style={pageStyles.processIcon}>
                  <i className={`ph ph-${index + 1}-circle`}></i>
                </div>
                <h5 style={pageStyles.processTitle}>{step.heading}</h5>
                <p style={pageStyles.processText}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
