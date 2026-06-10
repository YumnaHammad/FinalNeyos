import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaAngleRight, FaAngleDown, FaAngleUp } from "react-icons/fa";
import miniCAmeraGroup from "../assets/images/nexyos/miniCAmeraGroup.png";
import Contact from "./Contact";
import Tab from "./Solution/TrafficTab/Tab";
import HotProductSlider from "./Solution/OutstandingFeatures/HotProductSlider";
import SliderTest from "../components/sliders/SliderTest";
import { motion } from "framer-motion";
import '../style/SubCategoryPage.css';
import Breadcrumb from "./Breadcrumb";

const SubCategoryPage = () => {
  const { id } = useParams(); // sub-category ID
  const location = useLocation();
const [subCategory, setSubCategory] = useState(null);
  const navigate = useNavigate();

const features = [
  {
    id: 1,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-frame-parity-flashing-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "Frame Parity Flashing technology",
    description:
      " means the cameras take several images of the vehicle with different illumination levels, and the system will then automatically ",
    span2: "select the best image for ANPR processing.",
    description2:
      "lt ensures clear capture of the vehicle body and license plate (reflective & non-reflective plates). Two different intensities of the built-in illumination may be defined for the even/odd frames.",
    description3: "",
    description4: "",
  },
  {
    id: 2,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-global-shutter-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "Global Shutter",
    description:
      " technology enhances surveillance capabilities by ensuring comprehensive coverage with ",
    span2: "a high capture rate",
    description2:
      ". It maintains high-quality images and enables advanced event analysis while reducing the need for manual intervention, improving operational efficiency.",
    description3: "",
    description4: "",
  },
  {
    id: 3,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-dual-ir-wavelength-options-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "",
    description: "Optimize license plate identification by utilizing our ",
    span2: "optional dual IR wavelengths (850nm and 740nm)",
    description2:
      ", enabling precise recognition across different contrast levels and lighting conditions.",
    description3:
      "850nm IR Wavelength: Ideal for High-contrast/ Non-reflective License Plate.",
    description4:
      "740nm IR Wavelength: Ideal for Low-contrast/ Reflective License Plate.",
  },
  {
    id: 4,
    title: "Frame Parity Flashing",
    image:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-1.png?t=1751621798627",
    iconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-3.png?t=1751621798627",
    hoverIconImage:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-long-range-anpr-distance-2.png?t=1751621798627",
    heading: "Advanced Technology for Perfect ANPR Image",
    span: "",
    description:
      "Up to 50m ANPR distance, precise recognition for ANPR processing within the range.",
    span2: "",
    description2: "",
    description3: "",
    description4: "",
  },
];
  const [thirdLevels, setThirdLevels] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const next = () => {
    setCurrent((prev) => (prev + 1) % thirdLevels.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + thirdLevels.length) % thirdLevels.length);
  };

