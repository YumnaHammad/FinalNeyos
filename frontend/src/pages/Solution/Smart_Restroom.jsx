import React ,{useEffect, useState} from 'react'
import ImageRightText from '../../components/ImageRightText'
import RestroomCard from '../../components/Solution/SmartRestroom/RestroomCard'
import InterestedSection from '../../components/Solution/InterestedSection'
import retail_related_links from "../../assets/images/nexyos/retail_related_links.png";
import extrance from "../../assets/images/nexyos/extrance.jpg";
import Store1 from "../../assets/images/nexyos/Store1.jpg";
import WhyChooseUs from '../../components/WhyChooseUs'
import ReactPlayer from 'react-player'

const Smart_Restroom = () => {
     const [section1Data, setSection1Data] = useState(null);
     const [section2Data, setSection2Data] = useState(null);
     const [section3Data, setSection3Data] = useState(null);
     const [section4Data, setSection4Data] = useState(null);
  const data = [
    {
      title: "Entrance & Exit Management",
      description:
        "Advanced deep learning technology achieves an industry-leading algorithm effect to bring convenience to users",
      image: extrance,
    },
    {
      title: "Store",
      description:
        "Secure your store with high definition video evidence and quick emergency response",
      image: Store1,
    },
    {
      title: "Retail",
      description:
        "Caters to businesses that may vary in size but share the need for smarter operations, better security, and more insightful business",
      image: retail_related_links,
    },
  ];
  const fetchSection1Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-restroom/section-1"
      );
      const data = await response.json();
      setSection1Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 1 data:", error);
    }
  };

  const fetchSection2Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-restroom/section-2"
      );
      const data = await response.json();
      setSection2Data(Array.isArray(data) ? data[0] : data);
    } catch (error) {
      console.error("Error fetching section 2 data:", error);
    }
  };

  const fetchSection3Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-restroom/section-3"
      );
      const data = await response.json();
      setSection3Data(data);
    } catch (error) {
      console.error("Error fetching section 3 data:", error);
    }
  };

  const fetchSection4Data = async () => {
    try {
      const response = await fetch(
        "https://nexyos.deeptech.pk/api/smart-restroom/section-4"
      );
      const data = await response.json();
      setSection4Data(data);
    } catch (error) {
      console.error("Error fetching section 4 data:", error);
    }
  };

  useEffect(() => {
    fetchSection1Data();
    fetchSection2Data();
    fetchSection3Data();
    fetchSection4Data();
  }, []);
  return (
    <>
      {/* Section 1 - Hero Section from API */}
      {section1Data && (
        <WhyChooseUs
          heading={section1Data.heading}
          subHeadings={section1Data.sub_heading ? [section1Data.sub_heading] : []}
          image={section1Data.image}
          badgeText="Live Preview"
          headingIconClass="ph ph-target"
          itemIconClass="ph ph-shield-check"
        />
      )}

      <div className="mt-5">
        {/* Section 2 - Reshape Restrooms with Smartness from API */}
        {section2Data && (
          <div className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Main Title */}
                <h2 className="text-5xl font-semibold text-center my-36">
                  {section2Data.heading}
                </h2>
                
                {/* Video Container */}
                <div className="relative bg-white rounded-2xl shadow-lg">
                  <div className="relative">
                    <div className="rounded-xl relative overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                      {section2Data.file && (
                        <ReactPlayer
                          url={section2Data.file}
                          width="100%"
                          height="100%"
                          controls={true}
                          className="absolute top-0 left-0"
                          style={{ position: 'absolute', top: 0, left: 0 }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3 - Smart Restroom Management System from API */}
        {section3Data && (
          <ImageRightText
            title={section3Data.heading}
            description={section3Data.paragraph}
            linkText="Explore Smart Features"
            linkHref={section3Data.link || "#"}
            imageSrc={section3Data.image}
            imageAlt="Smart Restroom Management System Interface"
            imageHeight="500px"
            reverse={false}
          />
        )}
        
        {/* Section 4 - Yes! Get Nexyos Smart Restroom Solution from API */}
        {section4Data && (
          <div className="bg-white py-20 mt-28">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {section4Data.heading}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-6xl mx-auto leading-relaxed">
                    {section4Data.paragraph}
                  </p>
                </div>
                
                {/* Visual Section with Smart Interface Overlay */}
                <div className="relative">
                  {/* Restroom Background */}
                  <div className="rounded-xl h-96 relative overflow-hidden">
                    {section4Data.image && (
                      <img 
                        src={section4Data.image}
                        alt={section4Data.heading}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <RestroomCard/>
        <InterestedSection sectionTitle="You may also be interested in" items={data}/>
      </div>
    </>
  )
}

export default Smart_Restroom
