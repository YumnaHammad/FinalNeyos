import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../style/pagecss.css";

const BannerAbout = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/about-us/section-1")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setBannerData(data);
        } else if (data) {
          setBannerData([data]);
        }
      })
      .catch((err) => {
        console.error("Error fetching banner data:", err);
      });
  }, []);

  if (!bannerData || bannerData.length === 0) return null;

  return (
    <>
      {bannerData.map((item, index) => {
        const image = item.image || item.img || item.image_url || item.src || "";
        const heading = item.heading || item.head || item.title || item.name || "";
        const description = item.description || item.desc || item.body || item.content || "";
        return (
        <div
          key={index}
          className="BannerPSCS"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "70vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="banner-item-two__content text-white">
              <h2
                className="banner-item-two__title bounce text-black"
                data-aos="fade-right"
              >
                {heading}
              </h2>
              <p className="mt-4 text-black text-lg">{description}</p>
            </div>
          </div>
        </div>
        );
      })}
    </>
  );
};

export default BannerAbout;
