import { forwardRef } from "react";

const IntegratedPlatforms = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <section
      className="bg-cover bg-center bg-no-repeat text-white py-16 px-6 md:px-16 md:block hidden"
      style={{ backgroundImage: `url('https://www.milesight.com/static/pc/en/solution/smart-space-occupancy/great-compatibility.jpg?t=1752826692624')` }}
    >
      <div className="p-8 rounded-xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className='py-80 ps-56'>
            <h5 className="text-4xl font-semibold text-white text-left leading-snug mb-6">
              Integrated with Third Party <br /> Platforms
            </h5>
            <p className="text-base leading-relaxed text-white text-left">
              Except Milesight IoT Cloud, the devices can also well collaborate with third-party
              platforms through open APIs and MQTT/HTTP(s), extending applications to realize
              different actual demands. It will easily cover the space occupancy rate, space
              utilization, various linkages, and space management.
            </p>
          </div>

          {/* (Optional) Right side content */}
          <div />
        </div>
      </div>
    </section>
    <div className='md:hidden block'>
<div className="relative bg-white p-6 max-w-xl mx-auto rounded-md shadow-md px-36">
      {/* Text Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-left">
        Integrated with Third Party Platforms
      </h2>
      <p className="text-gray-700 text-base leading-relaxed text-left">
        Except Milesight IoT Cloud, the devices can also well collaborate with
        third-party platforms through open APIs and MQTT/HTTP(s), extending
        applications to realize different actual demands. It will easily cover
        the space occupancy rate, space utilization, various linkages, and
        space management.
      </p>
          {/* Image Section */}
      <img
        src='https://www.milesight.com/static/mobile/en/solution/smart-space-occupancy/new/compatibility.jpg?t=1752826706878'
        alt="Integration"
        className="w-full rounded-lg mt-14"
      style={{height:'19rem'}}/>
    </div>
    </div>
    </div>
  
  );
});

export default IntegratedPlatforms;
