import React from "react";
import '../../style/HighlightsSection.css';

export default function InterestedSection({ sectionTitle, items }) {
  return (
    <div className="bg-white py-10 px-4">
      {sectionTitle && (
        <h2 className="text-center text-3xl font-bold mb-40">{sectionTitle}</h2>
      )}

      <div className="grid md:grid-cols-3 gap-20 max-w-7xl mx-auto px-48">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative shadow-lg overflow-hidden group IntrestedSecCardImg 
                       transform transition-transform duration-500 ease-in-out 
                       hover:scale-105 rounded-lg "
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 text-white z-10 text-wrap px-20 py-30">
              <h3 className="text-xl font-bold text-left text-white">{item.title}</h3>
              <p className="text-sm mt-2 text-left text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Default props (optional)
InterestedSection.defaultProps = {
  sectionTitle: "You may also be interested in",
  items: [],
};
