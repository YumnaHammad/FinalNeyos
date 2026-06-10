import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../../components/Products";
import Tab from "../../components/Solution/TrafficTab/Tab";
import miniCAmeraGroup from "../../assets/images/nexyos/miniCAmeraGroup.png";
import { ChevronRight, ChevronLeft, Star, Shield, Zap, Users, Globe, Award, CheckCircle } from "lucide-react";
import BannerSection from "../../components/BannerSection";


const ProductsEnhanced = () => {
  const [products, setProducts] = useState([]);
  const [filterAttributes, setFilterAttributes] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [compareItems, setCompareItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSections, setOpenSections] = useState({});

  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch products
    fetch("https://portal.nexyos.com/api/all_products/4/5/4")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.error("Product API fetch error:", err);
        setProducts([]);
      });

    // Fetch filters
    fetch("https://portal.nexyos.com/api/search_list/4/5/4")
      .then((res) => res.json())
      .then((data) => {
        setFilterAttributes(data);
      })
      .catch((error) => console.error("Filter API fetch error:", error));

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth >= 768) setShowMobileFilter(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCompareChange = (id) => {
    setCompareItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Featured categories data
  const featuredCategories = [
    {
      title: "Security Cameras",
      description: "Advanced surveillance solutions for every environment",
      icon: Shield,
      count: "50+ Models",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Smart Sensors",
      description: "IoT-enabled sensors for intelligent monitoring",
      icon: Zap,
      count: "30+ Models",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Access Control",
      description: "Secure entry management systems",
      icon: Users,
      count: "25+ Models",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Network Solutions",
      description: "High-performance networking equipment",
      icon: Globe,
      count: "40+ Models",
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Key features data
  const keyFeatures = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Military-grade encryption and authentication protocols"
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Lightning-fast processing and real-time analytics"
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interfaces designed for all skill levels"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "24/7 technical support worldwide"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Security Manager",
      company: "TechCorp Industries",
      content: "The quality and reliability of these products have transformed our security infrastructure. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      company: "Global Solutions Ltd",
      content: "Outstanding performance and excellent customer support. These products exceed our expectations.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      company: "SecureNet Systems",
      content: "The advanced features and ease of use make these products our top choice for all security needs.",
      rating: 5
    }
  ];

  return (
    <>
      {/* Hero Banner */}
        <BannerSection
          gradient="none"
          content="justify-content-center"
          textAlign="text-center"
          textColor="text-white"
          title="Our Products"
          subtitle="Discover our comprehensive range of cutting-edge security and surveillance solutions designed for modern challenges."
          image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
        />
      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-600">50+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              Featured Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular product categories, each designed to meet specific security and surveillance needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-center text-sm mb-3">{category.description}</p>
                  <div className="text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      {category.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Solution Tab */}
      <div className="container mx-auto py-16">
        <Tab />
        
        <div className="text-center mb-16">
          <h5 className="text-xl font-semibold mb-4">For Better Road Safety & Efficient Traffic Management</h5>
          <div className="max-w-4xl mx-auto text-justify">
            <p className="text-gray-600 leading-relaxed">
              With the growth of urban and rural populations, as well as the increasing number of vehicles on the roads, 
              traffic congestion, accidents, and parking issues are constantly on the rise, presenting new challenges to 
              traffic management agencies. Milesight is delighted to introduce our Intelligent Traffic Solution. We integrate 
              powerful, high-quality cameras with back-end software, elevating intelligent traffic management to a new level 
              with exceptional imagery and advanced AI-powered ANPR technology, ensuring road traffic safety and efficient 
              traffic management.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              Why Choose Our Products?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our products are built with cutting-edge technology and designed for reliability, performance, and ease of use
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Categories Overview */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
            Product Categories
          </h2>
          <Products />
        </div>
      </div>

      {/* Detailed Products Section */}
      <div className="container mx-auto py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold" data-aos="fade-right">All Products</h2>
          <button
            className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowMobileFilter((prev) => !prev)}
          >
            {showMobileFilter ? "✖ Close Filters" : "☰ Filter"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
                placeholder="Search for Product Models"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filterAttributes.map((attributeBlock) => (
                <div key={attributeBlock.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(attributeBlock.attribute)}
                    className="w-full text-left p-3 bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="font-medium">{attributeBlock.attribute}</span>
                    <span>{openSections[attributeBlock.attribute] ? "−" : "+"}</span>
                  </button>
                  {openSections[attributeBlock.attribute] && (
                    <div className="mt-2 space-y-2">
                      {attributeBlock.items.map((item) => (
                        <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{item.item.trim()}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your search.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title || "Product"}
                          onError={(e) => (e.target.src = miniCAmeraGroup)}
                          className="w-full h-48 object-cover"
                        />
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          NEW
                        </span>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{product.model}</p>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={compareItems.includes(product.id)}
                              onChange={() => handleCompareChange(product.id)}
                              className="rounded"
                            />
                            <span className="text-sm text-gray-600">Compare</span>
                          </label>
                          
                          <Link 
                            to={`/products/${product.id}`} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from satisfied customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay={index * 200}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Certifications */}
      <div className="bg-white py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              Awards & Certifications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality and innovation has been recognized by industry leaders
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "ISO 9001", desc: "Quality Management" },
              { name: "ISO 27001", desc: "Information Security" },
              { name: "CE Mark", desc: "European Compliance" },
              { name: "FCC Certified", desc: "US Standards" }
            ].map((cert, index) => (
              <div key={index} className="text-center group" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Items Floating Button */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-3 rounded-full shadow-lg cursor-pointer hover:bg-red-600 transition-colors z-50">
          Compare ({compareItems.length})
        </div>
      )}

      {/* Enhanced Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Our product specialists are here to help you find the perfect solution for your needs. 
            Get expert advice, technical support, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-lg"
            >
              Contact Sales Team
            </Link>
            <Link
              to="/demo"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Request Live Demo
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsEnhanced;
