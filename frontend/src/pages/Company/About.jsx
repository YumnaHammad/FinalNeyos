import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "../../style/About.css";
import RPlayer from "../../components/Company/ReactPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerSection from "../../components/BannerSection";

const About = () => {
  const [data, setData] = useState(null);
  const [BannerData, setBannerData] = useState(null);
  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/about-us/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/about-us/section-3")
      .then((response) => {
        const resp = response.data;
        if (Array.isArray(resp)) {
          setData(resp);
        } else if (resp) {
          setData([resp]);
        }
      })
      .catch((error) => {
        console.error("Error fetching banner data:", error);
      });

    fetchBannerData();
  }, []);

  // ✅ Add a guard clause here
  if (!data || data.length === 0) return null;

  // Group strengths into arrays of 3 for each slide
  const groupedStrengths = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedStrengths.push(data.slice(i, i + 3));
  }

  const creativeEffect = {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
      rotate: [0, 0, -30],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
      rotate: [0, 0, 30],
    },
  };

  return (
    <>
      {BannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-left"
          textAlign="text-left"
          textColor="text-[#121535]"
          title={BannerData.head}
          subtitle={BannerData.desc}
          image={BannerData.image}
        />
      )}
      <RPlayer />
      <section className="container superior">
        <div className="center-wrap">
          <div className="content wow animate__fadeInUp">
            <h2 className="title" data-aos="fade-right">
              Superior Strength
            </h2>
            <div className="swipers">
              <Swiper
                grabCursor={true}
                effect={"creative"}
                creativeEffect={creativeEffect}
                modules={[EffectCreative, Autoplay]}
                className="swiper-superior swiper-creative swiper-3d"
                loop={true}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
              >
                {groupedStrengths.map((group, groupIndex) => (
                  <SwiperSlide key={groupIndex}>
                    <div className="cards-group">
                      {group.map((item, index) => {
                        const apiItem = data[groupIndex * 3 + index];
                        if (!apiItem) return null;

                        const image =
                          apiItem.image ||
                          apiItem.img ||
                          apiItem.image_url ||
                          apiItem.src ||
                          "";
                        const head =
                          apiItem.head ||
                          apiItem.title ||
                          apiItem.heading ||
                          apiItem.name ||
                          "";
                        const desc =
                          apiItem.desc ||
                          apiItem.description ||
                          apiItem.body ||
                          "";

                        return (
                          <div className="card" key={index}>
                            <img
                              alt={`icon for ${head}`}
                              src={image}
                              className="lazyloaded"
                              title={`icon for ${head}`}
                            />
                            <h3 className="card-title" data-aos="fade-right">
                              {head}
                            </h3>
                            <p className="card-text">{desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
