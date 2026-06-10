import React from "react";
import '../../style/HighlightsSection.css';

export default function HighlightsSection({ title, highlights }) {
  return (
    <section className="py-12 bg-white mt-32">
      <div className="mx-auto px-28">
        {/* Section Title */}
        {title && (
          <h2 className="text-3xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-28">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 duration-300 flex items-center hover:-translate-y-2 hover:shadow-lg mb-14 transition-all highlightSecCard"
            >
              {/* Column 1: Image */}
              <div className="items-start justify-items-start highlightSecCardImg">
                <img
                  src={item.image}
                  alt={item.title}
                  className=""
                />
              </div>

              {/* Column 2: Title + Description */}
              <div className="ml-4" style={{ width: '70%' }}>
                <h3 className="text-lg font-bold mb-2 text-left">{item.title}</h3>
                <p className="text-gray-600 text-xs text-left">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
