// PartnerProgram.js
import React, { useState, useEffect } from "react";
import styles from "../../style/PartnerProgram.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Contact from "../../components/Contact";
import BannerSection from "../../components/BannerSection";

const IotCollaboration = () => {
   const [BannerData, setBannerData] = useState(null);
  // Innovations data for Swiper
    const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/iot-collaboration/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
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

  //   const handleHeadingClick = (imageKey) => {
  //     setCurrentImage(imageKey);
  //   };
  const tabContent = {
    sensing: {
      title: "Cutting-Edge Sensing",
      image1: {
        src: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg",
        text: "Nexyos—Leading Provider of Innovative IoT Products",
      },
      image2: {
        bg: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/data.jpg",
      },
    },
    exhibitions: {
      title: "Influential Exhibitions",
      image1: {
        src: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg",
        text: "Nexyos regularly exhibits at global events",
      },
      image2: {
        bg: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/data.jpg",
      },
    },
    industries: {
      title: "Industries",
      image1: {
        src: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/milesight-building.jpg",
        text: "Nexyos regularly exhibits at global events",
      },
      image2: {
        bg: "https://www.milesight.com/static/pc/en/partner/iot-collaboration-start-guide/data.jpg",
      },
    },
  };

  const [currentImage, setCurrentImage] = useState("sensing");
  const content = tabContent[currentImage];

  const handleHeadingClick = (key) => {
    setCurrentImage(key);
  };
    useEffect(() => {
      fetchBannerData();
    }, []);
  return (
    <>
         {/* Hero Section */}
      {BannerData && (
        <BannerSection
          gradient="linear-gradient(
    135deg,
    rgba(102, 126, 234) 0%,
    rgba(118, 75, 162)100%
  )"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title={BannerData.heading}
          subtitle={BannerData.description}
          image={BannerData.image}
        />
      )}
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

      <div className={`${styles.section} container-fluid py-5`}>
        <div className="container">
          <div className="row">
            {/* Left Tabs */}
            <div className="col-md-3">
              <h1 className={styles.mainTitle}  data-aos="fade-right">Why Nexyos ?</h1>

              {Object.entries(tabContent).map(([key, item]) => (
                <div key={key} className={`${styles.headingGroup} mb-4`}>
                  <h5
                    className={`${styles.heading} ${
                      currentImage === key ? styles.active : ""
                    }`}
                    onClick={() => handleHeadingClick(key)}
                  data-aos="fade-right" >
                    {item?.title || "Untitled"}
                  </h5>
                </div>
              ))}
            </div>

            {/* Right Content */}
            <div className="col-md-9">
              {content && (
                <div className={styles.imageContainer2}>
                  <h2 className="mb-3"  data-aos="fade-right">{content.title}</h2>

                  <div className="row">
                    {/* Left Image with text */}
                    <div className="col-md-6 mb-3">
                      <img
                        src={content.image1.src}
                        alt="content"
                        className="img-fluid rounded"
                        style={{
                          height: "20.188rem",
                          objectFit: "contain",
                          width: "100%",
                        }}
                      />
                      <p className="mt-2">{content.image1.text}</p>
                    </div>

                    {/* Right Background Image */}
                    <div className="col-md-6 mb-3">
                      <div
                        className="w-100 h-100 rounded"
                        style={{
                          backgroundImage: `url('${content.image2.bg}')`,
                          backgroundPosition: "center",
                          objectFit: "contain",
                          height: "20.188rem",
                          backgroundSize: "contain",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
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

export default IotCollaboration;
