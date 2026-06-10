import React, { useState, useEffect } from "react";
import axios from "axios";

const PartnerSection = () => {
  const [partnerSection, setPartnerSection] = useState({
    image: 'https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703',
    heading: 'Become a Nexyos Partner',
    desc:
      "Join the Nexyos Partner Network and become part of a global ecosystem driving innovation in IoT and video surveillance. Whether you're a technology company, system integrator, or solution provider, we offer multiple partnership models designed to accelerate your growth and expand your market reach.",
  });
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '460px'
    },
    imageBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#667eea',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600',
      animation: 'pulse 2s infinite'
    },
    cardTitle: {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: '1rem'
    },
    cardText: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    card: {
      backgroundColor: '#ffffff',
      border: '2px solid #e9ecef',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      height: '100%'
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      borderColor: '#667eea'
    },
        outlineButton: {
      backgroundColor: 'transparent',
      borderColor: '#667eea',
      color: '#667eea',
      padding: '0.875rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: '2px solid #667eea'
    },
        primaryButton: {
      backgroundColor: '#667eea',
      borderColor: '#667eea',
      color: 'white',
      padding: '0.875rem 2rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: 'none'
    },
  };

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/become-partner/section-2")
      .then((res) => {
        const data = res.data;
        const item = Array.isArray(data) ? data[0] : data || {};
        const image = item.image || item.img || item.image_url || item.src || partnerSection.image;
        const heading = item.heading || item.title || item.name || partnerSection.heading;
        const desc = item.description || item.desc || item.body || partnerSection.desc;
        setPartnerSection({ image, heading, desc });
      })
      .catch((err) => {
        console.error('Error fetching Become Partner section-2:', err);
      });
  }, []);
  // CSS animations
  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0; 
        transform: translateX(-50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0; 
        transform: translateX(50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInDown {
      from { 
        opacity: 0; 
        transform: translateY(-30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
      40%, 43% { transform: translate3d(0,-30px,0); }
      70% { transform: translate3d(0,-15px,0); }
      90% { transform: translate3d(0,-4px,0); }
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
  `;
  return (
    <>
       <style>{animations}</style>
      <div style={pageStyles.section}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div style={pageStyles.imageContainer}>
                <img
                  src={partnerSection.image}
                  alt={partnerSection.heading || 'Become a Nexyos Partner'}
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }}
                />
                <div style={pageStyles.imageBadge}>Partnership Hub</div>
              </div>
            </div>
            <div className="col-lg-7">
              <div style={pageStyles.card}>
                <h3 style={pageStyles.cardTitle}>
                  <i className="ph ph-handshake me-2" style={{ color: '#667eea' }}></i>
                  {partnerSection.heading}
                </h3>
                <p style={pageStyles.cardText}>
                  {partnerSection.desc}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button style={pageStyles.primaryButton}>
                    <i className="ph ph-rocket me-2"></i>
                    Get Started
                  </button>
                  <button style={pageStyles.outlineButton}>
                    <i className="ph ph-info me-2"></i>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PartnerSection
