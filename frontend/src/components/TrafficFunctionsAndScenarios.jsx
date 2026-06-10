import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { RefreshCw, ArrowUp } from "lucide-react";

const SCENARIOS = [
  {
    key: "urban",
    label: "Urban Roadway",
    hero: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/urban-roadway.jpg?t=1752047454678",
    functions: [
      { id: 1, title: "Urban Access Management", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/urban-access-management.png?t=1752047454678" ,icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-1.png?t=1752047454678' },
      { id: 2, title: "Speed Enforcement", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/speed-enforcement.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-2.png?t=1752047454678' },
      { id: 3, title: "No-plate Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/no-plate-detection.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-3.png?t=1752047454678' },
      { id: 4, title: "Traffic Flow Analysis", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/traffic-flow-analysis.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-4.png?t=1752047454678' },
      { id: 5, title: "Reverse Driving Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/reverse-driving-detection.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-5.png?t=1752047454678' },
       { id: 6, title: "Specific Lane Management", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/specific-lane-management.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-6.png?t=1752047454678' },
    ],
  },
  {
    key: "intersection",
    label: "Intersection",
    hero: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/intersection.jpg?t=1752047454678",
    functions: [
      { id: 1, title: "Red Light Violation", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/red-light-violation.png?t=1752047454678" ,icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-1.png?t=1752047454678' },
      { id: 2, title: "Object Counting & Classification", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/object-counting-and-classification.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-2.png?t=1752047454678' },
      { id: 3, title: "Jam Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/jam-detection.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-3.png?t=1752047454678' },
      { id: 4, title: "Intersection Multi-directional Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/intersection-multi-directional-detection.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-4.png?t=1752047454678' },
      { id: 5, title: "Video Surveillance", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/video-surveillance.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-5.png?t=1752047454678' },
       { id: 6, title: "Outdoor Parking Monitoring", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/outdoor-parking-monitoring.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-6.png?t=1752047454678' },
    ],
  },
  {
    key: "onstreet",
    label: "On‑street",
    hero: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/on-street.jpg?t=1752047454678",
      functions: [
      { id: 1, title: "Illegal Dumping Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/illegal-dumping-detection.png?t=1752047454678" ,icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-1.png?t=1752047454678' },
      { id: 2, title: "Wanted & Stolen Vehicle Identification", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/wanted-and-stolen-vehicle-identifiction.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-2.png?t=1752047454678' },
      { id: 3, title: "On-street Parking Fee Collection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/on-street-parking-fee-collection.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-3.png?t=1752047454678' },
   
    ],
  },
  {
    key: "highway",
    label: "Highway",
    hero: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/highway.jpg?t=1752047454678",
      functions: [
      { id: 1, title: "Fire & Smoke Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/fire-and-smoke-detection.png?t=1752047454678" ,icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-1.png?t=1752047454678' },
      { id: 2, title: "ADR Recognition", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/adr-recognition.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-2.png?t=1752047454678' },
      { id: 3, title: "Entrance & Exit Management", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/entrance-and-exit-management.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-3.png?t=1752047454678' },
      { id: 4, title: "Human/Car Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/human-and-car-detection.png?t=1752047454678",icon1: 'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-4.png?t=1752047454678' },
      { id: 5, title: "Instant Bicycle Detection", icon: "https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/instant-bicycle-detection.png?t=1752047454678",icon1:'https://www.milesight.com/static/mobile/en/technology/anpr-solution-new/enriched-intelligent-traffic-functions-scenarios-5.png?t=1752047454678' },
    ],
  },
];

const Pill = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`Pill px-12 py-8 text-sm font-medium transition-colors ${
      active ? "active" : "unactive"
    }`}
    style={{ borderRadius: "8px" }}
  >
    {children}
  </button>
);

const PinBadge = ({ id }) => (
  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-[10px]">
    {id}
  </span>
);
const data = [
  {
    title: "Urban Roadway",
    image1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/urban-roadway-2.jpg?t=1752047468312",
    image2:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/urban-roadway-3.png?t=1752047468312",
  },
  {
    title: "Intersection",
    image1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/intersection-2.jpg?t=1752047468312",
    image2:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/intersection-3.png?t=1752047468312",
  },
  {
    title: "On-street",
    image1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/on-street-2.jpg?t=1752047468312",
    image2:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/on-street-3.png?t=1752047468312",
  },
  {
    title: "Highway",
    image1:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/highway-2.jpg?t=1752047468312",
    image2:
      "https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/highway-3.png?t=1752047468312",
  },
];

export default function TrafficUI() {
  const [index, setIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(false);
    const timeout = setTimeout(() => {
      setShowOverlay(true);
    }, 700);
    return () => clearTimeout(timeout);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };
  const [activeKey, setActiveKey] = useState("urban");
  const containerRef = useRef(null);

  const scenario = SCENARIOS.find((s) => s.key === activeKey);

  /* Smooth‑scroll to top when the ↑ FAB is clicked */
  const scrollToTop = () =>
    containerRef.current?.scrollIntoView({ behavior: "smooth" });

  /* “Refresh” just forces a re‑render – handy placeholder hook ➜ extend as needed */
  const [nonce, setNonce] = useState(0);
  const doRefresh = () => setNonce(nonce + 1);
  return (
    <>
      <div className="hidden lg:block">
        <div className="relative w-full h-screen text-white overflow-hidden ps-28 pb-28">
          {/* Fixed Background Image */}
          <img
            src="https://www.milesight.com/static/pc/en/page/technology/solution/anpr-solution/index-new/enriched-intelligent-traffic-functions-scenarios-background.jpg?t=1752047468312"
            alt="background"
            className="absolute inset-0 w-full  object-cover z-0"
            style={{ borderRadius: "0px" }}
          />
          <div className="absolute top-0 w-full flex justify-between items-center mt-28 pe-48">
            {/* Title Bar */}
            <div className="text-2xl font-bold text-left">
              Enriched Intelligent Traffic Functions & Scenarios
            </div>
            {/* Arrow Navigation */}
            <div className=" flex items-center ">
              <div className="flex">
                <span className="text-lg font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>/04</span>
              </div>
              <button
                onClick={prevSlide}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full"
              >
                <ChevronLeft className="text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full"
              >
                <ChevronRight className="text-white" />
              </button>
            </div>
          </div>

          {/* Main Carousel Image Container */}
          <div className="absolute top-24 left-6 right-6 bottom-12 z-10">
            <img
              src={data[index].image1}
              alt={data[index].title}
              className="w-full rounded-lg shadow-xl transition-all duration-500"
              style={{ height: "27rem" }}
            />
            {showOverlay && (
              <img
                src={data[index].image2}
                alt="Overlay"
                className="absolute top-0 left-0 w-full  rounded-lg shadow-xl animate-fade-in"
                style={{ height: "27rem" }}
              />
            )}

            {/* Right Sidebar Overlapping the Main Image */}
            <div
              className="absolute top-0 right-0 bg-black/30 p-4 space-y-4 z-20 rounded-lg"
              style={{ width: "25%", height: "27rem" }}
            >
              {data.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`cursor-pointer rounded overflow-hidden border-2 transition-all duration-300 bg-white mb-8`}
                >
                  <img
                    src={item.image1}
                    alt={item.title}
                    className="w-full object-cover"
                    style={{ height: "68px", borderRadius: "0px" }}
                  />
                  <div
                    className={`p-2 text-center text-black bg-white  ${
                      index === i ? "text-blue-100" : ""
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom animation */}
          <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
        </div>
      </div>
      <div className="block lg:hidden">
        <div
          ref={containerRef}
          key={nonce}
          className="TrafficScenario relative mx-auto max-w-md pb-24"
        >
          {/* 💡 Title */}
          <h1 className="text-center text-2xl sm:text-3xl font-semibold leading-tight mb-6">
            Enriched Intelligent Traffic <br className="hidden sm:block" />
            Functions&nbsp;&amp;&nbsp;Scenarios
          </h1>

          {/* 💡 Tabs */}
          <div className="flex grid grid-cols-2 gap-12 justify-center mb-6">
            {SCENARIOS.map((s) => (
              <Pill
                key={s.key}
                active={s.key === activeKey}
                onClick={() => setActiveKey(s.key)}
              >
                {s.label}
              </Pill>
            ))}
          </div>

          {/* 💡 Hero with overlay pins */}
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={scenario.hero}
              alt={scenario.label}
              className="w-full object-cover"
            />
          </div>
          <div className="bg-white" style={{ height: "28rem" ,borderRadius: '12px'}}>
            {/* 💡 Section title */}
            <h2 className="text-center text-xl font-semibold pt-18">
              {scenario.label}
            </h2>
            {/* 💡 Functions list */}
            <div className="px-16">
              {scenario.functions.map((fn) => (
                <div
                  key={fn.id}
                  className="flex items-center justify-between bg-gray-100  mb-16 pe-16 "
               style={{height:'43px'}} >
                  <div className="flex items-center gap-3">
                    {/* thumbnail */}
                    <img
                      src={fn.icon}
                      alt={fn.title}
                      className="rounded-full Trafficthumbnail"
                    />
                    {/* text */}
                    <div className="text-sm font-medium leading-snug text-black text-left">
                      {fn.title}
                    </div>
                  </div>

                  {/* badge on the right */}
                  <img
                      src={fn.icon1}
                      alt={fn.title}
                      className="rounded-full TrafficIcon"
                    />
                </div>
              ))}

              {/* Empty‑state fallback */}
              {scenario.functions.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No demo items yet for <strong>{scenario.label}</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
