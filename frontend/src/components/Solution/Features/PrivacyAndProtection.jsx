import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw, Upload } from "lucide-react";

const privacies = [
  {
    title: "Masking of License Plates and Faces",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/masking-of-license-plates-and-faces.jpg?t=1751621798627",
  },
  {
    title: "Offline Data Re-synchronization",
    img: "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/offline-data-re-scynchronization.jpg?t=1751621798627",
  },
];
const PrivacyAndProtection = () => {
  const [current, setCurrent] = useState(0);

  const nextModel = () => {
    setCurrent((prev) => (prev + 1) % privacies.length);
  };

  const prevModel = () => {
    setCurrent((prev) => (prev - 1 + privacies.length) % privacies.length);
  };
  return (
    <div className="bg-gray-100 py-10 mt-28 px-4 ">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-28"  data-aos="fade-right">
        Enhanced Privacy & Data Protection
      </h2>

      <div className="hidden lg:block">
        <div className="flex flex-col md:flex-row justify-center gap-6  ">
          {/* Card 1 */}
          <div
            className=" rounded-xl overflow-hidden "
            style={{ width: "45%" }}
          >
            <img
              src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/masking-of-license-plates-and-faces.jpg?t=1751621798627"
              alt="Masking of license plates and faces"
              className="w-full h-auto object-cover"
            />
            <div className="text-center p-4 text-gray-800 font-medium mt-8">
              Masking of License Plates and Faces
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl overflow-hidden" style={{ width: "45%" }}>
            <img
              src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/offline-data-re-scynchronization.jpg?t=1751621798627"
              alt="Offline data re-synchronization"
              className="w-full h-auto object-cover"
            />
            <div className="text-center p-4 mt-8 text-gray-800 font-medium">
              Offline Data Re-synchronization
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="relative w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
          {/* Image and Title */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              src={privacies[current].img}
              alt={privacies[current].title}
              className="object-contain"
            />
            <p className="text-gray-700 text-sm font-medium">
              {privacies[current].title}
            </p>
          </div>
          <div className="flex justify-between items-center mb-6 mt-16 px-12">
            {/* Range Display */}
            <div className="mt-6 text-center text-gray-600 text-lg">
              <span className="font-bold text-black">{current + 1}</span>
              <span className="mx-2 font-normal">—</span>
              <span>{privacies.length}</span>
            </div>
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
        </div>
      </div>
      {/* Button */}
      <div className="text-center mt-48">
        <button className="PrivacyButton px-28 py-16  hover:bg-blue-600 text-white font-semibold py-3 px-8 text-lg transition-all duration-200">
          More Details
        </button>
      </div>
    </div>
  );
};

export default PrivacyAndProtection;
