import React from "react";

const WhyChooseUs = ({
  heading,
  subHeadings = [],
  image,
  badgeText = "Live Preview",
  headingIconClass = "ph ph-target",
  itemIconClass = "ph ph-shield-check",
}) => {
      const pageStyles = {
    heroSection: {
      background:
        "linear-gradient(135deg, #1a1a1a 0%, #2c3e50 25%, #34495e 50%, #2c3e50 75%, #1a1a1a 100%)",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
      animation: "fadeInUp 1.2s ease-out",
    },
    heroTitle: {
      color: "#3498db",
      fontSize: "3.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textShadow: "0 0 20px rgba(52, 152, 219, 0.5)",
      animation: "slideInDown 1.5s ease-out 0.3s both",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      marginBottom: "2.5rem",
      color: "#ecf0f1",
      animation: "slideInDown 1.5s ease-out 0.6s both",
    },
    terminal: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      border: "2px solid #3498db",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 0 30px rgba(52, 152, 219, 0.3)",
      backdropFilter: "blur(10px)",
      animation: "slideInRight 1.2s ease-out 0.3s both",
    },
    terminalHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    terminalDot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      marginRight: "0.5rem",
    },
    terminalText: {
      color: "#00ff00",
      fontSize: "0.9rem",
      margin: "0",
      fontFamily: "monospace",
    },
    secureBadge: {
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "600",
      animation: "pulse 2s infinite",
    },
    primaryButton: {
      backgroundColor: "#e74c3c",
      borderColor: "#e74c3c",
      color: "white",
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "none",
      animation: "slideInUp 1s ease-out 0.9s both",
    },
    outlineButton: {
      backgroundColor: "transparent",
      borderColor: "#3498db",
      color: "#3498db",
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "2px solid #3498db",
      animation: "slideInUp 1s ease-out 1.2s both",
    },
    section: {
      padding: "80px 0",
      backgroundColor: "#ffffff",
      animation: "fadeIn 1s ease-out",
    },
    sectionDark: {
      padding: "80px 0",
      backgroundColor: "#f8f9fa",
      animation: "fadeIn 1s ease-out",
    },
    sectionTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "1rem",
      textAlign: "center",
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "#666",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto",
      lineHeight: "1.7",
    },
    card: {
      backgroundColor: "#ffffff",
      border: "3px solid transparent",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      height: "100%",
      backgroundImage:
        "linear-gradient(white, white), linear-gradient(45deg, #3498db, #e74c3c, #f39c12)",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
    },
    cardTitle: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "1rem",
      background: "linear-gradient(45deg, #3498db, #e74c3c)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    cardText: {
      fontSize: "1rem",
      color: "#555",
      lineHeight: "1.8",
      marginBottom: "2rem",
    },
    statsContainer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "2rem",
    },
    statItem: {
      textAlign: "center",
    },
    statIcon: {
      width: "50px",
      height: "50px",
      backgroundColor: "#3498db",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 0.5rem auto",
      fontSize: "1.5rem",
      color: "#ffffff",
    },
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#3498db",
      marginBottom: "0.25rem",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#666",
    },
    interactiveHeading: {
      cursor: "pointer",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "2px solid #e9ecef",
      transition: "all 0.3s ease",
      backgroundColor: "#ffffff",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden",
    },
    headingHover: {
      borderColor: "#3498db",
      backgroundColor: "#f0f8ff",
      transform: "translateX(10px)",
      boxShadow: "0 5px 20px rgba(52, 152, 219, 0.2)",
    },
    headingIcon: {
      color: "#3498db",
      marginRight: "0.75rem",
    },
    imageContainer: {
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
    },
    imageBadge: {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "600",
    },
    cameraButton: {
      position: "absolute",
      bottom: "1rem",
      right: "1rem",
      width: "50px",
      height: "50px",
      backgroundColor: "#000000",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "1.25rem",
    },
    darkSection: {
      background:
        "linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    },
    darkSectionTitle: {
      color: "#3498db",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "1rem",
      textAlign: "center",
    },
    darkSectionSubtitle: {
      color: "#ecf0f1",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 3rem auto",
      fontSize: "1.1rem",
      lineHeight: "1.7",
    },
    swiperContainer: {
      padding: "2rem 0",
    },
    swiperCard: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.4s ease",
      position: "relative",
      overflow: "hidden",
      height: "100%",
    },
    swiperCardHover: {
      transform: "translateY(-15px) scale(1.02)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      borderColor: "#fff",
    },
    swiperIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem auto",
      fontSize: "2rem",
      color: "#ffffff",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
    },
    swiperTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#ffffff",
      marginBottom: "0.75rem",
    },
    swiperDescription: {
      fontSize: "0.9rem",
      color: "#ecf0f1",
      lineHeight: "1.5",
    },
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    benefitCard: {
      backgroundColor: "#ffffff",
      border: "2px solid #e9ecef",
      borderRadius: "16px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      height: "100%",
    },
    benefitCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      borderColor: "#3498db",
    },
    benefitIcon: {
      fontSize: "3rem",
      color: "#3498db",
      marginBottom: "1rem",
    },
    benefitTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "0.75rem",
    },
    benefitText: {
      fontSize: "0.95rem",
      color: "#666",
      lineHeight: "1.6",
    },
    navigationButton: {
      backgroundColor: "rgba(52, 152, 219, 0.2)",
      border: "2px solid #3498db",
      color: "#3498db",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
    },
    navigationButtonHover: {
      backgroundColor: "rgba(52, 152, 219, 0.4)",
      transform: "scale(1.1)",
    },
  };
  
  return (
      <>
      <div style={pageStyles.sectionDark}>
      <div className="container">
        <div className="row">
          {/* LEFT */}
          <div className="col-md-5">
           <h1 style={pageStyles.sectionTitle}>
              <i className={`${headingIconClass} me-2`}   style={pageStyles.headingIcon}></i>
              {heading}
            </h1>
            {subHeadings.map((text, index) => (
              <div key={index}  style={pageStyles.interactiveHeading}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#e74c3c";
                    e.target.style.backgroundColor = "#fff5f5";
                    e.target.style.transform = "translateX(10px)";
                    e.target.style.boxShadow =
                      "0 5px 20px rgba(231, 76, 60, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.backgroundColor = "#ffffff";
                    e.target.style.transform = "translateX(0)";
                    e.target.style.boxShadow = "none";
                  }}>
                <i className={`${itemIconClass} me-2`} style={pageStyles.headingIcon}></i>
                {text}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="col-md-7">
            <div style={pageStyles.imageContainer}>
              {image && (
                <img
                  src={image}
                  alt={heading}
                  className="img-fluid"
                  style={{ width: "100%", height: "29rem" }}
                />
              )}
              <div style={pageStyles.imageBadge}>{badgeText}</div>
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default WhyChooseUs;
