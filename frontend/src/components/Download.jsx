import React from "react";

const Download = ({ image, heading, sub_heading, paragraph, pdf }) => {
  return (
    <div className=" bg-gray-100 mt-60 py-80">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Guide Covers */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Right Section - Pelco eBook Image */}
              <div className="order-1 ">
                <div className="flex justify-center">
                  <img
                    src={image}
                    alt="loading..."
                    className="w-full max-w-md h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Text Content and CTA */}
          <div className="order-2 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-left text-gray-800 leading-tight">
                {heading}
              </h2>

              <div className="mt-28">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-left">
                  {sub_heading}
                </h3>
                <div className="space-y-3 mt-16 DownloadGuide">
                  <div className="flex items-start">
                    <p className="text-gray-700 text-left">{paragraph}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 items-start flex justify-start mt-28">
                {/* <button href={pdf} className="DownloadButton font-semibold py-12 px-12 rounded-lg transition-colors duration-300" style={{border:'2px solid [#00667C'}}>
                  Download guide
                </button> */}
                {pdf && (
                  <a
                    href={pdf}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="DownloadButton font-semibold py-12 px-12 rounded-lg transition-colors duration-300 inline-block"
                    style={{ border: "2px solid #00667C" }}
                  >
                    Download guide
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
