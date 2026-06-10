import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "../../style/About.css";
import axios from "axios";

const RPlayer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://nexyos.deeptech.pk/api/about-us/section-2")
      .then((response) => {
        const resp = response.data;
        if (Array.isArray(resp)) {
          setData(resp);
        } else if (resp) {
          setData([resp]);
        }
      })
      .catch((error) => {
        console.error("Error fetching banner data:", error);
      });
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="company-profile">
      <div className="container">
        {data.map((item, index) => {
          const mainHeading =
            item.main_heading || item.mainHeading || item.Heading || item.heading || "";
          const mainDescription =
            item.main_description || item.mainDescription || item.desc || item.description || "";
          const secondHeading =
            item.second_heading || item.secondHeading || item.head2 || item.Head2 || "";
          const secondDescription =
            item.second_description || item.secondDescription || item.desc2 || item.Desc2 || "";
          const videoUrl = item.video || item.video_url || item.link || item.url || "";

          return (
            <div key={index} className="profile-content-wrapper">
              <h1 className="profile-title" data-aos="fade-right">
                {mainHeading}
              </h1>

              <div className="profile-content">
                <p className="profile-description text-center">{mainDescription}</p>

                <div className="divider"></div>

                <div className="video-section">
                  <h2 className="video-title" data-aos="fade-right">
                    {secondHeading}
                  </h2>
                  {secondDescription ? (
                    <p className="video-subtitle">{secondDescription}</p>
                  ) : (
                    <p className="video-subtitle">Sense the Infinity Do Drive the World</p>
                  )}

                  <div className="video-container">
                    <ReactPlayer
                      url={videoUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                      className="youtube-player"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RPlayer;
