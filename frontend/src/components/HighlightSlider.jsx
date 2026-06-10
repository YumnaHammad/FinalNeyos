import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, forwardRef } from "react";
import {  motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/SpaceOccupancy/SuperiorHighlights.css";

const HighlightSlider = forwardRef(({ title, items = [] }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="slide-container relative" ref={ref}>
      {title && <h3 data-aos="fade-right">{title}</h3>}

      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={3}
        spaceBetween={25}
        grabCursor
        onSlideChange={handleSlideChange}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          520: { slidesPerView: 2 },
          950: { slidesPerView: 3 },
        }}
        className="slide-content"
      >
        {items.map((item, idx) => {
          const visibleSlides = [activeIndex, activeIndex + 1];
          const isVisible = visibleSlides.includes(idx);

          return (
            <SwiperSlide key={item.id || idx}>
              <div className="card">
                <div className="image-content">
                  <div className="card-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img"
                    />
                  </div>
                </div>

                <div className="card-content">
                  <h2 className="name">{item.name}</h2>

                  <AnimatePresence mode="wait">
                    {isVisible ? (
                      <motion.p
                        key={`desc-${idx}-${activeIndex}`}
                        className="description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {item.description}
                      </motion.p>
                    ) : (
                      <p className="description">{item.description}</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        className={`custom-swiper-button-prev swiper-button-prev ${
          isBeginning ? "disabled" : ""
        }`}
        disabled={isBeginning}
      />
      <button
        className={`custom-swiper-button-next swiper-button-next ${
          isEnd ? "disabled" : ""
        }`}
        disabled={isEnd}
      />
    </div>
  );
});

export default HighlightSlider;
