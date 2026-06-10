import React, { useState, useEffect } from "react";
import SolutionTab from "../../components/Solution/Video_Surveillance/SolutionTab";
import RelatedProduct from "../../components/Solution/Video_Surveillance/RelatedProduct";
import BannerSection from "../../components/BannerSection";
import WhatWeOfferSection from "../../components/WhatWeOfferSection";
import HighlightSlider from "../../components/HighlightSlider";

const VideoSurveillance = () => {
  const [BannerData, setBannerData] = useState(null);
  const [whatOfferData, setWhatOfferData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [highlights, setHighlights] = useState([]);

  const products = [
    {
      image:
        "https://www.milesight.com/static/pc/en/page/technology/solution/ptz-series/related-products-bullet.png?t=1754966591917",
      tags: ["5MP", "2MP"],
      title: "AI 12X PTZ Bullet Camera",
      link: "#",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/page/technology/solution/ptz-series/related-products-dome.png?t=1754966591917",
      tags: ["5MP", "2MP"],
      title: "AI 12X/20X/23X PTZ Dome Camera",
      link: "#",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/page/technology/solution/ptz-series/related-products-speed-dome.png?t=1754966591917",
      tags: ["5MP", "2MP"],
      title: "AI 23X/30X Speed Dome Camera",
      link: "#",
    },
    {
      image:
        "https://www.milesight.com/static/pc/en/page/technology/solution/ptz-series/related-products-speed-dome.png?t=1754966591917",
      tags: ["4K", "5MP", "2MP"],
      title: "AI 36X/42X Speed Dome Camera",
      link: "#",
    },
  ];

  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/video-surveillance/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

  const fetchOfferData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/video-surveillance/section-2"
      );
      const data = await response.json();
      setWhatOfferData(Array.isArray(data) ? data : []);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(
      "https://nexyos.deeptech.pk/api/video-surveillance/section-2/category"
    );
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : []);
  };

  const fetchSolutions = async () => {
    const res = await fetch(
      "https://nexyos.deeptech.pk/api/video-surveillance/section-3-main"
    );
    const data = await res.json();
    setSolutions(Array.isArray(data) ? data : []);
  };

  const fetchHighlights = async () => {
    const res = await fetch(
      "https://nexyos.deeptech.pk/api/video-surveillance/section-4"
    );
    const data = await res.json();

    const formatted = data.map((item) => ({
      id: item.id,
      name: item.heading,
      description: item.description,
      image: item.image,
    }));

    setHighlights(formatted);
  };

  useEffect(() => {
    fetchBannerData();
    fetchOfferData();
    fetchCategories();
    fetchSolutions();
    fetchHighlights();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      {BannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-left"
          textAlign="text-left"
          textColor="text-[#121535]"
          title={BannerData.heading}
          subtitle={BannerData.sub_heading}
          image={BannerData.image}
        />
      )}
      {/* WhatWeOffer */}
      {whatOfferData && (
        <WhatWeOfferSection
          title="What we offer"
          description="Our comprehensive video surveillance solutions provide advanced CCTV systems with intelligent video analytics, real-time monitoring, and cutting-edge security features. From high-definition cameras to AI-powered detection systems, we deliver complete surveillance solutions for businesses, institutions, and smart cities."
          variant="cards"
          items={whatOfferData.map((item) => ({
            image: item.image,
            title: item.heading,
            description: item.description,
          }))}
        />
      )}
      {/* Solution Tab */}
      {categories.length > 0 && solutions.length > 0 && (
        <SolutionTab categories={categories} solutions={solutions} />
      )}
      {/* Highlight Slider */}
      {highlights.length > 0 && (
        <HighlightSlider title="Superior Highlights" items={highlights} />
      )}
      <div>
        <h2 className="text-center text-2xl font-bold mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 px-36">
          {products.map((product, idx) => (
            <RelatedProduct key={idx} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSurveillance;
