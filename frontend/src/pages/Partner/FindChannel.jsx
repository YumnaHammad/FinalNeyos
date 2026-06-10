import React, { useEffect, useState } from "react";
import BannerModal from "../../components/Company/BannerModal";
import ChannelPartners from "../../components/Partner/FindAChannel/Channel";
import Contact from "../../components/Contact";
import BannerSection from "../../components/BannerSection";

const ChannelPage = () => {
  const [bannerData, setBannerData] = useState(null);

  const fetchBannerData = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/channel/section-1"
      );
      const data = await response.json();
      setBannerData(Array.isArray(data) ? data[0] : data);
      console.log("Banner Data:", data);
    } catch (error) {
      console.error("Error fetching CCTV partner data:", error);
    }
  };
  // const fetchSectionData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://nexyos.deeptech.pk/api/channel/section-1"
  //     );
  //     const data = await response.json();
  //     setBannerData(Array.isArray(data) ? data : []);
  //   } catch (error) {
  //     console.error("Error fetching section data:", error);
  //   }
  // };
  useEffect(() => {
    // fetchSectionData();
    fetchBannerData();
  }, []);
  return (
    <>
      {bannerData && (
        <BannerSection
          gradient="none"
          content="justify-content-left"
          textAlign="text-left"
          textColor="text-black"
          title={bannerData.heading}
          subtitle={bannerData.description}
          image={bannerData.image}
          ImageSize="contain"
        />
      )}
      <ChannelPartners />
      <Contact />
    </>
  );
};

export default ChannelPage;
