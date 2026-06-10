import React from "react";
import { Link } from "react-router-dom";
import "../../style/pagecss.css";

const BannerBrand = ({ title, description,Image,headingClass , DescriptionClass,ImageSize  }) => {
  const bannerImage =Image;

  return (
    <div
      className="BannerPSCS"
      style={{
        backgroundImage: ` url(${bannerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: ImageSize || "cover",
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="banner-item-two__content ">
          <h2 className={`banner-item-two__title bounce ${headingClass}`}  data-aos="fade-right">
            {title || "We Are Nexyos, We Make Sensing Matter"}
          </h2>
          <p className={`mt-4 ${DescriptionClass}`}>
            {description || "From sensing to connecting, to processing, to acting, and to the power that transforms the world."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerBrand;
