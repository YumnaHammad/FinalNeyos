import React, { useState } from 'react';
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import CCTVSurveillanceCameras from '../../assets/images/nexyos/CCTVSurveillanceCameras.jpg'
import ProGROUPCAMERA from '../../assets/images/nexyos/ProGROUPCAMERA.png'
import PTZGROUPCAMERA from '../../assets/images/nexyos/PTZGROUPCAMERA.png'
import panaromic from '../../assets/images/nexyos/panaromic.png'
import CCTVSurveillanceCamerasBg from '../../assets/images/nexyos/CCTVSurveillanceCamerasBg.jpg'
const coffeeItems = [
  {
    image: CCTVSurveillanceCameras,
    title: 'CCTVSurveillanceCameras',
    para: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
  {
    image: ProGROUPCAMERA,
    title: 'ProGROUPCAMERA',
      para: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
  {
    image: PTZGROUPCAMERA,
    title: 'PTZGROUPCAMERA',
      para: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
  {
    image: CCTVSurveillanceCamerasBg,
    title: 'CCTVSurveillanceCamerasBg',
      para: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
  {
    image: panaromic,
    title: 'panaromic',
      para: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
];

const SliderTest = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(prev => (prev + 1) % coffeeItems.length);
  };

  const handlePrev = () => {
    setIndex(prev => (prev - 1 + coffeeItems.length) % coffeeItems.length);
  };

  return (
    <div className="relative flex items-center flex-col md:flex-row SliderTest" >
      {/* Background/Main Image */}
      <div className="md:w-1/2 w-full h-[80vh] ">
        <AnimatePresence mode="wait">
          <motion.img
            key={coffeeItems[index].image}
            src={coffeeItems[index].image}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-none
"
            style={{borderRadius:'0px',height:'80vh'}}/>
        </AnimatePresence>
      </div>
      {/* Vertical Circles in Center */}
      <div className="absolute
flex gap-4 z-10 justify-center items-center vertical-image">
        {coffeeItems.map((item, i) => (
          <div
            key={i}
            className={`rounded-full overflow-hidden border-4 transition-all duration-300 ${
              i === index ? 'border-[#014E61] scale-110' : 'opacity-40'
            }`}
            style={{ width: '64px', height: '64px' }}
          >
            <img src={item.image} alt={`coffee-${i}`} className="w-full h-60 object-cover " />
          </div>
        ))}
      </div>

      {/* Text Column */}
      <div className="md:w-1/2 w-full h-[80vh]  flex justify-start px-72 ">
        <div className="flex justify-start flex-col">
          {/* Dial */}
          <div className="relative w-90 h-90 ">
            <div className="absolute top-1/2 left-1/2 w-60 border-t-2 border-[#014E61] transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            <div className="absolute w-full top-1/4 left-1/2 transform -translate-x-1/2 text-sm flex justify-end">0{index + 1}</div>
            <div className="absolute w-full bottom-1/4 left-1/2 transform -translate-x-1/2 text-sm flex justify-start">05</div>
          </div>

          <div className="flex justify-start flex-col space-y-6" style={{ height: '300px' }}>
  {/* Title + Para animation block */}
  <AnimatePresence mode="wait">
    <motion.div
      key={coffeeItems[index].title}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-start">
        {coffeeItems[index].title}
      </h2>
      <p className="text-base text-start mt-4">
        {coffeeItems[index].para}
      </p>
    </motion.div>
  </AnimatePresence>
</div>

        </div>
      </div>

      {/* Arrow Controls */}
      <div className="absolute right-8 flex flex-col gap-4 z-20 slider-arrow">
        <button onClick={handlePrev}><GoArrowUp size={32} color="black" /></button>
        <button onClick={handleNext}><GoArrowDown size={32} color="black" /></button>
      </div>
    </div>
  );
};

export default SliderTest;
