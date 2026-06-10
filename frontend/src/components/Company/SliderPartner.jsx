import React, { useState } from "react";
import styles from "../../style/PartnerProgram.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SliderPartner = ({title,image,index}) => {
  const [currentImage, setCurrentImage] = useState("default");
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
    <div>
      <div className={`${styles.innovationSection} container-fluid`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className={styles.mainTitle}  data-aos="fade-right">
                Incremental Technology Innovations
              </h1>
              <p className={styles.description}>
                Nexyos's strong R&D strength further helps partners to develop
                their competitive edge through the ability to introduce
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
                  <SwiperSlide key={index}>
                    <div className={styles.innovationCard}>
                      <img
                        src={image}
                        alt={title}
                        className={styles.cardImage}
                      />
                      <h3 className={styles.innovationTitle}  data-aos="fade-right">
                        {title}
                      </h3>
                    </div>
                  </SwiperSlide>
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
    </div>
  );
};

export default SliderPartner;
