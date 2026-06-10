import React from "react";

const BannerSection = ({
  title,
  subtitle,
  image,
  gradient,
  content,
  textAlign,
  ImageSize,
  textColor,
}) => {
  const pageStyles = {
    heroSection: {
      backgroundImage: image
        ? `${gradient}, url(${image})`
        : gradient,
      backgroundSize: ImageSize || "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      padding: "80px 0",
      textAlign: "center",
      animation: "fadeInUp 1.2s ease-out",
      backgroundBlendMode: "overlay",
      height: "auto",
       minHeight: "400px", 
    },
    heroTitle: {
      fontSize: "3.5rem",
      fontWeight: "700",
      marginBottom: "1.5rem",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "0 auto",
    },
  };
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
      <div
        style={
        pageStyles.heroSection
        }
      >
        <div className="container">
          <div className={`row
          ${content}  `}>
            <div className={`col-lg-8 ${textAlign}`}>
              <h1 className={`${textColor}`}style={pageStyles.heroTitle}>{title}</h1>
              <p className={`${textColor}`} style={pageStyles.heroSubtitle}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
