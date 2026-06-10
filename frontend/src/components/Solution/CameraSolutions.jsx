import React from "react";
import { Link } from "react-router";

const CameraSolutions = ({ heading, subheading, items }) => {
  return (
    <div className="bg-white py-12 px-4 mt-32 ">
      {/* Heading */}
      {heading && (
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
          {heading}
        </h2>
      )}
      {/* Subheading */}
      {subheading && (
        <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
          {subheading}
        </p>
      )}

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto mt-44  px-48">
        {items?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 py-32 px-20 text-center border"
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-6 max-h-40 object-contain transition-transform duration-300 hover:scale-110"
              />
            )}
            <h3 className="text-lg font-bold mb-4 mt-28 transition-colors duration-300 hover:text-blue-600">{item.title}</h3>
            <p className="text-gray-600 mb-4 mt-20 transition-colors duration-300 hover:text-gray-800">{item.description}</p>
            {item.link && (
              <Link
                to={item.link}
                className="text-[#121535] mt-12 font-medium transition-all duration-300  hover:translate-x-1"
              >
                View More
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraSolutions;
