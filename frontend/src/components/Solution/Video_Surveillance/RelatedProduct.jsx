// ProductCard.jsx
import React from "react";
import '../../../style/Video_Surveillance.css'

const RelatedProduct = ({ image, tags, title, link }) => {
  return (
    <>
       <div className="py-10">
        {/* Heading */} 
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group1 pb-20">

      {/* Tags */}
      <div className="absolute top-0 left-4 flex space-x-12">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="bg-blue-500 text-white text-xs font-semibold px-5 py-20 rounded-b me-7 transform transition-all duration-300 hover:bg-blue-600 hover:scale-110"
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Image */}
      <img 
        src={image} 
        alt={title} 
        className=" transform transition-all duration-300 group-hover:scale-110" 
      />

      {/* Title */}
      <h3 className="text-center text-sm font-medium transition-all duration-300 group-hover:text-blue-600">{title}</h3>

      {/* Link */}
      <a
        href={link}
        className="text-blue-500 text-sm mt-2 hover:underline transform transition-all duration-300 hover:text-blue-700 hover:translate-x-1 inline-block"
      >
        Learn More &gt;
      </a>
    </div></div></>
  );
};

export default RelatedProduct;
