import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerModal from "../../components/Company/BannerModal";
import Contact from "../../components/Contact";
import "../../style/About.css";
import AnimatedCards from "../../components/AnimatedCards";

const Partner = () => {
  const [currentImage, setCurrentImage] = useState("default");

  // Images data for Why Nexyos section
  const images = {
    default:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    sensing:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    exhibitions:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-events.jpg?t=1746582988309",
    industries:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-at-glance.png?t=1746582988309",
    sensors:
      "https://www.milesight.com/static/pc/en/company/partner-program/milesight-product-portfolio.png?t=1746582988309",
    experience:
      "https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703",
  };

  // Technology innovations data
  const innovations = [
    {
      title: "AIGT",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
    {
      title: "Advanced Analytics",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
    },
    {
      title: "IoT Integration",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Smart Detection",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
    {
      title: "Heat Mapping",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Cloud AI",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/structure-design-recessed-mount.png?t=1746582988309",
    },
    {
      title: "Video Intelligence",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/heat-map.png?t=1746582988309",
    },
    {
      title: "Edge Computing",
      image:
        "https://www.milesight.com/static/pc/en/company/partner-program/ai-vca.png?t=1746582988309",
    },
  ];

  // Partner benefits data
  const partnerBenefits = [
    {
      title: "Sales Support",
      description: "Comprehensive sales training, marketing materials, and lead generation support",
      icon: "🤝"
    },
    {
      title: "Marketing Support",
      description: "Co-marketing campaigns, digital assets, and brand guidelines",
      icon: "📢"
    },
    {
      title: "Technical Support",
      description: "Expert technical assistance and product training for your team",
      icon: "⚙️"
    },
    {
      title: "Growth Support",
      description: "Business development strategies and market expansion guidance",
      icon: "📈"
    },
    {
      title: "Training Programs",
      description: "Regular training sessions and certification programs",
      icon: "🎓"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support for critical business needs",
      icon: "🕐"
    }
  ];

  // Partner types data
  const partnerTypes = [
    {
      title: "Channel Partners",
      description: "Resellers and distributors of our products and solutions",
      icon: "🏪"
    },
    {
      title: "Technology Partners",
      description: "Companies that integrate our technology into their platforms",
      icon: "🔧"
    },
    {
      title: "Solution Partners",
      description: "Partners who build complete solutions using our products",
      icon: "💡"
    },
    {
      title: "Developer Partners",
      description: "Software developers creating applications for our ecosystem",
      icon: "👨‍💻"
    },
    {
      title: "System Integrators",
      description: "Partners who implement and customize our solutions",
      icon: "🔗"
    },
    {
      title: "Consulting Partners",
      description: "Advisory services and implementation consulting",
      icon: "📋"
    }
  ];

  const handleHeadingClick = (imageKey) => {
    setCurrentImage(imageKey);
  };

  return (
    <>
      {/* Section 1: Hero Banner */}
      <BannerModal 
        title="Nexyos Partner Program"
        description="Join our comprehensive partner program designed to support profitable growth with sales, marketing, and technical expertise."
      />

      {/* Section 2: Partner Program Overview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 my-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="lg:pr-8">
                <h5 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" data-aos="fade-right">
                  Partner with Nexyos
                </h5>
                <p className="text-xl pb-8 text-gray-600 mb-6">
                  Our comprehensive partner program is designed to provide a flexible 
                  and valuable platform that supports the profitable growth of our 
                  partners and distributors.
                </p>
                <p className="mb-5 text-gray-600">
                  We offer committed support encompassing sales, marketing, and 
                  technical expertise, helping partners address challenges and 
                  outperform in competitive markets.
                </p>
                <p className="mb-0 text-gray-600">
                  With over 15 years of experience in IoT and video surveillance, 
                  our partners gain access to cutting-edge technology and proven 
                  business models that drive success.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="lg:pl-4">
                <img
                  src="https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703"
                  alt="Nexyos Partner"
                  className="w-full rounded-2xl shadow-lg"
                  data-aos="fade-left"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Partner Benefits */}
      <section className="py-20 bg-white my-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" data-aos="fade-up">
              Partner Benefits
            </h3>
            <p className="text-xl text-gray-600 mb-0">
              Comprehensive support to help you succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <div 
                className="bg-white h-full border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">{benefit.icon}</div>
                  <h5 className="font-semibold mb-4 text-gray-900 text-lg">{benefit.title}</h5>
                  <p className="text-gray-600 mb-0 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose Nexyos */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 my-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900" data-aos="fade-up">
              Why Partner with Nexyos?
            </h3>
            <p className="text-xl text-gray-600 mb-0">
              Discover the key advantages that make us the ideal partner
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-5/12">
              <div className="lg:pr-8">
                <div className="mb-6">
                  <div 
                    className="flex items-start p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleHeadingClick("sensing")}
                    style={{ 
                      cursor: 'pointer', 
                      backgroundColor: currentImage === "sensing" ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                      border: currentImage === "sensing" ? '2px solid #3b82f6' : '2px solid transparent'
                    }}
                    data-aos="fade-right"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-blue-600 text-white rounded-full flex items-center justify-center w-12 h-12">
                        <i className="fas fa-globe fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-bold mb-2 text-gray-900 text-base">
                        Global Sensing Solutions
                      </h5>
                      <p className="text-gray-600 mb-0 text-sm leading-relaxed">
                        Advanced sensing products for millions worldwide
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div 
                    className="flex items-start p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleHeadingClick("exhibitions")}
                    style={{ 
                      cursor: 'pointer', 
                      backgroundColor: currentImage === "exhibitions" ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                      border: currentImage === "exhibitions" ? '2px solid #3b82f6' : '2px solid transparent'
                    }}
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-green-600 text-white rounded-full flex items-center justify-center w-12 h-12">
                        <i className="fas fa-calendar-alt fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-bold mb-2 text-gray-900 text-base">
                        Industry Leadership
                      </h5>
                      <p className="text-gray-600 mb-0 text-sm leading-relaxed">
                        Active participant in influential exhibitions and events
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-0">
                  <div 
                    className="flex items-start p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleHeadingClick("industries")}
                    style={{ 
                      cursor: 'pointer', 
                      backgroundColor: currentImage === "industries" ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                      border: currentImage === "industries" ? '2px solid #3b82f6' : '2px solid transparent'
                    }}
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-yellow-500 text-white rounded-full flex items-center justify-center w-12 h-12">
                        <i className="fas fa-industry fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-bold mb-2 text-gray-900 text-base">
                        Industry Presence
                      </h5>
                      <p className="text-gray-600 mb-0 text-sm leading-relaxed">
                        Prominent presence across multiple industries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-7/12">
              <div className="lg:pl-8">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-2xl" style={{transform: 'rotate(-2deg)', zIndex: 1}}></div>
                  <div className="relative" style={{zIndex: 2}}>
                    <img
                      src={images[currentImage]}
                      alt="Nexyos content"
                      className="w-full rounded-2xl shadow-lg"
                      data-aos="fade-left"
                      style={{transform: 'rotate(1deg)'}}
                    />
                  </div>
                  <div className="absolute top-0 right-0 bg-white rounded-full flex items-center justify-center shadow-lg w-20 h-20" 
                       style={{transform: 'translate(20px, -20px)', zIndex: 3}}>
                    <i className="fas fa-star text-yellow-500 text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Partner Types */}
      <section className="py-60 bg-white my-5">
        <div className="container">
          <div className="text-center mb-8">
            <h4 className="display-6 fw-bold mb-4 text-dark" data-aos="fade-up">
              Partner Types
            </h4>
            <p className="lead text-muted mb-0">
              Multiple partnership opportunities to fit your business model
            </p>
          </div>
          <div className="row g-5">
            {partnerTypes.map((type, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div 
                  className="card h-100 border-0 shadow-sm hover-lift"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <div className="card-body text-center p-5">
                    <div className="display-3 mb-4">{type.icon}</div>
                    <h5 className="fw-semibold mb-4 text-dark">{type.title}</h5>
                    <p className="text-muted lh-base mb-0">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Technology Innovations */}
      <section className="py-60 bg-gradient-to-br from-gray-50 to-gray-100 my-5">
        <div className="container">
          <div className="text-center mb-8">
            <h4 className="display-6 fw-bold mb-4 text-dark" data-aos="fade-up">
              Technology Innovations
            </h4>
            <p className="lead text-muted mb-0">
              Our strong R&D capabilities help partners develop competitive advantages
            </p>
          </div>
          <div className="position-relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
              }}
              className="pb-5"
            >
              {innovations.map((innovation, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="card border-0 shadow-sm h-100 hover-lift"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    <img
                      src={innovation.image}
                      alt={innovation.title}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center p-4">
                      <p className="fw-semibold text-dark mb-0 fs-6">{innovation.title}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev swiper-button-prev-custom"></div>
            <div className="swiper-button-next swiper-button-next-custom"></div>
          </div>
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="py-60 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white ">
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-6" data-aos="fade-up">
            Ready to Partner with Nexyos?
          </h2>
          <p className="lead mb-6 opacity-90" data-aos="fade-up" data-aos-delay="100">
            Join our network of successful partners and distributors worldwide. 
            Let's grow together and transform the future of sensing technology.
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap pt-10">
            <button className="btn btn-lg px-10 py-10 fw-bold text-white border-0 shadow-xl hover-lift " 
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      transition: 'all 0.3s ease',
                      fontSize: '1.1rem'
                    }}
                    data-aos="fade-up" 
                    data-aos-delay="200">
              <i className="fas fa-handshake me-3"></i>
              Become a Partner
            </button>
            <button className="btn btn-lg px-10 py-10 fw-bold text-white border-2 shadow-xl hover-lift " 
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      fontSize: '1.1rem'
                    }}
                    data-aos="fade-up" 
                    data-aos-delay="300">
              <i className="fas fa-arrow-right me-3"></i>
              Learn More
            </button>
          </div>
        </div>
      </section>
<AnimatedCards/>
      <Contact />
    </>
  );
};

export default Partner;
