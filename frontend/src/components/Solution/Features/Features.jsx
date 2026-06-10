import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Features.css";
import { FaAngleRight, FaAngleDown, FaAngleUp } from "react-icons/fa";
import AI_Algorithm from "./AI_Algorithm";
import ModelsAndLenses from "./ModelsAndLenses";
import PrivacyAndProtection from "./PrivacyAndProtection";

const features = [
  {
    id: 1,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "Frame Parity Flashing technology",
    description:
      " means the cameras take several images of the vehicle with different illumination levels, and the system will then automatically ",
    span2: "select the best image for ANPR processing.",
    description2:
      "lt ensures clear capture of the vehicle body and license plate (reflective & non-reflective plates). Two different intensities of the built-in illumination may be defined for the even/odd frames.",
    description3: "",
    description4: "",
  },
  {
    id: 2,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "Global Shutter",
    description:
      " technology enhances surveillance capabilities by ensuring comprehensive coverage with ",
    span2: "a high capture rate",
    description2:
      ". It maintains high-quality images and enables advanced event analysis while reducing the need for manual intervention, improving operational efficiency.",
    description3: "",
    description4: "",
  },
  {
    id: 3,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "",
    description: "Optimize license plate identification by utilizing our ",
    span2: "optional dual IR wavelengths (850nm and 740nm)",
    description2:
      ", enabling precise recognition across different contrast levels and lighting conditions.",
    description3:
      "850nm IR Wavelength: Ideal for High-contrast/ Non-reflective License Plate.",
    description4:
      "740nm IR Wavelength: Ideal for Low-contrast/ Reflective License Plate.",
  },
  {
    id: 4,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "",
    description:
      "Up to 50m ANPR distance, precise recognition for ANPR processing within the range.",
    span2: "",
    description2: "",
    description3: "",
    description4: "",
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const currentFeature =
    features[hoverIndex !== null ? hoverIndex : activeIndex];
  const [openKey, setOpenKey] = useState("parity");
  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <section className="Feature_container bg-gray-100 rounded-lg pb-28 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="Feature_heading text-lg text-black m-0"  data-aos="fade-right">
          {currentFeature.heading}
        </h2>
      </div>
      <div className="hidden lg:block pb-8">
        <div className="max-w-4xl bg-white mx-auto grid md:grid-cols-2 gap-10 items-center px-18 py-18 rounded-lg">
          <motion.div
            key={currentFeature.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-700 text-sm leading-relaxed text-left">
              <span className="text-black font-semibold">
                {currentFeature.span}
              </span>
              {currentFeature.description}
              <span className="text-blue-500">{currentFeature.span2}</span>
              {currentFeature.description2}
              <br />
              {currentFeature.description3}
              <br />
              {currentFeature.description4}
            </p>
          </motion.div>
          <motion.div
            key={currentFeature.image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={currentFeature.image}
              alt={currentFeature.title}
              className="w-full rounded-xl "
            />
          </motion.div>
        </div>

        <div className="Features_circles mt-2 flex justify-between gap-6 flex-wrap">
          {features.map((item, index) => (
            <div
              className={`group cursor-pointer flex flex-col items-center w-[11rem] transition-all duration-300 ${
                activeIndex === index ? "" : "text-gray-600"
              }`}
              style={{ height: "22vh" }}
            >
              <div
                key={item.id}
                onMouseEnter={() => setHoverIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-[4rem] h-[4rem] rounded-full flex items-center justify-center overflow-hidden shadow-md transition ${
                  activeIndex === index ? "" : ""
                }`}
              >
                <img
                  src={
                    hoverIndex === index ? item.hoverIconImage : item.iconImage
                  }
                  alt={item.title}
                  className="object-contain"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="mt-2 text-center text-sm font-medium leading-tight">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block lg:hidden w-[90%] pb-40">
        <div className="featureTab">
          {features.map((feat) => {
            const isOpen = openKey === feat.id;
            return (
              <div
                key={feat.id}
                className="mb-11 bg-white rounded-lg shadow overflow-hidden p-32"
              >
                <button
                  onClick={() => toggle(feat.id)}
                  className="w-full flex items-center justify-between px-4 py-2 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={feat.iconImage}
                      alt={feat.title}
                      className="object-contain"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {feat.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <FaAngleUp className="text-gray-500" />
                  ) : (
                    <FaAngleDown className="text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 pb-4 text-xs text-gray-600 space-y-3 mt-16"
                  >
                    <p className="text-gray-700 text-sm leading-relaxed text-left">
                      <span className="text-black font-semibold">
                        {feat.span}
                      </span>
                      {feat.description}
                      <span className="text-blue-500">{feat.span2}</span>
                      {feat.description2}
                      <br />
                      {feat.description3}
                      <br />
                      {feat.description4}
                    </p>
                    <div className="w-full flex justify-center mt-4">
                      <img
                        src={feat.image}
                        alt={feat.title}
                        className="rounded border shadow-sm w-full max-w-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AI_Algorithm/>
      <ModelsAndLenses/>
      <PrivacyAndProtection/>
    </section>
  );
}
