import React, { useState, useEffect } from "react";
import axios from "axios";

const HeroSection = () => {
    
      const [heroData, setHeroData] = useState({
        title: 'Become a Nexyos Partner',
        subtitle:
          'Join the Nexyos Partner Network and become part of a global ecosystem driving innovation in IoT and video surveillance. Whether you\'re a technology company, system integrator, or solution provider, we offer multiple partnership models designed to accelerate your growth and expand your market reach.',
        image: null,
      });
    
    const pageStyles = {
        heroSection: {
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay',
            color: 'white',
            padding: '80px 0',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 1.2s ease-out'
        },
        heroTitle: {
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            animation: 'slideInDown 1.5s ease-out 0.3s both'
        },
        heroSubtitle: {
            fontSize: '1.25rem',
            lineHeight: '1.8',
            marginBottom: '2.5rem',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 2.5rem auto',
            animation: 'slideInDown 1.5s ease-out 0.6s both'
        },
    };
  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/become-partner/section-1")
      .then((res) => {
        const data = res.data;
        const item = Array.isArray(data) ? data[0] : data || {};
        const title = item.heading || item.title || item.name || heroData.title;
        const subtitle = item.description || item.desc || item.body || heroData.subtitle;
        const image = item.image || item.img || item.image_url || null;
        setHeroData({ title, subtitle, image });
      })
      .catch((err) => {
        console.error("Error fetching Become Partner hero:", err);
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
            <div
                style={{
                    ...pageStyles.heroSection,
                    backgroundImage: heroData.image
                        ? `linear-gradient(135deg, #667eea 0%, #764ba2 100%), url(${heroData.image})`
                        : pageStyles.heroSection.backgroundImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 style={pageStyles.heroTitle}>{heroData.title}</h1>
                            <p style={pageStyles.heroSubtitle}>{heroData.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection
