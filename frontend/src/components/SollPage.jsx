import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPhoneCall } from "react-icons/fi";
import { PiEnvelopeFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { HiClock } from "react-icons/hi2";
import './SollPage.css';
import Contact from './Contact';

const SollPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    postalCode: '',
    helpWith: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Contact form state and handlers
  const captchaStyle = {
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  };
  const [errors, setErrors] = React.useState({});
  const [contactFormData, setContactFormData] = React.useState({
    email: "",
    company: "",
    product: "",
    country: "",
    website: "",
    message: "",
    phone: "",
    business_type: "",
    verification_code: "",
  });

  const validateForm = () => {
    const error = {};
    if (!contactFormData.email) {
      error.email = "Email is required";
    }
    if (!contactFormData.company) {
      error.company = "Company is required";
    }
    if (!contactFormData.product) {
      error.product = "Product is required";
    }
    if (!contactFormData.country) {
      error.country = "Country is required";
    }
    if (!contactFormData.website) {
      error.website = "Website is required";
    }
    if (!contactFormData.message) {
      error.message = "Message is required";
    }
    if (!contactFormData.phone) {
      error.phone = "Phone is required";
    }
    if (!contactFormData.business_type) {
      error.business_type = "Business Type is required";
    }
    if (!contactFormData.verification_code) {
      error.verification_code = "Verification Code is required";
    }
    return error;
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors", errors);
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactFormData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error submitting form", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        return;
      }

      const result = await response.json();
      toast.success(result.message);
      setContactFormData({
        email: "",
        company: "",
        product: "",
        country: "",
        website: "",
        message: "",
        phone: "",
        business_type: "",
        verification_code: "",
      });

    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error("Unexpected error while submitting the form", error);
    }
  };

  return (
    <div className="min-h-screen bg-white soll-page">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 soll-breadcrumbs">
        <div className="soll-container">
          <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li className="text-gray-400">/</li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Products</a></li>
              <li className="text-gray-400">/</li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sensors</a></li>
              <li className="text-gray-400">/</li>
              <li className="text-blue-600 font-medium">HALO Smart Sensor</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="soll-hero-section">
        <div className="soll-container">
          <div className="soll-hero-content">
            <motion.div 
              className="soll-hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>HALO Smart Sensor</h1>
              <p className="hero-description">
                Advanced AI-powered sensor technology for intelligent monitoring and security solutions. 
                Experience next-generation sensing capabilities with privacy-first design.
              </p>
              <div className="soll-features-list">
                <div className="soll-feature-item">AI-powered motion detection</div>
                <div className="soll-feature-item">Privacy-preserving technology</div>
                <div className="soll-feature-item">Real-time cloud connectivity</div>
                <div className="soll-feature-item">Advanced analytics dashboard</div>
                <div className="soll-feature-item">Easy installation & setup</div>
              </div>
              <motion.button 
                className="soll-btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </motion.div>
            <motion.div 
              className="soll-product-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📡</div>
                  <p className="text-lg text-blue-800 font-semibold">HALO Smart Sensor</p>
                  <p className="text-sm text-blue-600">Product Image</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="soll-section">
        <div className="soll-container">
          <div className="soll-section-header">
            <h2>Privacy & Security First</h2>
            <p>Our HALO Smart Sensor prioritizes your privacy while delivering exceptional security performance</p>
          </div>
          <div className="soll-grid-2">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Privacy Protection</h3>
                <p className="text-lg">Advanced algorithms ensure no personal data is captured while maintaining security effectiveness.</p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-base">No facial recognition</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-base">Anonymous motion detection</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-base">Local data processing</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div 
              className="soll-blurred-image"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="overlay-text">
                <h3>Classroom Security</h3>
                <p>Safe monitoring without privacy concerns</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HALO Cloud Section */}
      <section className="soll-section">
        <div className="soll-container">
          <div className="soll-section-header">
            <h2>HALO Cloud Dashboard</h2>
            <p>Comprehensive monitoring and analytics platform for your smart sensor network</p>
          </div>
          <div className="soll-grid-2">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Real-Time Monitoring</h3>
                <p className="text-lg">Get instant insights and alerts from your sensor network with our intuitive dashboard.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Live Status</h4>
                    <p className="text-sm text-blue-700">Real-time sensor status</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Analytics</h4>
                    <p className="text-sm text-green-700">Advanced reporting tools</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="soll-dashboard-mock"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4>Dashboard Preview</h4>
              <div className="dashboard-features">
                <div className="dashboard-feature">
                  <h5>Sensor Status</h5>
                  <p>All sensors operational</p>
                </div>
                <div className="dashboard-feature">
                  <h5>Activity Log</h5>
                  <p>Recent events tracked</p>
                </div>
                <div className="dashboard-feature">
                  <h5>Analytics</h5>
                  <p>Performance metrics</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Cameras Section */}
      <section className="soll-section">
        <div className="soll-container">
          <div className="soll-section-header">
            <h2>Related Cameras</h2>
            <p>Complete your security setup with our compatible camera solutions</p>
          </div>
          <div className="soll-grid-3">
            {[
              { name: "HALO Dome Camera", features: ["4K Resolution", "Night Vision", "AI Detection"] },
              { name: "HALO Bullet Camera", features: ["Weatherproof", "Long Range", "Motion Tracking"] },
              { name: "HALO PTZ Camera", features: ["360° Coverage", "Auto Tracking", "Zoom Control"] },
              { name: "HALO Mini Camera", features: ["Compact Design", "Wireless", "Easy Setup"] },
              { name: "HALO Pro Camera", features: ["Professional Grade", "Advanced Analytics", "Cloud Storage"] },
              { name: "HALO Security Kit", features: ["Complete System", "Multiple Cameras", "Central Hub"] }
            ].map((camera, index) => (
              <motion.div 
                key={camera.name}
                className="soll-product-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4>{camera.name}</h4>
                <div className="card-features">
                  {camera.features.map((feature, idx) => (
                    <div key={idx} className="card-feature">{feature}</div>
                  ))}
                </div>
                <button className="soll-btn-secondary w-full mt-4">Learn More</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Documentation Section */}
      <section className="soll-section">
        <div className="soll-container">
          <div className="soll-section-header">
            <h2>Technical Documentation</h2>
            <p>Access comprehensive guides, specifications, and technical resources</p>
          </div>
          
          <div className="soll-search-bar">
            <div className="search-row">
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="soll-form-input"
              />
              <select className="soll-form-input">
                <option>All Categories</option>
                <option>Installation</option>
                <option>Configuration</option>
                <option>Troubleshooting</option>
              </select>
              <select className="soll-form-input">
                <option>All Types</option>
                <option>PDF</option>
                <option>Video</option>
                <option>Guide</option>
              </select>
              <button className="search-btn">Search</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Installation Guide", type: "PDF", size: "2.4 MB", icon: "📖" },
              { title: "User Manual", type: "PDF", size: "5.1 MB", icon: "📚" },
              { title: "API Documentation", type: "PDF", size: "3.8 MB", icon: "🔧" },
              { title: "Troubleshooting Guide", type: "PDF", size: "1.9 MB", icon: "🛠️" },
              { title: "Video Tutorial", type: "MP4", size: "45.2 MB", icon: "🎥" },
              { title: "Quick Start Guide", type: "PDF", size: "1.2 MB", icon: "⚡" }
            ].map((doc, index) => (
              <motion.div 
                key={doc.title}
                className="soll-doc-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="soll-doc-icon">{doc.icon}</div>
                <h5>{doc.title}</h5>
                <p>{doc.type} • {doc.size}</p>
                <button className="soll-btn-secondary w-full mt-3">Download</button>
              </motion.div>
            ))}
          </div>

          <div className="soll-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next →</button>
          </div>
        </div>
      </section>

      {/* Certified Standards Section */}
      <section className="soll-section">
        <div className="soll-container">
          <div className="soll-section-header">
            <h2>Certified Standards</h2>
            <p>Our products meet the highest industry standards and certifications</p>
          </div>
          <div className="soll-grid-4">
            {[
              { icon: "UL", text: "UL Listed" },
              { icon: "RoHS", text: "RoHS Compliant" },
              { icon: "CA", text: "California Compliant" },
              { icon: "ISO", text: "ISO 9001" }
            ].map((cert, index) => (
              <motion.div 
                key={cert.text}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="soll-cert-icon">
                  <span>{cert.icon}</span>
                </div>
                <div className="soll-cert-text">{cert.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
     <Contact/>

    </div>
  );
};

export default SollPage;
