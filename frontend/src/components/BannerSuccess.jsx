import React from "react";
import { Link } from "react-router-dom";

const BannerPSCS = () => {
  const bannerImage =
    "https://www.milesight.com/static/pc/en/company/success-stories/index/bj.jpg?t=1744338309713";

  return (
    <div
      className="BannerPSCS"
      style={{
        backgroundImage: ` url(${bannerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="banner-item-two__content text-white">
          <h2 className="banner-item-two__title bounce text-white"  data-aos="fade-right">
            Success Stories
          </h2>
          <p className="mt-4">
            View numerous success stories from a range of industries that show
            how Nexyos solutions have helped our customers overcome challenges
            and achieve their goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerPSCS;
