import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";



const ReliableResources = () => {
  return (
    <div className="bg-white py-20 mt-36">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Reliable smart restroom management
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Enhance hygiene and improve operations with a comprehensive range of smart restroom solutions to suit the needs of any facility, with advanced IoT sensors and open platform for easy integrations.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-36">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Advanced smart restroom management systems
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed text-left">
              Stay ahead of hygiene challenges and operational inefficiencies with our smart restroom systems. With AI-powered analytics and IoT sensors, go beyond basic monitoring to optimize operations, safeguard public health, identify maintenance needs and enhance facility productivity.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4 mt-28">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <IoMdCheckmarkCircleOutline size={32}/>
                </div>
                <p className="text-gray-600 text-left">
                  Never miss maintenance needs no matter where you are with our detailed sensor data and remote monitoring capabilities.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <IoMdCheckmarkCircleOutline size={32}/>
                </div>
                <p className="text-gray-600 text-left">
                  Reduce operational costs, monitor hygiene levels and proactively detect issues with our smart restroom management systems.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <IoMdCheckmarkCircleOutline size={32}/>
                </div>
                <p className="text-gray-600 text-left">
                  Save time and money with reduced maintenance costs and seamless integrations with your existing facility management systems.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="pt-4">
              <a 
                href="/contact" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-300"
              >
                Get a demo
                <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
          
          {/* Right Column - Image Content */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Smart Restroom Device */}
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="w-64 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🚽</span>
                    </div>
                    <div className="text-gray-600 font-semibold">Smart Restroom</div>
                    <div className="text-gray-500 text-sm">Management System</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 text-gray-400 font-bold text-sm">
                  NEXYOS
                </div>
              </div>
            </div>
            
            {/* Background - Blurred Restroom Scene */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg opacity-50 -z-10">
              <div className="absolute bottom-4 left-4 w-32 h-32 bg-gray-200 rounded-lg opacity-60"></div>
              <div className="absolute top-8 right-8 w-24 h-24 bg-gray-300 rounded-full opacity-40"></div>
              <div className="absolute bottom-8 right-4 w-20 h-20 bg-blue-200 rounded-lg opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReliableResources