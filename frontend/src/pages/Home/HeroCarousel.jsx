import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import API, { resolveMediaUrl } from '../../api';
import './HeroCarousel.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const FALLBACK_SLIDES = [
  {
    title: 'Pioneering the Future of IoT',
    miniTitle: 'NEXT-GEN SOLUTIONS',
    subtitle:
      'Transforming industries with intelligent sensing and real-time data insights.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    button: 'Explore Solutions',
    buttonLink: '/solution',
  },
];

const normalizeSlides = (content) => {
  if (!Array.isArray(content) || content.length === 0) return FALLBACK_SLIDES;
  return content
    .filter((item) => item?.image)
    .map((item, index) => ({
      id: item._id || index,
      title: item.title || '',
      miniTitle: item.miniTitle || '',
      subtitle: item.subtitle || '',
      image: resolveMediaUrl(item.image),
      button: item.button || 'Learn More',
      buttonLink: item.buttonLink || '#',
    }));
};

const HeroCarousel = () => {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/sec/1')
      .then((res) => {
        const items = normalizeSlides(res.data?.content);
        if (items.length > 0) setSlides(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="hero-carousel hero-carousel--loading">
        <div className="hero-carousel__spinner" />
      </div>
    );
  }

  return (
    <section className="hero-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop={slides.length > 1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-carousel__swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id ?? index}>
            <div className="hero-carousel__slide">
              <img
                src={slide.image}
                alt={slide.title || 'Banner'}
                className="hero-carousel__image"
              />
              <div className="hero-carousel__overlay" />

              <div className="hero-carousel__content">
                {activeIndex === index && (
                  <motion.div
                    className="hero-carousel__text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {slide.miniTitle && (
                      <motion.span
                        className="hero-carousel__badge"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {slide.miniTitle}
                      </motion.span>
                    )}

                    {slide.title && (
                      <motion.h1
                        className="hero-carousel__title"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                      >
                        {slide.title}
                      </motion.h1>
                    )}

                    {slide.subtitle && (
                      <motion.p
                        className="hero-carousel__subtitle"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                    )}

                    {slide.button && (
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                      >
                        {slide.buttonLink && slide.buttonLink !== '#' ? (
                          <Link to={slide.buttonLink} className="hero-carousel__cta">
                            <span>{slide.button}</span>
                            <FaArrowRightLong className="hero-carousel__cta-icon" />
                          </Link>
                        ) : (
                          <button type="button" className="hero-carousel__cta">
                            <span>{slide.button}</span>
                            <FaArrowRightLong className="hero-carousel__cta-icon" />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {slides.length > 1 && (
                <div className="hero-carousel__counter">
                  <span className="hero-carousel__counter-current">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="hero-carousel__counter-divider" />
                  <span className="hero-carousel__counter-total">
                    {String(slides.length).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;
