import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Upload } from "lucide-react";
import '../../../style/Solution.css';
const models = [
  {
    title: "Dome",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-dome.png?t=1751621798627",
  },
  {
    title: "Bullet",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-bullet.png?t=1751621798627",
  },
  {
    title: "Dual-lens",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-dual-lens.png?t=1751621798627",
  },
  {
    title: "Low Consumption",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-low-consumption.png?t=1751621798627",
  },
  {
    title: "Supplement Light",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-supplement-light.png?t=1751621798627",
  },
  {
    title: "Radar Module",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-radar-module.png?t=1751621798627",
  },
  {
    title: "PTZ Bullet",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-ptz-bullet.png?t=1751621798627",
  },
  {
    title: "Speed Dome",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-models-speed-dome.png?t=1751621798627",
  },
];

const ModelsAndLenses = () => {
  const [current, setCurrent] = useState(0);

  const nextModel = () => {
    setCurrent((prev) => (prev + 1) % models.length);
  };

  const prevModel = () => {
    setCurrent((prev) => (prev - 1 + models.length) % models.length);
  };
  return (
    <div className=" py-18 ">
      <h2 className="text-2xl font-semibold text-center  "  data-aos="fade-right">
        Diverse Range of Models and Lenses
      </h2>
      <div className="flex flex-row gap-6 lg:max-w-7xl mx-auto">
        {/* Lenses Section */}
        <div className="rounded-xl flex-col justify-center items-center relative lg:flex hidden ">
          <img
            src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-lenses.jpg?t=1751621798627"
            alt="Lenses"
            className="rounded-lg mb-4 LensesImage"
          />
          <div className="lensesContent text-left px-2 absolute bottom-8">
            <h3 className="text-xl font-semibold text-white"  data-aos="fade-right">Lenses</h3>
            <p className="text-sm text-white">
              4X/5X/12X/36X Optical AF Lens <br />
              Motorized 2.7~13.5mm / 3.6~10mm @F1.4
            </p>
          </div>
        </div>

        {/* Models Grid */}
        <div className="bg-white p-12 rounded-xl hidden lg:block ">
          <h5 className="text-left"  data-aos="fade-right">Models</h5>

          <div className="grid grid-cols-1 md:grid-cols-4  gap-10 ">
            {models.map((model, index) => (
              <div
                key={index}
                className="ModelCard bg-gray-100 p-4 rounded-xl transition"
              >
                <img
                  src={model.img}
                  alt={model.title}
                  className="mx-auto mb-2 ModelsImages"
                />
                <p className="text-center font-medium text-gray-700">
                  {model.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="block lg:hidden MAL_Mobile mt-56 mb-28 w-full">
          <div className="M0delsLensesCards relative w-full max-w-sm mx-auto p-20 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-medium mb-4 text-black">Models</div>

              {/* Arrows */}
              <div className="absolute right-6 flex space-x-2">
                <button onClick={prevModel} className="ModelButton me-8">
                  <ChevronLeft className="ModelRight text-gray-600 hover:text-black" />
                </button>
                <button onClick={nextModel} className="ModelButton">
                  <ChevronRight className="ModelLeft text-gray-600 hover:text-black" />
                </button>
              </div>
            </div>
            {/* Image and Title */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <img
                src={models[current].img}
                alt={models[current].title}
                className="object-contain"
              />
              <p className="text-gray-700 text-lg font-medium">
                {models[current].title}
              </p>
            </div>
            {/* Range Display */}
            <div className="mt-6 text-center text-gray-600 text-lg">
              <span className="font-bold text-black">{current + 1}</span>
              <span className="mx-2 font-normal">—</span>
              <span>{models.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsAndLenses;
