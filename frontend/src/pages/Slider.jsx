import React, { useState, useEffect } from "react";
import Styles from "../style/Slider.module.css";
import  "../style/page.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const data = [
  {
    key: 0,
    title: "Smart Office",
    description:
      "Enhancing workplace efficiency with smart technology solutions by integrating AI-driven automation, real-time data monitoring, and seamless communication tools. This results in improved productivity, reduced operational costs, and a smarter work environment.",
    image:
      "https://www.milesight.com/static/pc/en/index-new/solution/people-counting.jpg?t=1742785778708",
  },
  {
    key: 1,
    title: "Smart Restroom",
    description:
      "Improving hygiene, reducing waste, and facilitating maintenance through sensor-based monitoring, automated cleaning schedules, and real-time occupancy tracking. This ensures a cleaner, safer, and more efficient restroom experience.",
    image:
      "https://www.milesight.com/static/pc/en/index-new/solution/indoor-air-quality.jpg?t=1742785778708",
  },
  {
    key: 2,
    title: "Video Surveillance",
    description:
      "Advanced monitoring solutions to ensure security and safety with AI-powered video analytics, facial recognition, and 24/7 surveillance. Our smart systems provide real-time alerts and detailed reporting to prevent security breaches.",
    image: "/assets/images/bg/smart-restroom.jpg",
  },
  {
    key: 3,
    title: "People Counting",
    description:
      "Accurate tracking of people movement and occupancy trends using AI-based analytics and IoT sensors. This technology helps businesses optimize space utilization, improve customer experience, and ensure crowd management efficiency.",
    image: "/assets/images/bg/smart-restroom.jpg",
  },
  {
    key: 4,
    title: "Traffic Monitoring",
    description:
      "AI-powered solutions to manage road congestion effectively with real-time traffic analytics, smart signals, and incident detection. Our system provides detailed insights to improve traffic flow and reduce delays.",
    image: "/assets/images/bg/smart-restroom.jpg",
  },
  {
    key: 5,
    title: "Smart Parking",
    description:
      "Efficient parking solutions using real-time data, automated entry/exit systems, and AI-based occupancy tracking. Our technology minimizes parking hassles, reduces waiting time, and enhances urban mobility.",
    image: "/assets/images/bg/smart-restroom.jpg",
  },
];

const Slider = () => {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [fadeEffect, setFadeEffect] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(1);
        setIsMobile(true);
      } else if (width < 992) {
        setItemsPerPage(2);
        setIsMobile(false);
      } else {
        setItemsPerPage(3);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [startIndex, itemsPerPage]);

  const nextSlide = () => {
    setFadeEffect(true);
    setTimeout(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % data.length);
      setSelectedItem(data[(startIndex + 1) % data.length]);
      setFadeEffect(false);
    }, 300);
  };

  const prevSlide = () => {
    setFadeEffect(true);
    setTimeout(() => {
      setStartIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
      setSelectedItem(data[(startIndex - 1 + data.length) % data.length]);
      setFadeEffect(false);
    }, 300);
  };

  const getDisplayedItems = () => {
    let items = [];
    for (let i = 0; i < itemsPerPage; i++) {
      items.push(data[(startIndex + i) % data.length]);
    }
    return items;
  };

  return (
    <section className="trending-productss ">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="navigations">
            <button onClick={prevSlide} className='navButton'>
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className='navButton'>
              <FaChevronRight />
            </button>
          </div>
          <div className="text-center pb-40">
            <h2 className='title '  data-aos="fade-right">Solutions</h2>
            <p className='subtitle'>
              Nexyos provides a range of solutions to empower a more
              productive and effective society.
            </p>
          </div>

          <div className="row">
            <div
              className={`col-lg-7 col-md-12 ${isMobile ? "order-2 mt-4" : ""}`}
            >
              <div
                className={`d-flex gap-5 flex-wrap justify-content-center ${
                  fadeEffect ? Styles.fadeOut : Styles.fadeIn
                }`}
              >
                {getDisplayedItems().map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setSelectedItem(item)}
                    className={`${Styles.card} ${
                      selectedItem.key === item.key ? Styles.active : ""
                    }`}
                  >
                    <p className="card-title">{item.title}</p>
                    <div className='imageDiv'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='cardImage'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`col-lg-5 col-md-12 ${isMobile ? "order-1" : ""}`}>
              <div>
                <div
                  className={`row ${
                    fadeEffect ? Styles.fadeOut : Styles.fadeIn
                  }`}
                >
                  <div
                    className={`${isMobile ? "col-12" : "col-lg-7 col-md-6"}`}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className={`imageFull w-100`}
                    />
                  </div>
                  <div
                    className={`${
                      isMobile
                        ? "col-12 mt-3"
                        : "col-lg-5 col-md-6 d-flex align-items-end"
                    }`}
                  >
                    <div className='cards'>
                      <h4>{selectedItem.title}</h4>
                      <p className='detailDescription'>
                        {selectedItem.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
