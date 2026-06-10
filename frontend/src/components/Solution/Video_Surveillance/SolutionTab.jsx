import React, { useState, useEffect } from "react";

const SolutionTab = ({ categories, solutions }) => {
  // const [activeIndustryTab, setActiveIndustryTab] = useState("retail");
  // const [whatOfferData, setWhatOfferData] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const activeSolutions =
    activeCategoryId && Array.isArray(solutions)
      ? solutions.filter(
          (item) => Number(item.category_id) === Number(activeCategoryId)
        )
      : [];

  useEffect(() => {
    if (
      Array.isArray(categories) &&
      categories.length > 0 &&
      categories[0]?.id
    ) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories]);

  return (
    <div className="px-36">
      {/* Scrollable Tabs */}
      <div className="overflow-x-auto">
        <div className="flex space-x-6 min-w-max px-2 border-b border-gray-300 justify-center">
          {Array.isArray(categories) &&
            categories.map((tab) => (
              <button
                key={tab.id ?? tab.category}
                onClick={() => setActiveCategoryId(tab.id)}
                className={`IndustryTabButton relative py-12 px-24 text-base whitespace-nowrap font-medium transition-all duration-300 ${
                  activeCategoryId === tab.id ? "active" : "text-black"
                }`}
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                {tab.category}
              </button>
            ))}
        </div>
      </div>

      {/* Background Image Section with Overlay */}
      {activeSolutions.map((tab) => (
        <div
          className="relative mt-10 h-[400px] w-full rounded-xl overflow-hidden "
          key={tab.id}
        >
          <div className="relative h-full w-full">
            <img
              src={tab.image}
              alt={tab.heading}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center ps-52">
              <h3 className="text-white text-4xl md:text-5xl font-bold mb-4 text-left">
                {tab.heading}
              </h3>
              <p className="text-white text-lg mb-6 text-left">
                {tab.sub_heading}
              </p>
              <h5 className="text-white text-2xl md:text-3xl font-semibold mb-4 text-left">
                Related solutions:
              </h5>
              <div className="flex flex-wrap gap-4">
                {tab.capsules &&
                  tab.capsules.split(",").map((cap, idx) => (
                    <button
                      key={idx}
                      className="border border-white text-white px-20 py-4 rounded-full hover:bg-white hover:text-black transition"
                      style={{ borderRadius: "15px" }}
                    >
                      {cap.trim()}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolutionTab;
