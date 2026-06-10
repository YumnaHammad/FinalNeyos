import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const [crums, setCrums] = useState([]);

  const getContentFromUrl = (url) => {
    let cleanUrl = decodeURI(url).split('/').filter((x) => x !== "");
    let crumbsArray = [];
    for (let i = cleanUrl.length - 1; i >= 0; i--) { 
      if(cleanUrl[0] === "parent-product-details" ) {
        crumbsArray.push(cleanUrl[i]);
        break;
      }
      if (cleanUrl[i] === "true" || cleanUrl[i] === "false") { 
        break;
      }
      crumbsArray.push(cleanUrl[i]);
    }
  
    setCrums(crumbsArray.reverse());
  };


  useEffect(()=>{
    getContentFromUrl(currentUrl)
  },[location.pathname])


  return (
    <div className="breadcrumb mb-0 pt-20  container">
      <div className="container container-lg">
        <div className="breadcrumb-wrapper flex-between flex-wrap gap-16">
          {/* <h6 className='mb-0'>{title}</h6> */}
          <h6 className="mb-0"></h6>
          <ul className="flex-align gap-8 flex-wrap">
            <li className="text-sm">
              <Link
                to="/"
                className="text-gray-900 flex-align gap-8 hover-text-main-600"
              >
                <i className="ph ph-house" />
                Home
              </Link>
            </li>
            {crums.map((item, index) => (
              <React.Fragment key={index}>
                <li className="flex-align">
                  <i className="ph ph-caret-right" />
                </li>
                <li className="text-sm text-[#fa6400]">{item}</li> 
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
