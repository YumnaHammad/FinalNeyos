import React, { useState,forwardRef } from "react";
import  './SmartWorkspace.css'
const slides = [
  {
    title: "Master Occupancy Detection",
    description:
      "The solution tracks workplace occupancy through intelligent people sensing. With the support of meeting room sensors and general occupancy sensors, it forms a valuable information network that enables data-oriented management. Real-time insights on the status of entrances, exits, workstation status, and meeting room availability support strategic decision-making.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/mater-workplace-occupancy.jpg?t=1752826692624", 
  },
  {
    title: "Prevent Ghost Meetings",
    description:
      "Occupancy and people counting sensors eliminate ghost meetings by detecting whether reserved rooms are actually occupied. When no presence is detected, the booking system automatically release the room for others to use. Integration with scheduling platforms enables real-time booking updates based on actual occupancy, maximizing room utilization.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/get-timely-occupancy-information.jpg?t=1752826692624",
  },
  {
    title: "Save Energy with Smart Automation",
    description:
      "Smart automation uses occupancy sensors to automatically trigger lights, display screens, control HVAC system, and manage booking systems when meeting rooms are in use. For example, it turns lights on/off based on presence and adjusts and ventilation based on room usage. Instead of relying on fixed schedules, systems react in real time to actual presence, optimizing both comfort and efficiency.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/workplace-occupancy.jpg?t=1752826692624",
  },
   {
    title: "Improve Workplace Layout",
    description:
      "Analyze workplace data to identify high-traffic areas and optimize the layout accordingly. Management can redesign spaces to maximize utilization of preferred areas and improve meeting room configurations. For example, dashboards show real usage vs. booked time, helping FM teams right-size real estate and reallocate underused rooms.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/improve-workplace-layout.jpg?t=1752826692624",
  },
   {
    title: "Display Booking Information",
    description:
      "By combining real-time occupancy data with booking schedules, workplaces can clearly display whether a space, such as a meeting room, is truly in use or just reserved. Showing both the booking information and actual occupancy status helps employees find available spaces faster, avoid conflicts, and make better use of shared areas. This transparency also supports smarter decision-making and more accurate space planning.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/display-booking-information.png?t=1752826692624",
  },
   {
    title: "Ensure Occupant Comfort & Experience",
    description:
      "Space occupancy sensors help maintain a comfortable environment by enabling smart control of lighting, temperature, and ventilation based on actual presence. Whether it's a meeting room or shared workspace, automatic adjustments improve user experience, reduce complaints, and support a healthier, more responsive indoor environment.",
    image: "https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/meeting-room-occupancy.jpg?t=1752826692624",
  },
];

const SmartWorkspace = forwardRef((props, ref)  => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section ref={ref}>
     <div className="md:flex flex-col lg:flex-row items-center justify-center min-h-screen lg:px-20 py-64bg-white px-72  hidden">
      <div className="w-full lg:w-1/2">
        <img
          src={slides[activeIndex].image}
          alt={slides[activeIndex].title}
          className="rounded-2xl shadow-md"
        />
      </div>

      <div className="w-full lg:w-1/2 px-48">
        <h5 className="font-bold mb-44 leading-tight text-left">
          Make the Most of Meeting Rooms <br />
          and Other Workspace Smart
        </h5>

        <div className="space-y-6 relative Smartcards ps-24 ">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer pl-6 relative text-black`}
            >
              <div
                className={`absolute -left-9 top-1 w-14 h-14 rounded-full ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-400"
                }`}
              />
              <p className="text-base font-semibold SmartCardtitle text-left">{slide.title}</p>
              {index === activeIndex && (
                <p className="text-xs mt-2 text-gray-600 text-left">{slide.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
     <div className="bg-[#f5f5f5] p-6 md:p-12 rounded-lg max-w-3xl mx-auto font-sans text-gray-700 relative md:hidden block px-36 py-48">
      
      {/* Main Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-black text-left mb-20">
        Make the Most of Meeting Rooms and Other Workspace Smart
      </h2>
      
      {/* Sub Heading */}
      <h3 className="text-xl font-semibold mt-4 mb-2 text-left">
         {slides[activeIndex].title}
      </h3>

      {/* Paragraph Content */}
      <p className="mb-6 leading-relaxed text-left text-xs">
      {slides[activeIndex].description}
      </p>

      {/* Image */}
      <div className="overflow-hidden rounded-xl mt-40">
        <img
          src={slides[activeIndex].image}
          alt={slides[activeIndex].title}
          className="w-full h-auto object-cover"
        />
      </div>

     {/* Pagination Numbers */}
<div className="flex justify-center items-center mt-4 text-sm font-medium text-gray-600">
  {slides.map((_, index) => (
    <span
      key={index}
      onClick={() => setActiveIndex(index)}
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
    </section>
   
  );
});

export default SmartWorkspace;
