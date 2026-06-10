import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../../api";
import SectionHeader from "../../ui/SectionHeader";

const DEFAULT_VENDORS = [
  { name: "Hikvision" },
  { name: "Milesight" },
  { name: "Dahua" },
  { name: "Pelco" },
  { name: "Nexyos Global" },
  { name: "IoT Solutions Inc" },
];

const normalizeVendors = (content) => {
  if (!Array.isArray(content) || content.length === 0) return DEFAULT_VENDORS;
  return content
    .filter((item) => item && (item.name || item.head))
    .map((item) => ({ name: item.name || item.head || "Partner" }));
};

export default function TrustedBy() {
  const [vendors, setVendors] = useState(DEFAULT_VENDORS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/sec/8")
      .then((res) => {
        const items = normalizeVendors(res.data?.content);
        if (items.length > 0) setVendors(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const tickerItems = [...vendors, ...vendors, ...vendors];

  if (loading) {
    return (
      <section className="landing-section landing-trusted py-16">
        <div className="landing-loader">
          <div className="landing-spinner" style={{ borderTopColor: "#5eead4" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="landing-section landing-trusted py-16 md:py-20 overflow-hidden">
      <div className="landing-container mb-10">
        <SectionHeader
          badge="Our Ecosystem"
          title="Trusted by Industry Leaders"
          subtitle="Leading brands and integrators worldwide rely on Nexyos technology."
          light
        />
      </div>

      <div className="relative flex overflow-x-hidden w-full">
        <motion.div
          className="flex items-center whitespace-nowrap gap-10 md:gap-16"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            repeat: Infinity,
            duration: Math.max(20, vendors.length * 4),
            ease: "linear",
          }}
        >
          {tickerItems.map((vendor, index) => (
            <span
              key={`${vendor.name}-${index}`}
              className="trusted-ticker-text flex-shrink-0 font-black text-lg md:text-2xl uppercase tracking-tight transition-colors duration-300"
            >
              {vendor.name}
            </span>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-24 md:w-32 landing-trusted-fade-l z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 landing-trusted-fade-r z-10 pointer-events-none" />
      </div>
    </section>
  );
}
