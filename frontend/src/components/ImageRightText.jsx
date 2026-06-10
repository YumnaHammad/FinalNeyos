import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ImageRightText = ({
  title,
  description,
  linkText,
  linkHref,
  imageSrc,
  imageAlt,
  imageHeight,
  reverse
}) => {
  return (
    <div className="py-16 bg-white mt-20">
      <div className="px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          
          {/* Text Section */}
          <div className={`${reverse ? 'order-2' : 'order-1'} lg:${reverse ? 'order-1' : 'order-2'}`}>
            <div className="space-y-6 text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
              <div className="pt-4 mt-14 flex items-center">
                <Link
                  to={linkHref}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-300"
                >
                  {linkText}
                </Link>
                <FaArrowRightLong className="ms-16 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className={`${reverse ? 'order-1' : 'order-2'} lg:${reverse ? 'order-2' : 'order-1'}`}>
            <div className="overflow-hidden rounded-lg">
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{ height: imageHeight }} // dynamic height
                className="w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageRightText;
