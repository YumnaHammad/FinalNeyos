import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";

const products = [
  {
    title: "TrafficX Camera",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/hot-products-trafficx-camera.jpg?t=1751621798627", 
     soloImage :"https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/trafficx-camera.png?t=1751621829926"
  },
  {
    title: "4G Solar-powered Traffic Sensing Camera",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/hot-products-4g-solar-powered-traffic-sensing-camera.jpg?t=1751621798627",
     soloImage : "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/4g-solar-powered-traffic-sensing-camera.png?t=1751621829926"
  },
  {
    title: "AI Road Traffic Radar Pro Bullet Plus Camera",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/hot-products-ai-road-traffic-radar-pro-bullet-plus-camera.jpg?t=1751621798627",
     soloImage : "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/ai-road-traffic-radar-pro-bullet-plus-camera.png?t=1751621829926"
  },
  {
    title: "AI Road Traffic PTZ Bullet Plus Camera",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/hot-products-ai-road-traffic-ptz-bullet-plus-camera.jpg?t=1751621798627",
    soloImage : "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/ai-road-traffic-ptz-bullet-plus-camera.png?t=1751621829926"
  },
  {
    title: "Indoor Parking Guidance Camera",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/hot-products-indoor-parking-guidance-camera.jpg?t=1751621798627",
    soloImage : 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/indoor-parking-guidance-camera.png?t=1751621829926'
  },
];

export default function HotProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleHover = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = products[currentIndex];

  return (
    <>
      <div className="hidden lg:block">
        <div
          className="bg-black text-white py-24 px-60 flex items-center gap-11 relative justify-between"
          style={{ height: "470px" }}
        >
          <div className="w-1/3">
            <h2 className="text-4xl font-bold mb-6 text-white text-left"  data-aos="fade-right">
              Hot Products
            </h2>
            <ul className="space-y-4">
              {products.map((product, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleHover(index)}
                  className={`cursor-pointer px-12 py-12 
 rounded transition-all duration-200 text-left mb-16${
   currentIndex === index
     ? "bg-[#2C2C2C] font-semibold border-[1px] border-[#888888]"
     : ""
 }`}
                >
                  {product.title}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-20">
              <p className="text-sm">
                <span className="font-bold">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                /
                <span className="text-gray-400">
                  {String(products.length).padStart(2, "0")}
                </span>
              </p>
              <div className="flex">
                {/* Navigation Arrows */}
                <IoIosArrowBack
                  onClick={handlePrev}
                  size={32}
                  className=" text-white bg-gray border-[1px] border-[#888888] px-6 rounded-full me-7"
                />

                <IoIosArrowForward
                  onClick={handleNext}
                  size={32}
                  className="text-white border-[1px] border-[#888888] px-6 rounded-full"
                />
              </div>
            </div>
          </div>

          <motion.div
            key={currentProduct.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[60%] relative bg-white rounded-lg overflow-hidden shadow-lg px-2"
            style={{ height: "350px" }}
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-full rounded-lg "
              style={{ height: "354px" }}
            />
            <div className="absolute bottom-[10px] left-0 w-full px-4 py-3">
              <p className="text-medium font-medium text-base text-left ps-12">
                {currentProduct.title} <span className="ml-2">&rarr;</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="block lg:hidden bg-gray-100 py-28">
         <h2 className="text-4xl font-bold mb-28 "  data-aos="fade-right">
              Hot Products
            </h2>
           {products.map((item, index) => (
 <div key={index} className="flex items-center justify-between bg-white rounded-xl p-12 transition mb-8 mx-20 " >
  <div className="flex items-center justify-start"> <img src={item.soloImage} alt={item.title} className="object-contain me-10" style={{width:'78px',height:'78px'}}/><p className="text-gray-800 font-medium text-left">{item.title}</p></div>
  <div>  <GoArrowRight  className="text-gray-400" /></div> 
    </div> ))}
      </div>
    </>
  );
}
