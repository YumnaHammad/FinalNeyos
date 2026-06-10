import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerModal from "../../components/Company/BannerModal";
import Contact from "../../components/Contact";
import "../../style/About.css";

const Company = () => {
  const [currentImage, setCurrentImage] = useState("default");

  // Images data for Why Nexyos section
  const images = {
    default:
      "https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703",
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

  // Company strengths data
  const companyStrengths = [
    {
      title: "Innovation Leadership",
      description: "Pioneering cutting-edge sensing technologies that transform industries worldwide",
      icon: "🚀"
    },
    {
      title: "Global Presence",
      description: "Serving millions of people across diverse markets and applications",
      icon: "🌍"
    },
    {
      title: "R&D Excellence",
      description: "Strong research and development capabilities driving continuous innovation",
      icon: "🔬"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and certification processes ensuring reliable performance",
      icon: "✅"
    },
    {
      title: "Customer Focus",
      description: "Dedicated support and solutions tailored to specific industry needs",
      icon: "👥"
    },
    {
      title: "Sustainability",
      description: "Commitment to environmental responsibility and energy efficiency",
      icon: "🌱"
    }
  ];

  // Company achievements data
  const achievements = [
    {
      number: "15+",
      label: "Years Experience",
      description: "Decades of innovation in sensing technology"
    },
    {
      number: "50+",
      label: "Countries Served",
      description: "Global presence across continents"
    },
    {
      number: "1M+",
      label: "Devices Deployed",
      description: "Trusted by millions worldwide"
    },
    {
      number: "100+",
      label: "Patents Filed",
      description: "Leading intellectual property portfolio"
    }
  ];

  // Technology areas data
  const technologyAreas = [
    {
      title: "IoT Solutions",
      description: "Comprehensive Internet of Things ecosystem",
      icon: "🔌"
    },
    {
      title: "AI & Machine Learning",
      description: "Advanced artificial intelligence capabilities",
      icon: "🤖"
    },
    {
      title: "Edge Computing",
      description: "Real-time processing at the edge",
      icon: "⚡"
    },
    {
      title: "Cloud Integration",
      description: "Seamless cloud-based solutions",
      icon: "☁️"
    },
    {
      title: "Security & Privacy",
      description: "Enterprise-grade security protocols",
      icon: "🔒"
    },
    {
      title: "Analytics Platform",
      description: "Powerful data analytics tools",
      icon: "📊"
    }
  ];

  const handleHeadingClick = (imageKey) => {
    setCurrentImage(imageKey);
  };

  return (
    <>
      {/* Section 1: Hero Banner */}
      <BannerModal 
        title="About Nexyos Company"
        description="Discover our company's vision, mission, and commitment to making sensing matter through innovative technology."
      />

      {/* Section 2: Company Overview */}
      <section className="py-60 bg-gray-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="pe-lg-5">
                <h3 className="display-7 fw-bold mb-4" data-aos="fade-right">
                  Who We Are
                </h3>
                <p className="lead mb-4">
                  Nexyos is a leading provider of advanced sensing and IoT solutions, 
                  committed to making sensing matter through innovative technology that 
                  connects, processes, and transforms the world around us.
                </p>
                <p className="mb-4">
                  Our mission is to deliver cutting-edge sensing products that serve 
                  millions of people worldwide, enabling smarter cities, safer 
                  environments, and more efficient industries.
                </p>
                <p className="mb-4">
                  Founded with a vision to revolutionize how we interact with our 
                  environment, Nexyos has grown into a trusted partner for businesses 
                  and governments seeking innovative sensing solutions.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://www.milesight.com/static/pc/en/company/about-us/milesight-innovation.jpg?t=1746582955703"
                alt="Nexyos Innovation"
                className="img-fluid rounded-3 shadow-lg"
                data-aos="fade-left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Company Achievements */}
      <section className="py-60 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="display-7 fw-bold mb-3" data-aos="fade-up">
              Our Achievements
            </h3>
            <p className="lead text-muted">
              Milestones that define our journey of innovation
            </p>
          </div>
          <div className="row g-4">
            {achievements.map((achievement, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div 
                  className="card border-0 shadow-sm h-100 text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="card-body p-4">
                    <h2 className="display-6 fw-bold text-primary mb-2">{achievement.number}</h2>
                    <h6 className="fw-bold mb-2">{achievement.label}</h6>
                    <p className="text-muted mb-0">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Company Strengths */}
      <section className="py-60 bg-gray-50">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="display-7 fw-bold mb-3" data-aos="fade-up">
              Our Core Strengths
            </h3>
            <p className="lead text-muted text-start">
              What makes Nexyos a leader in sensing technology
            </p>
          </div>
          <div className="row g-4">
            {companyStrengths.map((strength, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div 
                  className="card h-100 border-0 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="card-body text-center p-4">
                    <div className="display-4 mb-3">{strength.icon}</div>
                    <h5 className="card-title fw-bold mb-3">{strength.title}</h5>
                    <p className="card-text text-muted">{strength.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose Nexyos */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 my-5">
        <div className="container">
          <div className="mb-8">
            <h2 className="display-4 fw-bold mb-4 text-dark text-start" data-aos="fade-up">
              Why Choose Nexyos?
            </h2>
            <p className="lead text-muted mb-0 text-start">
              Discover the key advantages that set us apart in the industry
            </p>
          </div>
          
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="pe-lg-4">
                <div className="mb-4">
                  <div 
                    className="d-flex align-items-start p-4 rounded-4 cursor-pointer hover-lift shadow-sm"
                    onClick={() => handleHeadingClick("sensing")}
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease',
                      backgroundColor: currentImage === "sensing" ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.95)',
                      border: currentImage === "sensing" ? '2px solid #3b82f6' : '1px solid rgba(226, 232, 240, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                    data-aos="fade-right"
                  >
                    <div className="me-3 flex-shrink-0">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-circle d-flex align-items-center justify-content-center shadow-md" style={{width: '48px', height: '48px'}}>
                        <i className="fas fa-globe fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-2 text-dark fs-6">
                        Global Sensing Solutions
                      </h5>
                      <p className="text-muted mb-0 small lh-base text-start">
                        Advanced sensing products for millions worldwide
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div 
                    className="d-flex align-items-start p-4 rounded-4 cursor-pointer hover-lift shadow-sm"
                    onClick={() => handleHeadingClick("exhibitions")}
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease',
                      backgroundColor: currentImage === "exhibitions" ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.95)',
                      border: currentImage === "exhibitions" ? '2px solid #3b82f6' : '1px solid rgba(226, 232, 240, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <div className="me-3 flex-shrink-0">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-circle d-flex align-items-center justify-content-center shadow-md" style={{width: '48px', height: '48px'}}>
                        <i className="fas fa-calendar-alt fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-2 text-dark fs-6">
                        Industry Leadership
                      </h5>
                      <p className="text-muted mb-0 small lh-base text-start">
                        Active participant in influential exhibitions and events
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-0">
                  <div 
                    className="d-flex align-items-start p-4 rounded-4 cursor-pointer hover-lift shadow-sm"
                    onClick={() => handleHeadingClick("industries")}
                    style={{ 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease',
                      backgroundColor: currentImage === "industries" ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.95)',
                      border: currentImage === "industries" ? '2px solid #3b82f6' : '1px solid rgba(226, 232, 240, 0.8)',
                      backdropFilter: 'blur(10px)'
                    }}
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="me-3 flex-shrink-0">
                      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-circle d-flex align-items-center justify-content-center shadow-md" style={{width: '48px', height: '48px'}}>
                        <i className="fas fa-industry fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-2 text-dark fs-6">
                        Industry Presence
                      </h5>
                      <p className="text-muted mb-0 small lh-base text-start">
                        Prominent presence across multiple industries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-7">
              <div className="ps-lg-4">
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-4 shadow-xl" style={{transform: 'rotate(-2deg)', zIndex: 1}}></div>
                  <div className="position-relative" style={{zIndex: 2}}>
                    <img
                      src={images[currentImage]}
                      alt="Nexyos content"
                      className="img-fluid rounded-4 shadow-2xl"
                      data-aos="fade-left"
                      style={{transform: 'rotate(1deg)'}}
                    />
                  </div>
                  <div className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-xl" 
                       style={{width: '80px', height: '80px', transform: 'translate(20px, -20px)', zIndex: 3}}>
                    <i className="fas fa-star text-warning fa-2x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Technology Areas */}
      <section className="py-60 bg-gray-50">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="display-7 fw-bold mb-3" data-aos="fade-up">
              Technology Areas
            </h3>
            <p className="lead text-muted">
              Comprehensive solutions across multiple technology domains
            </p>
          </div>
          <div className="row g-4">
            {technologyAreas.map((area, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div 
                  className="card h-100 border-0 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="card-body text-center p-4">
                    <div className="display-4 mb-3">{area.icon}</div>
                    <h5 className="card-title fw-bold mb-3">{area.title}</h5>
                    <p className="card-text text-muted">{area.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="py-60 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white my-5">
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-6" data-aos="fade-up">
            Ready to Experience Nexyos?
          </h2>
          <p className="lead mb-6 opacity-90" data-aos="fade-up" data-aos-delay="100">
            Discover how our innovative sensing solutions can transform your business 
            and help you stay ahead in the digital age.
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
              <i className="fas fa-rocket me-3"></i>
              Get Started
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

      <Contact />
    </>
  );
};

export default Company;
