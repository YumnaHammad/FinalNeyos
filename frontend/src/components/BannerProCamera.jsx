    import React from "react";
    import { Link } from "react-router-dom";
import bj2 from '../assets/images/nexyos/bj2.jpg'
const BannerProCamera = () => {
    
      return (
        <div
          className="BannerPSCS"
          style={{
            backgroundImage:`url(${bj2})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="banner-item-two__content text-white">
              <h2 className="banner-item-two__title bounce text-white"  data-aos="fade-right">
                Pro Series
              </h2>
              <p className="mt-4">
              Milesight Pro Camera Series is the professional-level network camera designed for those who are seeking for the up-most in quality, integration, design and reliability for their demanding surveillance needs.
              </p>
            </div>
          </div>
        </div>  
  )
}

export default BannerProCamera