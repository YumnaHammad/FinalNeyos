import React, { useState, useEffect } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const Slider = ({ data=[], activeSlide = 0 }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);

  const next = () => {
    setCurrentSlide((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  const getStyles = (index) => {
    if (currentSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (currentSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (currentSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (currentSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (currentSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < currentSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > currentSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <>
      <div className="slideC">
        {data.length > 0 &&
        data.map((item, index) => (
          <React.Fragment key={item.id}>
            <div
              className="slide"
              style={{
                background: item.bgImage
                  ? `url(${item.bgImage}) center/cover no-repeat`
                  : item.bgColor,
                ...getStyles(index),
              }}
            >
              <SliderContent {...item} isActive={currentSlide === index}/>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const SliderContent = ({title, desc, isActive }) => (
  <div
    className={`sliderContent transition-opacity duration-500 ${
      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
    }`}
  >
  </div>
);


export default Slider;
