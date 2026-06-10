import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const timelineData = [
  {
    id: 1,
    description: "No Plates Detection",
    image: "https://i.ytimg.com/vi/u2qIY74vnRk/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 2,
    description: "Reverse Driving Detection",
    image: "https://i.ytimg.com/vi/c7NQdRw_Gcs/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 3,
    description: "Outdoor Parking Occupancy Detection",
    image: "https://i.ytimg.com/vi/gwVVTiLG4rY/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 4,
    description: "Outdoor Parking LPR Detection",
    image: "https://i.ytimg.com/vi/JjO_TbKHd30/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 5,
    description: "Illegal Parking Detection / Vehicle Flow Analysis / Vehicle Brand Detection",
    image: "https://i.ytimg.com/vi/XhtrUR2GO7k/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787",
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
    {
    id: 6,
    description: "VMS Enterprise Server Based ANPR",
    image: "https://i.ytimg.com/vi/tAhszaHrceI/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787",
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
    {
    id: 7,
    description: "White LED Supplement Light",
    image: "https://i.ytimg.com/vi/wn18oEzY5yk/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787",
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
];
const DemoVideoData = [
  {
    id: 1,
    description: "Europe (Germany, UK, Italy and Spain)",
    image: "https://i.ytimg.com/vi/oVw2O1hTqc4/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 2,
    description: "North America (Canada, USA and Mexico)",
    image: "https://i.ytimg.com/vi/MKUPB-dGQvA/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 3,
    description: "South America (Brazil, Private & Commercial Vehicles)",
    image: "https://i.ytimg.com/vi/pM3dbPsrbUw/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 4,
    description: "Asia (Korea, Japan and Turkey)",
    image: "https://i.ytimg.com/vi/ng3PYt70cWk/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787", // default overlay
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
  {
    id: 5,
    description: "Middle East (UAE, GCC Countries)",
    image: "https://i.ytimg.com/vi/CHNH7TA6CrU/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787",
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
    {
    id: 6,
    description: "Taiwan",
    image: "https://i.ytimg.com/vi/2rwYCLZovNw/maxresdefault.jpg",
    overlay1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play.png?t=1752047441787",
    overlay2: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index/play-hover.png?t=1752047441787",
  },
];
const SolutionVideo = () => {
  const [index, setIndex] = useState(0);
 const [index1, setIndex1] = useState(0);

  const handleNext = () => {
    if (index < timelineData.length - 2) setIndex(index + 1);
  };
  const handleDemoNext = () => {
    if (index1 < DemoVideoData.length - 2) setIndex1(index1 + 1);
  };
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };
   const handleDemoPrev = () => {
    if (index1 > 0) setIndex1(index1 - 1);
  };
  const currentItem = timelineData[index];

  return (
    <>
    <h4 className="mt-48"  data-aos="fade-right">Video</h4>
    <div className="flex justify-between px-28">
      <h5  data-aos="fade-right">Feature Demonstration</h5>
          <div className="flex">
                      <button
          onClick={handlePrev}
          disabled={index === 0}
          className="VideosArrowBack me-12"
        >
          <IoIosArrowBack />
        </button>
<button
          onClick={handleNext}
          disabled={index >= timelineData.length - 4}
          className="VideosArrowNext"
        >
         <IoIosArrowForward />
        </button>


      </div>
    </div>
    <div
      className="bg-white text-white p-10 rounded-md  "
      style={{ height: "19rem" }}
    >
      
      <div className="relative flex items-center justify-center">
      
        <div className="overflow-hidden w-[1150px]">
          <motion.div
            className="flex"
            initial={false}
            animate={{ x: -index * 570 }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className="w-[346px] h-[250px] bg-gray-100 mx-2 flex-shrink-0 rounded-xl flex flex-col items-start justify-end p-12"
              >
                {/* Image Section */}
                <div className="relative w-full bg-gray-100  group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full "
                  />
                  {/* Overlay image (changes on hover) */}
                  <img
                    src={item.overlay1}
                    alt="Overlay"
                    className="absolute  group-hover:opacity-0 transition duration-300"
                  />
                  <img
                    src={item.overlay2}
                    alt="Overlay Hover"
                    className="absolute  opacity-3 group-hover:opacity-100 transition duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 mt-12 w-full">
                  <p className="text-sm text-black text-center ">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>   
                        {/* Demo Videos */}
    <div className="flex justify-between px-28">
      <h5  data-aos="fade-right">Demo Video Around the World</h5>
          <div className="flex">
                      <button
          onClick={handleDemoPrev}
          disabled={index1 === 0}
          className="VideosArrowBack me-12"
        >
          <IoIosArrowBack />
        </button>
<button
          onClick={handleDemoNext}
          disabled={index1 >= DemoVideoData.length - 3}
          className="VideosArrowNext"
        >
         <IoIosArrowForward />
        </button>


      </div>
    </div>
    <div
      className="bg-white text-white p-10 rounded-md  "
      style={{ height: "19rem" }}
    >
      
      <div className="relative flex items-center justify-center">
      
        <div className="overflow-hidden w-[1150px]">
          <motion.div
            className="flex"
            initial={false}
            animate={{ x: -index1 * 570 }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {DemoVideoData.map((item, idx) => (
              <div
                key={idx}
                className="w-[346px] h-[250px] bg-gray-100 mx-2 flex-shrink-0 rounded-xl flex flex-col items-start justify-end p-12"
              >
                {/* Image Section */}
                <div className="relative w-full bg-gray-100  group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full "
                  />
                  {/* Overlay image (changes on hover) */}
                  <img
                    src={item.overlay1}
                    alt="Overlay"
                    className="absolute  group-hover:opacity-0 transition duration-300"
                  />
                  <img
                    src={item.overlay2}
                    alt="Overlay Hover"
                    className="absolute  opacity-3 group-hover:opacity-100 transition duration-300"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 mt-12 w-full">
                  <p className="text-sm text-black text-center ">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SolutionVideo;
