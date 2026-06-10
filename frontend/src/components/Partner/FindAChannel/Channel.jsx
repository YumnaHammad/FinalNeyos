import React, { useState, useRef, useEffect } from "react";
import "../../../style/ChannelPartners.css";

const Channel = () => {
  // const [activeTab, setActiveTab] = useState(0);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [hoveredPartner, setHoveredPartner] = useState(null);
  // const [selectedRegion, setSelectedRegion] = useState("all");
  // const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);
 const [partnerData, setPartnerData] = useState([]);
  const [leftPartnerData, setLeftPartnerData] = useState([]);
  // const [partnerTab, setPartnerTab] = useState([
  //   { id: 0, name: "All Partners", status: 0 },
  // ]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
   const fetchSectionData = async () => {
      try {
        const response = await fetch(
          "https://nexyos.deeptech.pk/api/channel/section-2-right-side"
        );
        const data = await response.json();
        setPartnerData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };
    fetchSectionData();
      const fetchLeftSectionData = async () => {
      try {
        const response = await fetch(
          "https://nexyos.deeptech.pk/api/channel/section-2-left-side"
        );
        const data = await response.json();
        setLeftPartnerData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };
       fetchLeftSectionData();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="channel-partners-container" ref={containerRef}>
      {/* Banner Section */}
      <div className="channel-banner">
        <div className="banner-content">
           {leftPartnerData.map((solution) => (
          <div className="banner-text">
            <h1 className="banner-title" data-aos="fade-right">
              {solution.heading}
            </h1>
            <p className="banner-subtitle" data-aos="fade-right" data-aos-delay="200">
              {solution.description} 
            </p>
            <div className="banner-stats" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-item">
                <span className="stat-number">{solution.partners}</span>
                <span className="stat-label">Partners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{solution.countries}</span>
                <span className="stat-label">Countries</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{solution.support}</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>))}
          <div className="banner-visual" data-aos="fade-left" data-aos-delay="300">
            <div className="partner-network">
             
              <div className="network-node center-node">
                <span>NEXYOS</span>
              </div>
               {partnerData.map((partner) => (
              <div className={`network-node partner-${partner.id}`} key={partner.id}>
                {partner.image && (
                    <img
                      src={partner.image}
                      alt={partner.heading}
                      className="img-fluid"
                      style={{ width: "100%", height: "auto" }}
                    />
                )}
              </div>
               ))}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Channel;
