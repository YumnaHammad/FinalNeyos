import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API, { resolveMediaUrl } from "../../api";
import SectionHeader from "./SectionHeader";

const DEFAULT_DATA = {
  meta: {
    tag: "Our Capabilities",
    title: "Innovative IoT Solutions",
    subtitle:
      "Discover how our cutting-edge technologies are transforming industries and delivering smarter experiences.",
  },
  cards: [
    {
      id: 1,
      title: "Smart Building",
      frontImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
      frontHint: "Hover to see details",
      bulletPoints: [
        "AI-powered analytics for real-time monitoring and environmental control systems.",
        "Proactive system optimization and efficiency improvements with automated alerts.",
        "Smart energy consumption tracking and optimization for cost savings.",
        "Seamless integration with building security systems and access control.",
      ],
    },
    {
      id: 2,
      title: "Data Insights",
      frontImage:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      frontHint: "Hover to see details",
      bulletPoints: [
        "Obtain accurate space occupancy and people counting data with real-time analytics.",
        "Use crowd insights to improve customer experiences and operational efficiency.",
        "Analyze foot traffic patterns and peak usage times for better resource allocation.",
        "Track customer movement and engagement patterns for improved service delivery.",
      ],
    },
    {
      id: 3,
      title: "LoRaWAN® Ecosystem",
      frontImage: "/assets/images/bg/smart-restroom.jpg",
      frontHint: "Hover to see details",
      bulletPoints: [
        "Leading LoRaWAN networks for scalable deployments and easy device management.",
        "Extended coverage for IoT device communication across large areas.",
        "Energy-efficient communication protocols for extended battery life.",
        "Compliance with international LoRaWAN standards for worldwide compatibility.",
      ],
    },
  ],
};

const normalizeBullets = (points) => {
  if (!Array.isArray(points)) return [];
  return points.map((p) =>
    typeof p === "string" ? p : p.description || p.key || ""
  ).filter(Boolean);
};

const parseCapabilities = (data) => {
  const content = data?.content;
  const block = Array.isArray(content)
    ? content.find((c) => c.kind === "capabilities") || content[0]
    : null;
  if (!block?.cards?.length) return DEFAULT_DATA;

  return {
    meta: { ...DEFAULT_DATA.meta, ...block.meta },
    cards: block.cards.map((card, i) => ({
      id: card._id || i + 1,
      title: card.title || "",
      frontImage: resolveMediaUrl(card.frontImage || ""),
      frontHint: card.frontHint || "Hover to see details",
      bulletPoints: normalizeBullets(card.bulletPoints),
    })),
  };
};

const AnimatedCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [section, setSection] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  const { meta, cards } = section;

  useEffect(() => {
    API.get("/sec/7")
      .then((res) => setSection(parseCapabilities(res.data)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCardFlip = (cardId, isHovering) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (isHovering) next.add(cardId);
      else next.delete(cardId);
      return next;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  if (loading) {
    return (
      <section className="landing-section landing-capabilities">
        <div className="landing-loader">
          <div className="landing-spinner" />
        </div>
      </section>
    );
  }

  if (!cards.length) return null;

  return (
    <section className="landing-section landing-capabilities">
      <div className="landing-container">
        <SectionHeader badge={meta.tag} title={meta.title} subtitle={meta.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
              <motion.div
                className="relative w-full h-full cursor-pointer"
                animate={flippedCards.has(card.id) ? "back" : "front"}
                variants={flipVariants}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onHoverStart={() => handleCardFlip(card.id, true)}
                onHoverEnd={() => handleCardFlip(card.id, false)}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative w-full h-full">
                    {card.frontImage ? (
                      <img
                        src={card.frontImage}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <h2 className="text-4xl font-black text-white text-center mb-6 leading-tight tracking-wide drop-shadow-2xl">
                        {card.title}
                      </h2>
                      <p className="text-white/90 text-base font-semibold text-center tracking-wide">
                        {card.frontHint}
                      </p>
                    </div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative w-full h-full">
                    {card.frontImage ? (
                      <img
                        src={card.frontImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800" />
                    )}
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <div className="absolute inset-0 z-20 px-8 md:px-16 py-8 md:py-10 flex flex-col justify-center overflow-y-auto">
                      {card.bulletPoints.map((text, index) => (
                        <div key={index} className="text-left mb-6 last:mb-0">
                          <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                            {text}
                          </p>
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
    </section>
  );
};

export default AnimatedCards;