useEffect(() => {
  const fetchThirdLevels = async () => {
    try {
      const res = await fetch(`https://portal.nexyos.com/api/product/third_level_cat/4/${id}`);
      const data = await res.json();
      console.log("✅ Third-level data response:", data);
      setThirdLevels(data || []);
    } catch (error) {
      console.error("❌ Error fetching third-level data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const res = await fetch(`https://portal.nexyos.com/api/product/sub_category/${id}`);
      const data = await res.json();
      console.log("✅ Sub-category response:", data);
      setSubCategory(data.data || null);
    } catch (error) {
      console.error("❌ Error fetching sub-category data:", error);
    }
  };

  if (id) {
    console.log("📌 Sub-category ID from route:", id);
    fetchThirdLevels();
    fetchSubCategory();
  }
}, [id]);



 const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const currentFeature =
    features[hoverIndex !== null ? hoverIndex : activeIndex];
  const [openKey, setOpenKey] = useState("parity");
  const toggle = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <>
    <SliderTest/>
    <Breadcrumb/>
<div className="custom-padding" style={{ marginTop: '5rem', marginBottom: '5rem' }}>


        <h5 className="text-base"  data-aos="fade-right">What we offer</h5>
        <p className="text-justify">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing.
        
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing
        </p>
      </div>
          <section className="Feature_container bg-gray-100 rounded-lg pb-28 flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="Feature_heading text-xl text-black "  data-aos="fade-right">
          {currentFeature.heading}
        </h2>
      </div>
      <div className="hidden lg:block">
        <div className="max-w-4xl bg-white mx-auto grid md:grid-cols-2 gap-10 items-center px-18 py-18 rounded-lg">
          <motion.div
            key={currentFeature.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-700 text-sm leading-relaxed text-left">
              <span className="text-black font-semibold">
                {currentFeature.span}
              </span>
              {currentFeature.description}
              <span className="text-blue-500">{currentFeature.span2}</span>
              {currentFeature.description2}
              <br />
              {currentFeature.description3}
              <br />
              {currentFeature.description4}
            </p>
          </motion.div>
          <motion.div
            key={currentFeature.image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={currentFeature.image}
              alt={currentFeature.title}
              className="w-full rounded-xl "
            />
          </motion.div>
        </div>

        <div className="Features_circles mt-12 flex justify-between gap-6 flex-wrap">
          {features.map((item, index) => (
            <div
              className={`group cursor-pointer flex flex-col items-center w-[11rem] transition-all duration-300 ${
                activeIndex === index ? "" : "text-gray-600"
              }`}
              style={{ height: "22vh" }}
            >
              <div
                key={item.id}
                onMouseEnter={() => setHoverIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-[5rem] h-[5rem] rounded-full flex items-center justify-center overflow-hidden shadow-md transition ${
                  activeIndex === index ? "" : ""
                }`}
              >
                <img
                  src={
                    hoverIndex === index ? item.hoverIconImage : item.iconImage
                  }
                  alt={item.title}
                  className="object-contain"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="mt-2 text-center text-sm font-medium leading-tight">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="w-2xs">
          {features.map((feat) => {
            const isOpen = openKey === feat.id;
            return (
              <div
                key={feat.id}
                className="mb-3 bg-white rounded-lg shadow overflow-hidden p-38"
              >
                <button
                  onClick={() => toggle(feat.id)}
                  className="w-full flex items-center justify-between px-4 py-2 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={feat.iconImage}
                      alt={feat.title}
                      className="object-contain"
                      style={{ width: "48px", height: "48px" }}
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {feat.title}
                    </span>
                  </div>
                  {isOpen ? (
                    <FaAngleUp className="text-gray-500" />
                  ) : (
                    <FaAngleDown className="text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 pb-4 text-xs text-gray-600 space-y-3 mt-16"
                  >
                    <p className="text-gray-700 text-sm leading-relaxed text-left">
                      <span className="text-black font-semibold">
                        {feat.span}
                      </span>
                      {feat.description}
                      <span className="text-blue-500">{feat.span2}</span>
                      {feat.description2}
                      <br />
                      {feat.description3}
                      <br />
                      {feat.description4}
                    </p>
                    <div className="w-full flex justify-center mt-4">
                      <img
                        src={feat.image}
                        alt={feat.title}
                        className="rounded border shadow-sm w-full max-w-xs"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
  
    <div >
      



      <section className="Feature_container bg-gray-100 rounded-lg pb-28 flex flex-col items-center justify-center">
        <div className="py-6 px-20 mt-16">
    <h1 className="title "  data-aos="fade-right">{subCategory?.sub_category || "Sub-Category"} Product </h1>
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto w-full items-center justify-center">
             {/* Lenses Section */}
              <div className="w-full lg:w-[350px] rounded-xl flex flex-col justify-center items-center relative">


                <img
                  src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/outstanding-features-lenses.jpg?t=1751621798627"
                  alt="Lenses"
                  className="rounded-lg mb-4 w-full h-auto object-cover"
                />

                <div className="lensesContent text-left px-2 absolute bottom-8 text-white">
                  <h3 className="text-xl font-semibold"  data-aos="fade-right">Lenses</h3>
                  <p className="text-sm">
                    4X/5X/12X/36X Optical AF Lens <br />
                    Motorized 2.7~13.5mm / 3.6~10mm @F1.4
                  </p>
                </div>
              </div>
            {/* Desktop View */}
            <div className="w-full h-full bg-white py-20 px-60 rounded-xl hidden lg:flex flex-col justify-between">
              <h6 className="text-left"  data-aos="fade-right">Third-Level Categories</h6>

              {loading ? (
                <p>Loading...</p>
              ) : thirdLevels.length === 0 ? (
                <p>No models found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  {thirdLevels.map((item, index) => (
                    <div
                      key={index}
                      className="card"
                         onClick={() => navigate(`/product`)}
                    >
                      <img
                        src={miniCAmeraGroup}
                        alt={item.third_level}
                        className="card-img"
                      />
                      <h2 className="card-title"  data-aos="fade-right">
                        {item.third_level}
                        <ChevronRight className="arrow-icon" />
                      </h2>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Carousel */}
            <div className="block lg:hidden">
              <div className="relative w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-md font-medium mb-4 text-black">Third-Level</div>
                  <div className="absolute right-6 flex space-x-2">
                    <button onClick={prev}>
                      <ChevronLeft className="text-gray-600 hover:text-black" />
                    </button>
                    <button onClick={next}>
                      <ChevronRight className="text-gray-600 hover:text-black" />
                    </button>
                  </div>
                </div>

                {loading ? (
                  <p>Loading...</p>
                ) : thirdLevels.length > 0 ? (
                  <>
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <img
                        src={miniCAmeraGroup}
                        alt={thirdLevels[current]?.third_level}
                        className="h-70 p-0 object-contain"
                      />
                      <p className="text-gray-700 text-lg font-medium">
                        {thirdLevels[current]?.third_level}
                      </p>
                    </div>
                    <div className="mt-6 text-center text-gray-600 text-lg">
                      <span className="font-bold text-black">{current + 1}</span>
                      <span className="mx-2 font-normal">—</span>
                      <span>{thirdLevels.length}</span>
                    </div>
                  </>
                ) : (
                  <p>No data found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  

      <style>{`
        .wrapper {
          background-color: white;
          min-height: 100vh;
          padding: 10px;
        }
        .title {
          font-size: 28px;
          text-align: center;
          margin-bottom: 30px;
          font-weight: bold;
        }
      
        .card {
          width: 140px;
          background-color: #ffffff;
          border: 2px solid #01667D;
          text-align: center;
          height: 120px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          background-color: #f0f9ff;
        }

        .card-img {
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.4s ease-in-out;
          margin: 0;
          padding: 0;
        }

        .card:hover .card-img {
          transform: scale(1.5);
        }

        .card-title {
          font-size: 11px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: end;
        }

        .arrow-icon {
          width: 18px;
          height: 18px;
          color: #01667D;
          flex-shrink: 0;
        }

    

          .card {
            width: 90%;
          }
        }
      `}</style>
    </div>
      </section>
        <Tab/>
      <HotProductSlider/>
      <Contact/>
       
    </>
    
  );
};

export default SubCategoryPage;
