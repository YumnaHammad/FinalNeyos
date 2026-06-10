import React from 'react'

const ReshapRestrom = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h2 className="text-5xl font-semibold text-center my-36">
            Reshape Restrooms with Smartness
          </h2>
          
          {/* Restroom Image Container */}
          <div className="relative bg-white rounded-2xl shadow-lg ">
            {/* Restroom Entrance Image */}
            <div className="relative">
              {/* Background restroom image */}
              <div className="rounded-xl h-96 relative overflow-hidden">
                <img 
                  src=""
                  alt="Smart Restroom Video Cover"
                  className="w-full h-full object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReshapRestrom