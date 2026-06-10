import { useState, useEffect } from "react";
import { gsap } from "gsap";

const images = [
  {
    url: "https://www.milesight.com/static/pc/en/index-new/sensing-insight/people-sensing-series.jpg?t=1743645815806",
    title: "PEOPLE SENSING",
  },
  {
    url: "https://www.milesight.com/static/pc/en/index-new/sensing-insight/smart-security.png?t=1743645815806",
    title: "SMART SECURITY",
  },
  {
    url: "https://www.milesight.com/static/pc/en/index-new/sensing-insight/intelligent-traffic.jpg?t=1743645815806",
    title: "INTELLIGENT",
    subtitle: "AEC 134 ABC\nABC 123",
  },
  {
    url: "https://www.milesight.com/static/pc/en/index-new/sensing-insight/energy-efficency-and-building.jpg?t=1743645815806",
    title: "ENERGY &",
  },
];

const Sensing_Matter = () => {
  const [clickedIndex, setClickedIndex] = useState(0);

  useEffect(() => {
    images.forEach((_, i) => {
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

      gsap.to(`.item-subtitle-${i}`, {
        opacity: i === clickedIndex ? 1 : 0,
        duration: 0.5,
        delay: 0.3,
      });
    });
  }, [clickedIndex]);

  const expand = (index) => {
    if (index !== clickedIndex) {
      setClickedIndex(index);
    }
  };

  return (
    <div className="slider-container">
      <div className="container text-slide2">
        <h2 className="text-center "  data-aos="fade-right" >Make Sensing Matter</h2>
        <p className="text-center">
          Leveraging the incredible insights, we help people optimize their
          business and accelerate IoT <br /> strategies to energetically drive
          the world.
        </p>

        <div className="group">
          {images.map((image, index) => (
            <div
              key={index}
              className={`item item-${index}`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${image.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => expand(index)}
            >
              <div className="item-content">
                <div className={`item-title item-title-${index}`}>
                  {image.title}
                </div>
                {image.subtitle && (
                  <div className={`item-subtitle item-subtitle-${index}`}>
                    {image.subtitle.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sensing_Matter;
