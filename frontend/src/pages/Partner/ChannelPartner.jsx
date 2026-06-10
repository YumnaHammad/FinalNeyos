// PartnerProgram.js
import React, { useState } from "react";
import styles from "../../style/PartnerProgram.module.css";
import BannerModal from "../../components/Company/BannerModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Contact from "../../components/Contact";

const PartnerProgram = () => {
  const [currentImage, setCurrentImage] = useState("default");

  // Images data
  const images = {
    default:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    sensing:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    exhibitions:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    industries:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-at-glance.png?t=1746582988309",
    sensors:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-product-portfolio.png?t=1746582988309",
    experience:
      "https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703",
  };

  // Innovations data for Swiper
  const innovations = [
    {
      title: "AIGT",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
    {
      title: "Advanced Analytics",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
    },
    {
      title: "IoT Integration",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Smart Detection",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
    {
      title: "Heat Mapping",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Cloud AI",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Video Intelligence",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
    },
    {
      title: "Edge Computing",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
  ];

  const handleHeadingClick = (imageKey) => {
    setCurrentImage(imageKey);
  };

  return (
    <>
      <BannerModal 
        title="Nexyos Partner Program"
        description="Join our comprehensive partner program designed to support profitable growth with sales, marketing, and technical expertise."
      />

      {/* Partner Program Section */}
      <div className={`${styles.programSection} container`}>
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <img
              src="https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703"
              alt="Nexyos Partner"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-lg-7">
            <div className={`${styles.programCard} p-4 p-md-5`}>
              <div className="card-body">
                <h3 className={`${styles.programSubtitle} mb-4`}  data-aos="fade-right">
                  Nexyos Partner Program
                </h3>
                <p className={styles.programText}>
                  Nexyos Partner Program is designed to provide a flexible and
                  valuable platform that supports the profitable growth of our
                  partners and distributors as well as provides committed
                  support that encompasses sales, marketing, and technical
                  support. With the insights and expertise in industries of
                  Internet of Things (IoT) and Video Surveillance, our partners
                  can access to a broad range of our products and services
                  designed to help partners address challenges and outperform in
                  the stiff competition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Nexyos Section */}
      <div className={`${styles.section} container-fluid py-5`}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h1 className={styles.mainTitle}  data-aos="fade-right">Why Nexyos ?</h1>

              <div className={`${styles.headingGroup} mb-4`}  data-aos="fade-right">
                <h5
                  className={styles.heading}
                  onClick={() => handleHeadingClick("sensing")}
                 data-aos="fade-right">
                  Cutting-Edge Sensing Products Provider Serving Millions of
                  People Worldwide
                </h5>
              </div>

              <div className={`${styles.headingGroup} mb-4`}>
                <h5
                  className={styles.heading}
                  onClick={() => handleHeadingClick("exhibitions")}
                data-aos="fade-right" >
                  Active Participant in Influential Exhibitions
                </h5>
              </div>

              <div className={`${styles.headingGroup} mb-4`}>
                <h5
                  className={styles.heading}
                  onClick={() => handleHeadingClick("industries")}
                 data-aos="fade-right">
                  Prominent Presence in Industries
                </h5>
              </div>
            </div>

            <div className="col-md-7">
              <div className={styles.imageContainer}>
                <img
                  src={images[currentImage]}
                  alt="Nexyos content"
                  className={`${styles.mainImage} img-fluid rounded`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Innovations Section with Swiper */}
      <div className={`${styles.innovationSection} container-fluid`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className={styles.mainTitle}  data-aos="fade-right">
                Incremental Technology Innovations
              </h1>
              <p className={styles.description}>
                Milesight's strong R&D strength further helps partners to
                develop their competitive edge through the ability to introduce
                innovative products and address both hardware and software
                needs, deliver unmatched global reach and maximize business
                potential.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12 position-relative">
              <Swiper
                modules={[Navigation, Autoplay]} // Added Autoplay module
                spaceBetween={30}
                slidesPerView={1}
                navigation={{
                  nextEl: `.${styles.swiperButtonNext}`,
                  prevEl: `.${styles.swiperButtonPrev}`,
                }}
                autoplay={{
                  delay: 2500, // Delay between transitions in ms (default 3000)
                  disableOnInteraction: false, // Continue autoplay after user interaction
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                }}
                className={styles.swiperContainer}
              >
                {innovations.map((innovation, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.innovationCard}>
                      <img
                        src={innovation.image}
                        alt={innovation.title}
                        className={styles.cardImage}
                      />
                      <h3 className={styles.innovationTitle}  data-aos="fade-right">
                        {innovation.title}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation */}
              <div className={styles.swiperNavigation}>
                <div
                  className={`${styles.swiperButtonPrev} swiper-button-prev`}
                ></div>
                <div
                  className={`${styles.swiperButtonNext} swiper-button-next`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default PartnerProgram;
