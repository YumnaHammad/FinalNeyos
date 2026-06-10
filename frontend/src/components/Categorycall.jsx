import React from "react";


import CategoryPage from "./CategoryPage";
import Breadcrumb from "./Breadcrumb";
// import Slider from "./Slider";
// import data from './data'
import SliderTest from "../components/sliders/SliderTest";
import Contact from "./Contact";
import Tab from "./Solution/TrafficTab/Tab";
import HotProductSlider from "./Solution/OutstandingFeatures/HotProductSlider";
const Categorycall = () => {
  return (
    <div>
      {/* <Slider data={data} activeSlide={2}/> */}
      <SliderTest/>
     <Breadcrumb/>
      <CategoryPage />
      <Tab/>
      <HotProductSlider/>
      <Contact/>
    </div>
  );
};

export default Categorycall;
