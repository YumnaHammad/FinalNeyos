import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Products from "../components/Products";
import Tab from "../components/Solution/TrafficTab/Tab";
import miniCAmeraGroup from "../assets/images/nexyos/miniCAmeraGroup.png";
import { ChevronRight, ChevronLeft, Star, Shield, Zap, Users, Globe, Award, CheckCircle } from "lucide-react";


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filterAttributes, setFilterAttributes] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [compareItems, setCompareItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSections, setOpenSections] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Animation effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // CSS animations
  const animations = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInLeft {
      from { 
        opacity: 0; 
        transform: translateX(-50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInRight {
      from { 
        opacity: 0; 
        transform: translateX(50px); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0); 
      }
    }
    
    @keyframes slideInDown {
      from { 
        opacity: 0; 
        transform: translateY(-30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes slideInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
      40%, 43% { transform: translate3d(0,-30px,0); }
      70% { transform: translate3d(0,-15px,0); }
      90% { transform: translate3d(0,-4px,0); }
    }
    
    @keyframes scaleIn {
      from { 
        opacity: 0; 
        transform: scale(0.8); 
      }
      to { 
        opacity: 1; 
        transform: scale(1); 
      }
    }
    
    @keyframes rotateIn {
      from { 
        opacity: 0; 
        transform: rotate(-180deg) scale(0.3); 
      }
      to { 
        opacity: 1; 
        transform: rotate(0deg) scale(1); 
      }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
  `;

  // In-page CSS styles with improved spacing and professional layout
  const pageStyles = {
    // Hero Banner
    heroBanner: {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0',
      padding: '0'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: 'white',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },

    // Stats Section
    statsSection: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    statsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px',
      textAlign: 'center'
    },
    statItem: {
      padding: '32px 24px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    },
    statNumber: {
      fontSize: '3.5rem',
      fontWeight: '800',
      marginBottom: '12px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: '1'
    },
    statLabel: {
      fontSize: '1.2rem',
      color: '#475569',
      fontWeight: '600',
      letterSpacing: '0.025em'
    },

    // Featured Categories
    featuredCategories: {
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    categoriesContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    categoriesHeader: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    categoriesTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '20px',
      letterSpacing: '-0.025em'
    },
    categoriesSubtitle: {
      fontSize: '1.25rem',
      color: '#475569',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px'
    },
    categoryCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px 32px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    categoryIcon: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 32px',
      transition: 'all 0.4s ease',
      position: 'relative'
    },
    categoryTitle: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '16px',
      lineHeight: '1.3'
    },
    categoryDescription: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.7',
      marginBottom: '24px'
    },
    categoryBadge: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      color: '#1e40af',
      padding: '10px 20px',
      borderRadius: '25px',
      fontSize: '0.9rem',
      fontWeight: '600',
      display: 'inline-block',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
    },

    // Traffic Solution Section
    trafficSection: {
      background: 'white',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    trafficContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    trafficHeader: {
      textAlign: 'center',
      marginBottom: '80px'
    },
    trafficTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '24px',
      letterSpacing: '-0.025em'
    },
    trafficDescription: {
      fontSize: '1.125rem',
      color: '#475569',
      maxWidth: '900px',
      margin: '0 auto',
      lineHeight: '1.8',
      textAlign: 'justify'
    },

    // Key Features Section
    featuresSection: {
      background: 'white',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    featuresHeader: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    featuresTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '20px',
      letterSpacing: '-0.025em'
    },
    featuresSubtitle: {
      fontSize: '1.25rem',
      color: '#475569',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px'
    },
    featureItem: {
      textAlign: 'center',
      padding: '32px 24px',
      transition: 'all 0.4s ease',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    featureIconContainer: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 32px',
      transition: 'all 0.4s ease',
      boxShadow: '0 12px 35px rgba(59, 130, 246, 0.25)',
      position: 'relative'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '16px',
      lineHeight: '1.3'
    },
    featureDescription: {
      fontSize: '1rem',
      color: '#475569',
      lineHeight: '1.7'
    },

    // Product Categories Overview
    categoriesOverview: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    categoriesOverviewContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    categoriesOverviewTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '64px',
      textAlign: 'center',
      letterSpacing: '-0.025em'
    },

    // Detailed Products Section
    productsSection: {
      background: 'white',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    productsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    productsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '48px',
      flexWrap: 'wrap',
      gap: '20px'
    },
    productsTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      margin: '0',
      letterSpacing: '-0.025em'
    },
    mobileFilterBtn: {
      background: '#2563eb',
      color: 'white',
      padding: '16px 28px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
    },
    productsLayout: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px'
    },
    filtersSidebar: {
      background: 'white',
      padding: '32px',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '32px'
    },
    searchInput: {
      width: '100%',
      padding: '18px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '16px',
      marginBottom: '32px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: '#f8fafc'
    },
    filterSection: {
      marginBottom: '24px'
    },
    filterToggle: {
      width: '100%',
      textAlign: 'left',
      padding: '18px 20px',
      background: '#f8fafc',
      borderRadius: '16px',
      border: '2px solid #e5e7eb',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    filterItems: {
      marginTop: '16px',
      paddingLeft: '20px'
    },
    filterItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      padding: '10px 0',
      fontSize: '1rem',
      color: '#475569'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '32px'
    },
    productCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid #e5e7eb',
      position: 'relative'
    },
    productImageContainer: {
      position: 'relative',
      height: '220px',
      overflow: 'hidden'
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.4s ease'
    },
    productBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: '#ef4444',
      color: 'white',
      fontSize: '0.8rem',
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    },
    productContent: {
      padding: '28px'
    },
    productTitle: {
      fontWeight: '700',
      fontSize: '1.25rem',
      color: '#0f172a',
      marginBottom: '12px',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    productModel: {
      color: '#475569',
      fontSize: '1rem',
      marginBottom: '24px'
    },
    productActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px'
    },
    compareCheckbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer'
    },
    compareLabel: {
      fontSize: '1rem',
      color: '#475569',
      fontWeight: '500'
    },
    exploreBtn: {
      background: '#2563eb',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      marginTop: '60px',
      flexWrap: 'wrap'
    },
    paginationBtn: {
      padding: '16px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      fontWeight: '600',
      minWidth: '48px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
    },

    // Testimonials Section
    testimonialsSection: {
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    testimonialsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    testimonialsHeader: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    testimonialsTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '20px',
      letterSpacing: '-0.025em'
    },
    testimonialsSubtitle: {
      fontSize: '1.25rem',
      color: '#475569',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '40px'
    },
    testimonialCard: {
      background: 'white',
      borderRadius: '24px',
      padding: '40px 32px',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    },
    testimonialRating: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '24px',
      gap: '6px'
    },
    testimonialContent: {
      fontStyle: 'italic',
      color: '#334155',
      marginBottom: '24px',
      lineHeight: '1.7',
      fontSize: '1.125rem'
    },
    testimonialAuthor: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '24px'
    },
    authorName: {
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '6px',
      fontSize: '1.125rem'
    },
    authorRole: {
      fontSize: '1rem',
      color: '#475569',
      fontWeight: '500'
    },

    // Awards Section
    awardsSection: {
      background: 'white',
      padding: '100px 0',
      margin: '0',
      position: 'relative'
    },
    awardsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px'
    },
    awardsHeader: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    awardsTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#0f172a',
      marginBottom: '20px',
      letterSpacing: '-0.025em'
    },
    awardsSubtitle: {
      fontSize: '1.25rem',
      color: '#475569',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.7'
    },
    awardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px'
    },
    awardItem: {
      textAlign: 'center',
      padding: '32px 24px',
      transition: 'all 0.4s ease',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    awardIconContainer: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      transition: 'all 0.4s ease',
      boxShadow: '0 12px 35px rgba(16, 185, 129, 0.25)',
      position: 'relative'
    },
    awardName: {
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '10px',
      fontSize: '1.25rem'
    },
    awardDescription: {
      fontSize: '1rem',
      color: '#475569',
      fontWeight: '500'
    },

    // Call to Action Section
    ctaSection: {
      background: 'linear-gradient(135deg, #2563eb 0%, #3730a3 100%)',
      padding: '120px 0',
      margin: '0',
      position: 'relative',
      overflow: 'hidden'
    },
    ctaContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },
    ctaTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      marginBottom: '32px',
      color: 'white',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      letterSpacing: '-0.025em'
    },
    ctaDescription: {
      fontSize: '1.375rem',
      marginBottom: '48px',
      lineHeight: '1.7',
      color: 'rgba(255, 255, 255, 0.95)',
      maxWidth: '900px',
      margin: '0 auto 48px'
    },
    ctaButtons: {
      display: 'flex',
      gap: '32px',
      justifyContent: 'center',
      marginBottom: '48px',
      flexWrap: 'wrap'
    },
    ctaPrimaryBtn: {
      background: 'white',
      color: '#2563eb',
      padding: '20px 48px',
      borderRadius: '16px',
      fontWeight: '700',
      fontSize: '1.25rem',
      transition: 'all 0.4s ease',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    ctaSecondaryBtn: {
      background: 'transparent',
      color: 'white',
      padding: '20px 48px',
      borderRadius: '16px',
      fontWeight: '700',
      fontSize: '1.25rem',
      transition: 'all 0.4s ease',
      border: '2px solid white',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    },
    ctaFeatures: {
      display: 'flex',
      justifyContent: 'center',
      gap: '56px',
      flexWrap: 'wrap',
      marginTop: '48px'
    },
    ctaFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      fontSize: '1.125rem',
      color: 'rgba(255, 255, 255, 0.95)',
      fontWeight: '500'
    },

    // Compare Floating Button
    compareFloatingBtn: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: '#ef4444',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '50px',
      boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 1000,
      fontWeight: '600',
      fontSize: '1rem'
    },

    // Loading and Empty States
    loadingContainer: {
      textAlign: 'center',
      padding: '60px 20px'
    },
    loadingSpinner: {
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #2563eb',
      borderRadius: '50%',
      width: '48px',
      height: '48px',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px'
    },
    emptyStateText: {
      fontSize: '1.1rem',
      color: '#64748b',
      margin: '0'
    }
  };

  return (
    <>
      <style>{animations}</style>
      {/* Hero Banner */}
      <Banner
        title="Our Products"
        description="Discover our comprehensive range of cutting-edge security and surveillance solutions designed for modern challenges."
        backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
        customClass="min-h-[60vh]"
        containerClass="top-1/2 transform -translate-y-1/2"
        contentClass="text-center"
        h2Class="text-5xl font-bold mb-6"
        pClass="text-xl max-w-3xl mx-auto"
      />

      {/* Stats Section */}
      <div style={pageStyles.statsSection}>
        <div style={pageStyles.statsContainer}>
          <div style={pageStyles.statsGrid}>
            <div style={pageStyles.statItem}>
              <div style={pageStyles.statNumber}>500+</div>
              <div style={pageStyles.statLabel}>Products</div>
            </div>
            <div style={pageStyles.statItem}>
              <div style={pageStyles.statNumber}>50+</div>
              <div style={pageStyles.statLabel}>Categories</div>
            </div>
            <div style={pageStyles.statItem}>
              <div style={pageStyles.statNumber}>1000+</div>
              <div style={pageStyles.statLabel}>Happy Clients</div>
            </div>
            <div style={pageStyles.statItem}>
              <div style={pageStyles.statNumber}>24/7</div>
              <div style={pageStyles.statLabel}>Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div style={pageStyles.featuredCategories}>
        <div style={pageStyles.categoriesContainer}>
          <div style={pageStyles.categoriesHeader}>
            <h2 style={pageStyles.categoriesTitle}>Featured Product Categories</h2>
            <p style={pageStyles.categoriesSubtitle}>
              Explore our most popular product categories, each designed to meet specific security and surveillance needs
            </p>
          </div>
          
          <div style={pageStyles.categoriesGrid}>
            {featuredCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index} 
                  style={pageStyles.categoryCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{
                    ...pageStyles.categoryIcon,
                    background: `linear-gradient(135deg, ${category.color.split(' ')[1]} 0%, ${category.color.split(' ')[3]} 100%)`
                  }}>
                    <IconComponent style={{ width: '32px', height: '32px', color: 'white' }} />
                  </div>
                  <h3 style={pageStyles.categoryTitle}>{category.title}</h3>
                  <p style={pageStyles.categoryDescription}>{category.description}</p>
                  <div>
                    <span style={pageStyles.categoryBadge}>
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
      <div style={pageStyles.trafficSection}>
        <div style={pageStyles.trafficContainer}>
        <Tab />
        
          <div style={pageStyles.trafficHeader}>
            <h5 style={pageStyles.trafficTitle}>
              For Better Road Safety & Efficient Traffic Management
            </h5>
            <div>
              <p style={pageStyles.trafficDescription}>
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
      </div>

      {/* Key Features Section */}
      <div style={pageStyles.featuresSection}>
        <div style={pageStyles.featuresContainer}>
          <div style={pageStyles.featuresHeader}>
            <h2 style={pageStyles.featuresTitle}>Why Choose Our Products?</h2>
            <p style={pageStyles.featuresSubtitle}>
              Our products are built with cutting-edge technology and designed for reliability, performance, and ease of use
            </p>
          </div>
          
          <div style={pageStyles.featuresGrid}>
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  style={pageStyles.featureItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('div').style.transform = 'scale(1.1)';
                    e.currentTarget.querySelector('div').style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('div').style.transform = 'scale(1)';
                    e.currentTarget.querySelector('div').style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.2)';
                  }}
                >
                  <div style={pageStyles.featureIconContainer}>
                    <IconComponent style={{ width: '40px', height: '40px', color: 'white' }} />
                  </div>
                  <h3 style={pageStyles.featureTitle}>{feature.title}</h3>
                  <p style={pageStyles.featureDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Categories Overview */}
      <div style={pageStyles.categoriesOverview}>
        <div style={pageStyles.categoriesOverviewContainer}>
          <h2 style={pageStyles.categoriesOverviewTitle}>Product Categories</h2>
          <Products />
        </div>
      </div>

      {/* Detailed Products Section */}
      <div style={pageStyles.productsSection}>
        <div style={pageStyles.productsContainer}>
          <div style={pageStyles.productsHeader}>
            <h2 style={pageStyles.productsTitle}>All Products</h2>
          <button
              style={pageStyles.mobileFilterBtn}
            onClick={() => setShowMobileFilter((prev) => !prev)}
          >
            {showMobileFilter ? "✖ Close Filters" : "☰ Filter"}
          </button>
        </div>

          <div style={pageStyles.productsLayout}>
          {/* Filters Sidebar */}
            <div style={{ display: showMobileFilter ? 'block' : 'none' }}>
              <div style={pageStyles.filtersSidebar}>
              <input
                type="text"
                  style={pageStyles.searchInput}
                placeholder="Search for Product Models"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filterAttributes.map((attributeBlock) => (
                  <div key={attributeBlock.id} style={pageStyles.filterSection}>
                  <button
                    onClick={() => toggleSection(attributeBlock.attribute)}
                      style={pageStyles.filterToggle}
                  >
                      <span style={{ fontWeight: '500' }}>{attributeBlock.attribute}</span>
                    <span>{openSections[attributeBlock.attribute] ? "−" : "+"}</span>
                  </button>
                  {openSections[attributeBlock.attribute] && (
                      <div style={pageStyles.filterItems}>
                      {attributeBlock.items.map((item) => (
                          <label key={item.id} style={pageStyles.filterItem}>
                            <input type="checkbox" style={{ marginRight: '8px' }} />
                            <span>{item.item.trim()}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
            <div>
            {products.length === 0 ? (
                <div style={pageStyles.loadingContainer}>
                  <div style={pageStyles.loadingSpinner}></div>
                  <p style={pageStyles.emptyStateText}>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
                <div style={pageStyles.emptyState}>
                  <p style={pageStyles.emptyStateText}>No products found matching your search.</p>
              </div>
            ) : (
              <>
                  <div style={pageStyles.productsGrid}>
                    {displayedProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        style={pageStyles.productCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        }}
                      >
                        <div style={pageStyles.productImageContainer}>
                        <img
                          src={product.image}
                          alt={product.title || "Product"}
                          onError={(e) => (e.target.src = miniCAmeraGroup)}
                            style={pageStyles.productImage}
                        />
                          <span style={pageStyles.productBadge}>NEW</span>
                      </div>
                      
                        <div style={pageStyles.productContent}>
                          <h3 style={pageStyles.productTitle}>
                          {product.title}
                        </h3>
                          <p style={pageStyles.productModel}>{product.model}</p>
                        
                          <div style={pageStyles.productActions}>
                            <label style={pageStyles.compareCheckbox}>
                            <input
                              type="checkbox"
                              checked={compareItems.includes(product.id)}
                              onChange={() => handleCompareChange(product.id)}
                                style={{ marginRight: '8px' }}
                            />
                              <span style={pageStyles.compareLabel}>Compare</span>
                          </label>
                          
                          <Link 
                            to={`/products/${product.id}`} 
                              style={pageStyles.exploreBtn}
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
                    <div style={pageStyles.pagination}>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                        style={{
                          ...pageStyles.paginationBtn,
                          opacity: currentPage === 1 ? 0.5 : 1,
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <ChevronLeft style={{ width: '16px', height: '16px' }} />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                          style={{
                            ...pageStyles.paginationBtn,
                            background: currentPage === i + 1 ? '#2563eb' : 'white',
                            color: currentPage === i + 1 ? 'white' : '#1e293b',
                            borderColor: currentPage === i + 1 ? '#2563eb' : '#e5e7eb'
                          }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                        style={{
                          ...pageStyles.paginationBtn,
                          opacity: currentPage === totalPages ? 0.5 : 1,
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                      >
                        <ChevronRight style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={pageStyles.testimonialsSection}>
        <div style={pageStyles.testimonialsContainer}>
          <div style={pageStyles.testimonialsHeader}>
            <h2 style={pageStyles.testimonialsTitle}>What Our Clients Say</h2>
            <p style={pageStyles.testimonialsSubtitle}>
              Don't just take our word for it - hear from satisfied customers worldwide
            </p>
          </div>
          
          <div style={pageStyles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                style={pageStyles.testimonialCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={pageStyles.testimonialRating}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} style={{ width: '20px', height: '20px', color: '#fbbf24', fill: 'currentColor' }} />
                  ))}
                </div>
                <p style={pageStyles.testimonialContent}>"{testimonial.content}"</p>
                <div style={pageStyles.testimonialAuthor}>
                  <div style={pageStyles.authorName}>{testimonial.name}</div>
                  <div style={pageStyles.authorRole}>{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Certifications */}
      <div style={pageStyles.awardsSection}>
        <div style={pageStyles.awardsContainer}>
          <div style={pageStyles.awardsHeader}>
            <h2 style={pageStyles.awardsTitle}>Awards & Certifications</h2>
            <p style={pageStyles.awardsSubtitle}>
              Our commitment to quality and innovation has been recognized by industry leaders
            </p>
          </div>
          
          <div style={pageStyles.awardsGrid}>
            {[
              { name: "ISO 9001", desc: "Quality Management" },
              { name: "ISO 27001", desc: "Information Security" },
              { name: "CE Mark", desc: "European Compliance" },
              { name: "FCC Certified", desc: "US Standards" }
            ].map((cert, index) => (
              <div 
                key={index} 
                style={pageStyles.awardItem}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('div').style.transform = 'scale(1.1)';
                  e.currentTarget.querySelector('div').style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('div').style.transform = 'scale(1)';
                  e.currentTarget.querySelector('div').style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)';
                }}
              >
                <div style={pageStyles.awardIconContainer}>
                  <Award style={{ width: '40px', height: '40px', color: 'white' }} />
                </div>
                <h3 style={pageStyles.awardName}>{cert.name}</h3>
                <p style={pageStyles.awardDescription}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Items Floating Button */}
      {compareItems.length > 0 && (
        <div 
          style={pageStyles.compareFloatingBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.3)';
          }}
        >
          Compare ({compareItems.length})
        </div>
      )}

      {/* Call to Action */}
      <div style={pageStyles.ctaSection}>
        <div style={pageStyles.ctaContainer}>
          <h2 style={pageStyles.ctaTitle}>Ready to Get Started?</h2>
          <p style={pageStyles.ctaDescription}>
            Our product specialists are here to help you find the perfect solution for your needs. 
            Get expert advice, technical support, and personalized recommendations.
          </p>
          <div style={pageStyles.ctaButtons}>
            <Link
              to="/contact"
              style={pageStyles.ctaPrimaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Contact Sales Team
            </Link>
            <Link
              to="/demo"
              style={pageStyles.ctaSecondaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Request Live Demo
            </Link>
          </div>
          <div style={pageStyles.ctaFeatures}>
            <div style={pageStyles.ctaFeature}>
              <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
              <span>Free Consultation</span>
            </div>
            <div style={pageStyles.ctaFeature}>
              <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
              <span>24/7 Support</span>
            </div>
            <div style={pageStyles.ctaFeature}>
              <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
              <span>Warranty Included</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
