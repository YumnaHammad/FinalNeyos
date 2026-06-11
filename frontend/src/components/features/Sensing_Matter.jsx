import { useState, useEffect } from "react";
import { gsap } from "gsap";
import API from "../../api";
import SectionHeader from "../ui/SectionHeader";

const DEFAULT_ITEMS = [
  {
    image:
      "https://www.milesight.com/static/pc/en/index-new/sensing-insight/people-sensing-series.jpg?t=1743645815806",
    title: "PEOPLE SENSING",
  },
  {
    image:
      "https://www.milesight.com/static/pc/en/index-new/sensing-insight/smart-security.png?t=1743645815806",
    title: "SMART SECURITY",
  },
  {
    image:
      "https://www.milesight.com/static/pc/en/index-new/sensing-insight/intelligent-traffic.jpg?t=1743645815806",
    title: "INTELLIGENT",
  },
  {
    image:
      "https://www.milesight.com/static/pc/en/index-new/sensing-insight/energy-efficency-and-building.jpg?t=1743645815806",
    title: "ENERGY &",
  },
];

const Sensing_Matter = () => {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [displayItems, setDisplayItems] = useState(DEFAULT_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/sec/3")
      .then((res) => {
        const content = res.data?.content;
        if (Array.isArray(content) && content.length > 0) {
          const items = content
            .filter((item) => item.title && item.image)
            .map((item) => ({
              title: item.title,
              image: item.image,
            }));
          if (items.length > 0) {
            setDisplayItems(items);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (displayItems.length === 0) return;

    displayItems.forEach((_, i) => {
      gsap.to(`.item-${i}`, {
        width: i === clickedIndex ? "42vw" : "8vw",
        duration: 2,
        ease: "elastic(1, .6)",
      });

      gsap.to(`.item-title-${i}`, {
        opacity: i === clickedIndex ? 1 : 0.8,
        fontSize: i === clickedIndex ? "2rem" : "1rem",
        duration: 0.5,
      });
    });
  }, [clickedIndex, displayItems]);

  const expand = (index) => {
    if (index !== clickedIndex) {
      setClickedIndex(index);
    }
  };

  if (loading) {
    return (
      <section className="landing-section landing-section--muted landing-sensing">
        <div className="landing-loader">
          <div className="landing-spinner" />
        </div>
      </section>
    );
  }

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="landing-section landing-section--muted landing-sensing">
      <div className="landing-container">
        <SectionHeader
          badge="Insightful Data"
          title="Make Sensing Matter"
          subtitle="Leveraging incredible insights, we help optimize business performance and accelerate IoT strategies to energetically drive the world."
        />

        <div className="group">
          {displayItems.map((image, index) => (
            <div
              key={index}
              className={`item item-${index}`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${image.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => expand(index)}
            >
              <div className="item-content">
                <div className={`item-title item-title-${index}`}>
                  {image.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sensing_Matter;
