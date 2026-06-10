import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

const Partnership = () => {
  const [partnershipTypes, setPartnershipTypes] = useState([]);
  useEffect(() => {
    const fetchPartnershipData = async () => {
      try {
        const response = await fetch("https://nexyos.deeptech.pk/api/become-partner/section-4");
        const data = await response.json();
        
        // Map API data to include icon and color for cards
        const mappedData = data.map((item, index) => {
          const colors = ["#3498db", "#e74c3c", "#f39c12", "#27ae60", "#9b59b6", "#e67e22", "#34495e", "#1abc9c"];
          const icons = ["ph ph-storefront", "ph ph-lightbulb", "ph ph-code", "ph ph-camera", "ph ph-wifi", "ph ph-puzzle-piece", "ph ph-gear", "ph ph-plus-circle"];
          
          return {
            id: item.id,
            title: item.heading,
            image: item.image,
            description: item.description,
            icon: icons[index % icons.length],
            color: colors[index % colors.length],
          };
        });
        
        setPartnershipTypes(mappedData);
      } catch (error) {
        console.error("Error fetching partnership data:", error);
      }
    };

    fetchPartnershipData();
  }, []);
  const pageStyles = {
    darkSection: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      color: "white",
      padding: "60px 0",
    },
    darkSectionTitle: {
      color: "#ffffff",
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
    navigationButton: {
      backgroundColor: "rgba(102, 126, 234, 0.2)",
      border: "2px solid #667eea",
      color: "#667eea",
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
      backgroundColor: "rgba(102, 126, 234, 0.4)",
      transform: "scale(1.1)",
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
    swiperCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
      borderColor: "#fff",
    },
    swiperDescription: {
      fontSize: "0.9rem",
      color: "#ecf0f1",
      lineHeight: "1.5",
    },
    swiperCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      borderRadius: '20px',
      padding: '2rem',
      textAlign: 'center',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    },
    swiperTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.75rem'
    },
  };
  // const partnershipTypes = [
  //   {
  //     title: "Channel Partner",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
  //     description: "Resell and distribute our products",
  //     icon: "ph ph-storefront",
  //     color: "#3498db",
  //   },
  //   {
  //     title: "Technology Partner",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
  //     description: "Collaborate on innovative solutions",
  //     icon: "ph ph-lightbulb",
  //     color: "#e74c3c",
  //   },
  //   {
  //     title: "Developer Partner",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
  //     description: "Build applications and integrations",
  //     icon: "ph ph-code",
  //     color: "#f39c12",
  //   },
  //   {
  //     title: "CCTV Specialist",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
  //     description: "Focus on security solutions",
  //     icon: "ph ph-camera",
  //     color: "#27ae60",
  //   },
  //   {
  //     title: "IoT Integrator",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
  //     description: "Connect and manage IoT devices",
  //     icon: "ph ph-wifi",
  //     color: "#9b59b6",
  //   },
  //   {
  //     title: "Solution Provider",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
  //     description: "Deliver complete solutions",
  //     icon: "ph ph-puzzle-piece",
  //     color: "#e67e22",
  //   },
  //   {
  //     title: "System Integrator",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
  //     description: "Integrate multiple technologies",
  //     icon: "ph ph-gear",
  //     color: "#34495e",
  //   },
  //   {
  //     title: "Value Added Reseller",
  //     image:
  //       "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
  //     description: "Add value through services",
  //     icon: "ph ph-plus-circle",
  //     color: "#1abc9c",
  //   },
  // ];
  
  return (
    <>
      <div style={pageStyles.darkSection}>
        <div className="container">
          <h1 style={pageStyles.darkSectionTitle}>
            <i className="ph ph-users me-2"></i>
            Partnership Types & Opportunities
          </h1>
          <p style={pageStyles.darkSectionSubtitle}>
            Nexyos offers diverse partnership models to suit different business
            types and expertise levels. From channel partnerships for resellers
            to technology partnerships for innovators, we provide tailored
            programs that align with your business goals and market focus.
          </p>

          <div style={pageStyles.swiperContainer}>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {partnershipTypes.map((type, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      ...pageStyles.swiperCard,
                      border: `2px solid ${type.color}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 40px rgba(0, 0, 0, 0.3)";
                      e.currentTarget.style.borderColor = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = type.color;
                    }}
                  >
                    <div
                      style={{
                        ...pageStyles.swiperIcon,
                        backgroundColor: type.color,
                        boxShadow: `0 0 20px ${type.color}40`,
                      }}
                    >
                      <img src={type.image} alt={type.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    </div>
                    <h5 style={pageStyles.swiperTitle}>{type.title}</h5>
                    <p style={pageStyles.swiperDescription}>
                      {type.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className="swiper-button-prev"
              style={pageStyles.navigationButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(102, 126, 234, 0.4)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(102, 126, 234, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="ph ph-caret-left"></i>
            </button>
            <button
              className="swiper-button-next"
              style={pageStyles.navigationButton}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(102, 126, 234, 0.4)";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(102, 126, 234, 0.2)";
                e.target.style.transform = "scale(1)";
              }}
            >
              <i className="ph ph-caret-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partnership;
