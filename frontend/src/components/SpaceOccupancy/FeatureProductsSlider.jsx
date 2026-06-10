import React, { useRef , useState, useEffect, forwardRef} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './Feature.css'
const products = [
  {
    title: "VS370",
    subtitle: "Radar Human Presence Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/meeting-room-sensors-vs370.png?t=1752826692624",
    features: [
      "Up to 99% Industry-Leading Accuracy",
      "Millimeter Wave Radar + PIR Dual Detection",
      "Reliable Privacy Protection",
      "Flexible Sensitivity & Sleep Settings",
      "Operation in Both Light and Dark Conditions",
      "Smarter Automation: Light Sensor & Milesight D2D",
      "Long Battery Life of Up to 5 Years",
    ],
  },
  {
    title: "VS121/VS121-P",
    subtitle: "AI Workplace Occupancy Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/milesight-ai-workplace-occupancy-sensor.png?t=1752826692624",
    features: [
      "LoRaWAN® & PoE Versions for Broader Applications",
      "Up to 98% Accuracy",
      "100% Anonymous Detection (GDPR Compliant)",
      "Smart U-Turn & Bi-Directional Counting",
      "Up to 78㎡ Large Detection Area",
      "Milesight D2D Communication",
      "User-Friendly Management on DeviceHub",
    ],
  },
  {
    title: "VS133/VS133-P",
    subtitle: "AI ToF People Counting Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/ai-tof-people-counting-sensor.png?t=1752826692624",
    features: [
      "On-Board AI Algorithm",
      <>2<sup>ND</sup> Generation ToF Technology</>,
      "100% Anonymous Detection (GDPR Compliant)",
      "Industry-Leading 99.8% Accuracy",
      "Staff Detection and Adults/Children Differentiation",
      "Smart U-Turn & Bi-Directional Counting",
      "Great Compatibility for Extended Applications",
    ],
  },
    {
    title: "VS330",
    subtitle: "Bathroom Occupancy Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/cubicle-occupancy-sensor.png?t=1752826692624",
    features: [
      "Dual Technology, Maximal Possibility",
      "Industry-leading Accuracy exceeding 99.5%",
      "Compliant with GDPR & 100% Anonymous Detection",
      "Real-time Update & Ultra-low Power Consumption",
      "Artful Design & Flexible Applications",
    ],
  },
    {
    title: "VS370",
    subtitle: "Radar Human Presence Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/meeting-room-sensors-vs370.png?t=1752826692624",
    features: [
      "Up to 99% Industry-Leading Accuracy",
      "Millimeter Wave Radar + PIR Dual Detection",
      "Reliable Privacy Protection",
      "Flexible Sensitivity & Sleep Settings",
      "Operation in Both Light and Dark Conditions",
      "Smarter Automation: Light Sensor & Milesight D2D",
      "Long Battery Life of Up to 5 Years",
    ],
  },
    {
    title: "WS202",
    subtitle: "PIR & Light Sensor",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/pir-and-light-sensor.png?t=1752826692624",
    features: [
      "PIR Presence Detection",
      "Brightness Measurement",
      "LoRaWAN® Wireless Deployment",
      "Easy Configuration via NFC",
    ],
  },
    {
    title: "",
    subtitle: "Milesight IoT Cloud",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/iot-cloud.png?t=1752826692624",
    features: [
      "Field Data Visualization",
      "Remote Management & Control",
      "Real-Time Alert",
    ],
  },
];

const FeatureProductsSlider = forwardRef((props, ref) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const amount = 340;
    sliderRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };
 const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollX = scrollRef.current.scrollLeft;
    const width = scrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollX / width);
    setActiveIndex(newIndex);
  };

    // Optional: Snap scroll behavior for better UX
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);


  return (
    <div  ref={ref}>
  <div
      className="relative bg-cover bg-center py-20 px-4 text-white md:block hidden"
      style={{ backgroundImage: "url('https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/product-background.jpg?t=1752826692624')" }} 
    >
      <h2 className="text-2xl font-bold text-center text-white my-20">Featured Products for Space Occupancy</h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 lefttarrow"
        >
          <ChevronLeft className="icon"/>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full z-10 nextarrow"
        >
          <ChevronRight className="icon"/>
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex overflow-x-hidden gap-80 scrollbar-hide scroll-smooth px-10 FeatureCards"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className=" bg-black/10 backdrop-blur-sm hover:bg-gray-500/30 rounded-xl shadow-lg flex-shrink-0 FeatureProducts">
              <img src={product.image} alt={product.title} className=" mx-auto object-contain mb-4" />
              <h3 className="text-2xl font-bold text-white">{product.title}</h3>
              <p className="font-semibold mb-4">{product.subtitle}</p>
              <ul className="text-xs text-gray-200 space-y-1 text-left">
                {product.features.map((feat, i) => (
                  <li key={i}  >{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
 <div className="md:hidden block bg-white py-10 ms-40">
      <h2 className="text-2xl font-bold text-left text-black px-6 mb-6 py-40">
        Featured Products for Space Occupancy
      </h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x scroll-smooth scrollbar-hide  gap-52 space-x-4"
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start w-full max-w-xs bg-gray-50 rounded-xl shadow pb-40"
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center text-black">
              {product.title || "—"}
            </h2>
            <p className="text-black font-medium text-center mb-4">
              {product.subtitle}
            </p>
            <ul className="text-sm text-gray-700 space-y-2 text-left px-24">
              {product.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pagination */}
    <div className="flex justify-center items-center mt-6 gap-2">
  {products.map((_, index) => (
    <span
      key={index}
      onClick={() => {
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: index * width,
          behavior: "smooth",
        });
        setActiveIndex(index);
      }}
      className={`mx-4 cursor-pointer ${
        activeIndex === index
          ? "text-black font-semibold underline underline-offset-4"
          : ""
      }`}
    >
      {index + 1}
    </span>
  ))}
</div>

    </div>
    </div>
  
  );
});

export default FeatureProductsSlider;
