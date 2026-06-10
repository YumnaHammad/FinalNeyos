import { motion } from "framer-motion";
import { useState } from "react";

const AnimatedCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const cards = [
    { 
      id: 1, 
      title: "Smart Building", 
      description: "Advanced IoT sensors with AI-powered analytics for real-time environmental monitoring and predictive maintenance.",
      frontImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
      backBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "🏢",
      bulletPoints: [
        {
          key: "Advanced IoT Sensors",
          description: "AI-powered analytics for real-time monitoring and environmental control systems."
        },
        {
          key: "Predictive Maintenance",
          description: "Proactive system optimization and efficiency improvements with automated alerts."
        },
        {
          key: "Energy Management",
          description: "Smart energy consumption tracking and optimization for cost savings."
        },
        {
          key: "Security Integration",
          description: "Seamless integration with building security systems and access control."
        }
      ]
    },
    { 
      id: 2, 
      title: "Data Insights", 
      description: "Gain precise data and inform decisions with crowd insights to improve customer experiences and operational efficiency.",
      frontImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      backBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",

      bulletPoints: [
        {
          key: "Gain Precise Data",
          description: "Obtain accurate space occupancy and people counting data with real-time analytics."
        },
        {
          key: "Inform Decisions",
          description: "Use crowd insights to improve customer experiences and operational efficiency."
        },
        {
          key: "Traffic Patterns",
          description: "Analyze foot traffic patterns and peak usage times for better resource allocation."
        },
        {
          key: "Customer Behavior",
          description: "Track customer movement and engagement patterns for improved service delivery."
        }
      ]
    },
    { 
      id: 3, 
      title: "LoRaWAN® Ecosystem", 
      description: "Seamless integration with leading LoRaWAN networks for scalable IoT deployments and long-range connectivity.",
      frontImage: "/assets/images/bg/smart-restroom.jpg",
      backBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "📡",
      bulletPoints: [
        {
          key: "Seamless Integration",
          description: "Leading LoRaWAN networks for scalable deployments and easy device management."
        },
        {
          key: "Long-Range Connectivity",
          description: "Extended coverage for IoT device communication across large areas."
        },
        {
          key: "Low Power Consumption",
          description: "Energy-efficient communication protocols for extended battery life."
        },
        {
          key: "Global Standards",
          description: "Compliance with international LoRaWAN standards for worldwide compatibility."
        }
      ]
    },
  ];

  const handleCardFlip = (cardId, isHovering) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (isHovering) {
        newSet.add(cardId);
      } else {
        newSet.delete(cardId);
      }
      return newSet;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 0 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 py-40">
      <div className="py-60 text-center mb-12">
             <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
         Explore Our Innovative Solutions
       </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover how our cutting-edge technologies are transforming industries, enhancing efficiency, 
        and delivering smarter experiences through intelligent automation and IoT innovations.
      </p>
    </div>
      {/* Cards Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative w-full aspect-[4/3] perspective-1000"
            >
              {/* Card Container */}
              <motion.div
                className="relative w-full h-full cursor-pointer"
                animate={flippedCards.has(card.id) ? "back" : "front"}
                variants={flipVariants}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onHoverStart={() => handleCardFlip(card.id, true)}
                onHoverEnd={() => handleCardFlip(card.id, false)}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side */}
                <div 
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <img 
                      src={card.frontImage} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Enhanced Textured Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
                    
                    {/* Additional Pattern Overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
                      }}></div>
                    </div>
                    
                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      {/* Title with enhanced styling */}
                      <h2 className="text-4xl font-black text-white text-center mb-6 leading-tight tracking-wide drop-shadow-2xl">
                        {card.title}
                      </h2>
                      
                      {/* Hover Hint with enhanced styling */}
                      <p className="text-white/90 text-base font-semibold text-center tracking-wide">
                        Hover to see details
                      </p>
                    </div>
                    
                    {/* Flip Indicator */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{ 
                    backfaceVisibility: "hidden", 
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Background Image */}
                    <img 
                      src={card.frontImage} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 z-20 px-16 py-10 flex flex-col justify-center">
                      {card.bulletPoints.map((point, index) => (
                        <div key={index} className="text-left mb-8 last:mb-0">
                          <p className="text-white/90 text-lg leading-relaxed font-medium">{point.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCards;
