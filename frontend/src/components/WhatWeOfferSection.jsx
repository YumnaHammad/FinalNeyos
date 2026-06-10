import React from "react";

const WhatWeOfferSection = ({
  title,
  description,
  items = [],
  variant = "cards", // "cards" | "icons"
}) => {
  return (
    <section className=" bg-white py-40">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {description && <p className=" text-gray-700 mb-12">{description}</p>}

        {/* CARD VARIANT */}
        {variant === "cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            {items.map((item, index) => (
              <div
                className="relative w-[300px] h-[21rem] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)]
  hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)]
  hover:-translate-y-1
  transition-all duration-300"
                key={index}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 text-left text-white">
                  <div className="rounded-xl bg-white/25 backdrop-blur-md  p-36 text-white">
                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </div>{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
