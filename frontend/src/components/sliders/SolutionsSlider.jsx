import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const SolutionsSlider = ({ title, subtitle, data = [],icon, background}) => {
  const pageStyles = {
    darkSection: {
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
      backgroundColor: "white",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "2rem",
      textAlign: "center",
      transition: "all 0.4s ease",
      position: "relative",
      overflow: "hidden",
      height: "100%",
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
      color: "#0f3460",
      marginBottom: "0.75rem",
    },
    swiperDescription: {
      fontSize: "0.9rem",
      color: "black",
      lineHeight: "1.5",
    },
  };
  return (
    <div style={{...pageStyles.darkSection,
    background: background
    }}>
      <div className="container">
        <h1 style={pageStyles.darkSectionTitle}>
          {icon && <i className={`${icon} me-2`}></i>}
          {title}
        </h1>
        {subtitle && <p style={pageStyles.darkSectionSubtitle}>{subtitle}</p>}
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
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                 style={{
                      ...pageStyles.swiperCard,
                      border: `2px solid #2c3e50`,
                    }}
                     onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-15px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0, 0, 0, 0.3)";
                      e.currentTarget.style.borderColor = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = '#2c3e50';
                    }}
                >
                     <div
                      style={{
                        ...pageStyles.swiperIcon,
                        boxShadow: `0 0 20px #2c3e50 40`,
                      }}
                    >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="img-fluid mb-3"
                       style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover",  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",}}
                    />
                  )}
</div>
                  <h5 style={pageStyles.swiperTitle}>{item.heading}</h5>
                  <p style={pageStyles.swiperDescription}>
                    {item.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSlider;
