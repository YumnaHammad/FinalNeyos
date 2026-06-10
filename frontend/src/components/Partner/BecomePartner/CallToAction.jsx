import React from 'react'

const CallToAction = () => {
    const pageStyles = {
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
        ctaSubtitle: {
      fontSize: "1.1rem",
      color: "#666",
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto 2rem auto",
      lineHeight: "1.7",
    },
        ctaTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "1rem",
      textAlign: "center",
    },
        ctaSection: {
      backgroundColor: "#f8f9fa",
      padding: "80px 0",
    },
    }
  return (
    <>
          <div style={pageStyles.ctaSection}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 style={pageStyles.ctaTitle}>
                Ready to Join Our Partner Network?
              </h2>
              <p style={pageStyles.ctaSubtitle}>
                Take the first step towards a successful partnership with
                Nexyos. Our team is ready to help you explore opportunities and
                build a mutually beneficial relationship.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button style={pageStyles.primaryButton}>
                  <i className="ph ph-envelope me-2"></i>
                  Contact Partnership Team
                </button>
                <button style={pageStyles.outlineButton}>
                  <i className="ph ph-download me-2"></i>
                  Download Partner Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CallToAction