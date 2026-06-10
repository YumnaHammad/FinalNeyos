import React, { useEffect, useState } from 'react'

const PartnerProgram = () => {
    const [programPartnerData, setProgramPartnerData] = useState([]);
      const pageStyles = {
    section: {
      padding: '80px 0',
      backgroundColor: '#ffffff',
      animation: 'fadeIn 1s ease-out'
    },
    imageContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      animation: 'slideInRight 1s ease-out 0.3s both'
    },
    imageBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#00d4ff',
      color: '#000',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    card: {
      backgroundColor: '#ffffff',
      border: '2px solid #e9ecef',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      height: '100%',
      animation: 'slideInUp 1s ease-out 0.3s both'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#0f3460',
      marginBottom: '1rem'
    },
    headingIcon: {
      color: '#00d4ff',
      marginRight: '0.75rem'
    },
    cardText: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: '2rem'
    },
    statItem: {
      textAlign: 'center',
      animation: 'fadeInUp 1s ease-out 0.6s both'
    },
    statIcon: {
      fontSize: '2.5rem',
      color: '#00d4ff',
      marginBottom: '0.5rem',
      transition: 'all 0.3s ease'
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#0f3460',
      marginBottom: '0.25rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#666'
    },
  };
    const fetchProgramPartnerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/developer-partner/section-2"
      );
      const data = await response.json();
      setProgramPartnerData(data ? [data] : []);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  const partner = programPartnerData[0];

const stats = partner
  ? [
      {
        value: partner.sub_heading1,
        label: "APIs",
        icon: "ph-code-simple",
      },
      {
        value: partner.sub_heading2,
        label: "SDKs",
        icon: "ph-books",
      },
      {
        value: partner.sub_heading3,
        label: "Support",
        icon: "ph-users",
      },
    ].filter(item => item.value)
  : [];


  useEffect(() => {
    fetchProgramPartnerData();
  }, []);
  return (
    <div>
     <div style={pageStyles.section}>
        <div className="container">
            {partner && (             
          <div className="row align-items-center">
          <div className="col-lg-5">
              <div style={pageStyles.imageContainer}>
            <img
              src={partner.image}
              alt="Nexyos Developer Partner"
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }}
            />
                <div style={pageStyles.imageBadge}>Developer Zone</div>
              </div>
          </div>
          <div className="col-lg-7">
              <div style={pageStyles.card}>
                <h3 style={pageStyles.cardTitle}>
                  <i className="ph ph-code me-2" style={pageStyles.headingIcon}></i>
                  {partner.heading}
                </h3>
             <p style={pageStyles.cardText}>
  {partner.description}
</p>

                <div style={pageStyles.statsContainer}>
                   {stats.map((stat, index) => (
                  <div style={pageStyles.statItem} key={index}>
                    <div style={pageStyles.statIcon}>
                      <i className={`ph ${stat.icon}`}></i>
                    </div>
                    <div style={pageStyles.statNumber}>{stat.value}</div>
                    <div style={pageStyles.statLabel}>{stat.label}</div>
                  </div>))}
                </div>
              </div>
            </div>
          </div>  )}
        </div>
      </div>
    </div>
  )
}

export default PartnerProgram
