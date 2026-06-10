import React, { useRef,useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/navigation";
import "swiper/css/pagination";
import '../../style/TimelineSlider.css'

const TimelineSlider = () => {
  const swiperRef = useRef(null);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get("https://portal.nexyos.com/api/home/sec/four");
        setSliderData(response.data); 
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };

    fetchSliderData();
  }, []);

  return (
    <div className="bdt-timeline-container">
      <div className="contenttimeline">
        <h2 className="text-center "  data-aos="fade-right">Success Stories</h2>
        <p className="text-center">
          Mexyos has earned a lot of fame and built a strong reputation with a
          ton of success stories in various industries.
        </p>
      </div>

      <div className="upk-salf-slider-wrapper">
        <Swiper
          modules={[Parallax, Navigation, Pagination, Autoplay]}
          direction="vertical"
          parallax={true}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          navigation={{
            prevEl: ".upk-button-prev",
            nextEl: ".upk-button-next",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="swiper-container mySwiper2"
        >
          {sliderData.map((item, index) => (
            <SwiperSlide key={index} className="upk-salf-item">
              <div className="upk-salf-image-wrap">
                <img
                  className="upk-xanc-img "
                 
                  src={item.image}
                  alt="slide"
                />
              </div>
              <div className="upk-salf-content-wrap">
                <h3
                  className="upk-salf-title"
                  data-swiper-parallax-y="-150"
                  data-swiper-parallax-duration="1200"
                >
                  {item.head}
                </h3>
                <div
                  className="upk-salf-desc"
                  data-swiper-parallax-y="-200"
                  data-swiper-parallax-duration="1400"
                >
                  {item.desc}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev upk-button-prev"></div>
        <div className="swiper-button-next upk-button-next"></div>

        {/* Custom Pagination */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default TimelineSlider;
