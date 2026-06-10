import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CarouselCard({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex items-center justify-center py-10 relative w-full ">
             {/* Left arrow - outside card */}
       <button
         onClick={prevSlide}
         className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-20"
       >
         <FaChevronLeft size={32} className="text-gray-800" />
       </button>

      {/* Card */}
      <div className="relative max-w-6xl w-full flex bg-white rounded-md shadow-lg overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex w-full transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? "opacity-100 relative" : "opacity-0 absolute"
            }`}
          >
            {/* Image */}
            <div className="w-1/2">
              <img
                src={slide.image1|| slide.image}
                alt={slide.title}
                className="w-full h-full "
                style={{borderRadius: '0px'}}/>
            </div>

            {/* Text Content */}
            <div className="w-1/2 p-10 flex flex-col justify-center">
              {slide.image2 && (
                <img
                  src={slide.image2|| slide.logo}
                  alt="logo"
                  className={`w-[23%] mb-6  mx-auto`}/>
              )}
              <h2 className="text-2xl font-bold mb-4">{slide.heading|| slide.title}</h2>
              <p className="text-gray-600 mb-6 italic">"{slide.description || slide.text}"</p>
              <p className="font-bold mb-6 text-black">- {slide.author}</p>
              {slide.link && (
                <a
                  href={slide.link}
                  className="text-blue-600 font-medium hover:underline flex items-center"
                >
                  {slide.linkText || "Read this case study"}
                  <span className="ml-1">→</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

             {/* Right arrow - outside card */}
       <button
         onClick={nextSlide}
         className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full z-20"
       >
         <FaChevronRight size={32} className="text-gray-800" />
       </button>

             {/* Pagination dots */}
       <div className="flex space-x-20 absolute -bottom-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-32 h-[4px] rounded-full  ${
              index === activeIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          style={{marginLeft: '23px',padding: '0px'}}></button>
        ))}
      </div>
    </div>
  );
}
