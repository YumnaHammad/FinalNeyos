import React from "react";

const HeroSection = ({
  title,
  subtitle,
  Terminalcode,
  terminalTitle = "Developer Terminal",
  badge,
  primaryButton,
  secondaryButton,
}) => {
  const pageStyles = {
    heroSection: {
      background:
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      color: "white",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
      animation: "fadeInUp 1s ease-out",
    },
    codeTerminal: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      border: "2px solid #00d4ff",
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
      backdropFilter: "blur(10px)",
      animation: "slideInRight 1.2s ease-out 0.3s both",
      transition: "all 0.3s ease",
    },
    codeText: {
      fontSize: "0.9rem",
      margin: "0",
      fontFamily: "monospace",
    },
    liveBadge: {
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "600",
      animation: "pulse 2s infinite",
    },
    heroTitle: {
      color: "#00d4ff",
      fontSize: "3.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
      textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
      animation: "slideInLeft 1.2s ease-out 0.3s both",
      background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      marginBottom: "2.5rem",
      color: "#e0e0e0",
      animation: "slideInLeft 1.2s ease-out 0.6s both",
    },
    outlineButton: {
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "2px solid #00d4ff",
      animation: "slideInUp 1s ease-out 1.2s both",
    },
    primaryButton: {
      padding: "0.875rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.3s ease",
      border: "none",
      animation: "slideInUp 1s ease-out 0.9s both",
    },
  };
  return (
    <div style={pageStyles.heroSection}>
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT */}
          <div className="col-lg-6">
            <div style={pageStyles.codeTerminal}>
              <div style={{ marginBottom: "1rem", display: "flex",alignItems: "center"}}>
                <div style={{ color: "#00ff00", marginRight: "0.5rem",width: "12px", height: "12px", borderRadius: "50%" , backgroundColor: "#00ff00" }}>
                </div>
                <div style={{color: "#ffff00", marginRight: "0.5rem",width: "12px", height: "12px", borderRadius: "50%" , backgroundColor: "#ffff00" }}>
                </div>
                <div style={{color: "#ff0000", marginRight: "0.5rem",width: "12px", height: "12px", borderRadius: "50%" , backgroundColor: "#ff0000"}}>
                </div>
                <span style={{ color: "#888", fontSize: "0.875rem",marginLeft: "0.5rem"}}>
                  {terminalTitle}
                </span>
              </div>

              <pre style={{ ...pageStyles.codeText,
                      color: Terminalcode.textColor || "#000",}}>{Terminalcode.code}</pre>

              {badge?.text && (
                <div
                  style={{ position: "absolute", top: "1rem", right: "1rem" }}
                >
                  <span
                    style={{
                      ...pageStyles.liveBadge,
                      backgroundColor: badge.bgColor || "#00d4ff",
                      color: badge.textColor || "#000",
                    }}
                  >
                    {badge.text}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-6">
            <h1 style={pageStyles.heroTitle}>{title}</h1>
            <p style={pageStyles.heroSubtitle}>{subtitle}</p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {secondaryButton && (
                <button
                  style={{
                    ...pageStyles.outlineButton,
                    color: secondaryButton.textColor,
                    borderColor: secondaryButton.borderColor,
                  }}
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.icon && (
                    <i className={`${secondaryButton.icon} me-2`}></i>
                  )}
                  {secondaryButton.label}
                </button>
              )}

              {primaryButton && (
                <button
                  style={{
                    ...pageStyles.primaryButton,
                    backgroundColor: primaryButton.bgColor,
                    color: primaryButton.textColor,
                    borderColor: primaryButton.borderColor,
                  }}
                  onClick={primaryButton.onClick}
                >
                  {primaryButton.icon && (
                    <i className={`${primaryButton.icon} me-2`}></i>
                  )}
                  {primaryButton.label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
