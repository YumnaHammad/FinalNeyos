import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

const RestroomCard = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Column 1: Touch for Help */}
                    <div className="bg-[#091933] rounded-xl p-6 text-white">       
                        {/* Header */}
                        <div className="flex items-center mb-8 border-b-2 border-white py-9 ">
                                <img
                                    src="https://www.milesight.com/static/pc/en/solution/smart-restroom/icon-touch-for-help.png?t=1755854273218"
                                    alt="Touch for Help Icon"
                                    className="w-80 object-contain"
                                />
                            <h3 className="text-xl font-semibold text-white ms-24 m-0">Touch for Help</h3>
                        </div>

                        {/* Products */}
                        <div className="space-y-6 mt-44 px-20">
                            {/* Smart Button WS101 */}
                            <div className="flex items-start space-x-4">
                                                                         <img
                                         src="https://www.milesight.com/static/pc/en/solution/smart-restroom/mini-leak-detection-sensor.png?t=1755854273218"
                                         alt="Smart Button WS101 Device"
                                         className="w-[20%] rounded-2xl  object-contain"
                                     />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2 text-white text-lg text-left">Smart Button WS101</h4>
                                    <p className="text-sm text-white text-left mb-3">
                                        Touch it when there is an emergency. The instant alert is going to rescue you.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-white " />  
                                    </div>
                                  
                                </div>
                            </div>

                            {/* Mini Leak Detection Sensor WS303 */}
                            <div className="flex items-start space-x-4 mt-48">
                                                                         <img
                                         src="https://www.milesight.com/static/pc/en/solution/smart-restroom/smart-button-ws101.png?t=1755854273218"
                                         alt="Mini Leak Detection Sensor WS303 Device"
                                         className="w-80 object-contain"
                                     />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2 text-white text-lg text-left">Mini Leak Detection Sensor WS303</h4>
                                    <p className="text-sm text-white text-left mb-3">
                                        Touch to detect water leakage, getting Instant alarming and fast help.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-white " />  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Detect with AI, ToF, and PIR */}
                    <div className="bg-[#5281BC] rounded-xl p-6 text-white">
                        {/* Header */}
                        <div className="flex items-center mb-8 border-b-2 border-white py-9 ">
                                <img
                                    src="https://www.milesight.com/static/pc/en/solution/smart-restroom/icon-detect-with-ai-and-tof-technologies.png?t=1755854273218"
                                    alt="Detect with AI, ToF, and PIR Icon"
                                    className="w-80  object-contain"
                                />
                            <h3 className="text-xl ms-24 m-0 font-semibold text-white">Detect with AI, ToF, and PIR</h3>
                        </div>

                        {/* Products */}
                        <div className="space-y-6  mt-44 px-20">
                            {/* Passage People Counter VS350 */}
                            <div className="flex items-start space-x-4">
                                       <img 
                      src="https://www.milesight.com/static/pc/en/solution/smart-restroom/vs350.png?t=1755854273218"
                      alt="Passage People Counter VS350 Device"
                      className="w-80 object-contain"
                    />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2 text-white text-lg text-left">Passage People Counter VS350</h4>
                                    <p className="text-sm text-white text-left mb-3">
                                        Detect foot traffic tendency in real-time for data-driven and efficient management.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-white " />  
                                    </div>
                                </div>
                            </div>

                            {/* AI ToF People Counting Sensor VS133 */}
                            <div className="flex items-start space-x-4 mt-48">
                                       <img 
                      src="https://www.milesight.com/static/pc/en/solution/smart-restroom/ai-tof-people-counting-sensor.png?t=1755854273218"
                      alt="AI ToF People Counting Sensor VS133 Device"
                      className="w-80 object-contain"
                    />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2 text-white text-lg text-left">AI ToF People Counting Sensor VS133</h4>
                                    <p className="text-sm text-white text-left mb-3">
                                        Detect traffic of restrooms in real-time and set up a database for long-term management, running a sustainable and highly efficient restroom.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-white " />  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Connect for Device Linkage */}
                    <div className="bg-[#F5F5F5] rounded-xl p-6 text-white">
                        {/* Header */}
                        <div className="flex items-center mb-8 border-b-2 border-gray-300 py-9 ">
                                <img
                                    src="https://www.milesight.com/static/pc/en/solution/smart-restroom/icon-connect-for-device-linkage.png?t=1755854273218"
                                    alt="Connect for Device Linkage Icon"
                                    className="w-80  object-contain"
                                />
                            <h3 className="text-xl ms-24 m-0 font-semibold ">Connect for Device Linkage</h3>
                        </div>

                        {/* Products */}
                        <div className="space-y-6  mt-44 px-20">
                            {/* IoT Controller UC300 */}
                            <div className="flex items-start space-x-4 ">
                                       <img 
                      src="https://www.milesight.com/static/pc/en/solution/smart-restroom/iot-controller-uc300.png?t=1755854273218"
                      alt="IoT Controller UC300 Device"
                      className="w-80 object-contain"
                    />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2  text-lg text-left">IoT Controller UC300</h4>
                                    <p className="text-sm text-[#5281BC] text-left mb-3">
                                        Connect devices such as HVAC system to realize smart collaboration via rich interfaces.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-[#5281BC]" />  
                                    </div>
                                </div>
                            </div>

                            {/* IoT Controller UC502 */}
                            <div className="flex items-start space-x-4 mt-48 mb-24">
                                       <img 
                      src="https://www.milesight.com/static/pc/en/solution/smart-restroom/iot-controller-uc502.png?t=1755854273218"
                      alt="IoT Controller UC502 Device"
                      className="w-80 object-contain"
                    />
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2 text-lg text-left">IoT Controller UC502</h4>
                                    <p className="text-sm text-[#5281BC] text-left mb-3">
                                        Connect wired meters to the LoRaWAN® network for collecting power and water consumption remotely, improving management efficiency and saving energy.
                                    </p>
                                    <div className='flex items-end justify-end'>
                                        <FaArrowRight className="text-[#5281BC] " />  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RestroomCard