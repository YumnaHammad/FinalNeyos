import React from "react";
import {
  FaCarSide,
  FaTruck,
  FaBus,
  FaPalette,
  FaTachometerAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdDirections, MdGpsFixed } from "react-icons/md";
import { GiRadarDish } from "react-icons/gi";
import { BsPatchCheckFill } from "react-icons/bs";
import { SiMercedes, SiBmw, SiAudi } from "react-icons/si";
import { BiDotsHorizontal } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import '../../../style/Solution.css';

const Card = ({ title, icon, image, footerColors, children }) => (
  <div
    className="AI_Card flex flex-col bg-cover bg-center rounded-xl overflow-hidden shadow-md  relative"
    style={{ backgroundImage: `url(${image})` }}
  >
    <div
      className="bg-opacity-60 text-white p-5 flex flex-col justify-center mt-12"
      style={{ height: "177px" }}
    >
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-3 pb-1 text-center text-white"  data-aos="fade-right">
          {title}
        </h3>
        <div className="AI_Algorithm_hr"></div>
      </div>
      <div className="mb-4 mt-60 justify-center flex">{icon}</div>
      {children}
    </div>
  </div>
);

const HighlightsCard = () => (
  <div
    className="highlightCard bg-cover bg-center rounded-xl overflow-hidden shadow-md w-full relative"
    style={{
      backgroundImage: `url('https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-more-highlights.jpg?t=1751621798627')`,
    }}
  >
    <div className="bg-opacity-70 text-white p-5 h-full mt-16">
       <div className="flex flex-col items-center justify-center mb-8">
        <h3 className="text-lg font-semibold mb-3 pb-1 text-center text-white"  data-aos="fade-right">
             More Highlights:
        </h3>
        <div className="AI_Algorithm_hr"></div>
      </div>
      <ul className=" text-sm ">
        <li className="flex items-center border-[1px] border-white p-8 rounded-md mb-4 text-xs">
          <BsPatchCheckFill className="me-8" /> High Confidence Level
        </li>
        <li className="flex items-center border-[1px] border-white p-8 rounded-md mb-4 text-xs">
          <MdDirections className="me-8" /> Direction Recognition
        </li>
        <li className="flex items-center border-[1px] border-white p-8 rounded-md mb-4 text-xs">
          <GiRadarDish className="me-8" /> 3D Radar Localization
        </li>
        <li className="flex items-center border-[1px] border-white p-8 rounded-md mb-4 text-xs">
          <FaTachometerAlt className="me-8" /> Speed Measurement
        </li>
        <li className="flex items-center border-[1px] border-white p-8 rounded-md mb-4  text-xs">
          <MdGpsFixed className="me-8" /> GPS
        </li>
      </ul>
    </div>
  </div>
);

const AI_Algorithm = () => {
  return (
    <div className=" px-4 md:px-12  AI_Algorithm border-b-2 border-gray-200 py-20 lg:py-56 ">
      <h2 className="text-2xl md:text-3xl font-semibold text-center"  data-aos="fade-right">
        AI-powered LPR Algorithm
      </h2>
      <div className=" grid lg:grid-cols-5 grid-cols-2 gap-4 justify-center lg:mt-56 mt-24">
        <Card
          title="Vehicle Type"
          icon={
            <div className="flex flex-wrap justify-center items-center text-white text-2xl gap-y-3">
              <div className="w-[34%] flex justify-center">
                <FaCarSide />
              </div>
              <div className="w-[34%] flex justify-center">
                <FaTruck />
              </div>
              <div className="w-[34%] flex justify-center">
                <FaBus />
              </div>
              <div className="w-[34%] flex justify-center">
                <BiDotsHorizontal />
              </div>
            </div>
          }
          image="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-vehicle-type.jpg?t=1751621798627"
        />
        <Card
          title="Vehicle Color"
          icon={<FaCar size={50} />}
          image="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-vehicle-color.jpg?t=1751621798627"
        />
        <Card
          title="Vehicle Make"
          icon={
            <div className="flex flex-wrap justify-center items-center text-white text-2xl gap-y-3">
              <div className="w-[34%] flex justify-center">
                {" "}
                <SiBmw />
              </div>
              <div className="w-[34%] flex justify-center">
                {" "}
                <SiMercedes />
              </div>
              <div className="w-[34%] flex justify-center">
                {" "}
                <SiAudi />
              </div>
              <div className="w-[34%] flex justify-center">
                <BiDotsHorizontal />
              </div>
            </div>
          }
          image="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-vehicle-make.jpg?t=1751621798627"
        />
        <Card
          title="Plate Color"
          icon={<IoColorPaletteSharp size={50}/>}
          image="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-plate-color.jpg?t=1751621798627"
        />
        <HighlightsCard />
      </div>
    </div>
  );
};

export default AI_Algorithm;
