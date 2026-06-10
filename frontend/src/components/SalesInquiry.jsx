import React, { useState } from 'react';
import '../style/SalesInquiry.css';
import Contact from './Contact';

const SalesInquiry = () => {
  const [formData, setFormData] = useState({
    userType: 'Business',
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: '',
    industry: '',
    jobTitle: '',
    country: '',
    province: '',
    city: '',
    postcode: '',
    subscribe: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.province.trim()) newErrors.province = 'Province/State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      alert('Thank you for your inquiry! We will get back to you soon.');
    }
  };

  const businessTypes = [
    'End User',
    'System Integrator',
    'Distributor',
    'Consultant',
    'Contractor',
    'Other'
  ];

  const industries = [
    'Security & Surveillance',
    'Retail',
    'Healthcare',
    'Education',
    'Transportation',
    'Manufacturing',
    'Government',
    'Other'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'India',
    'China',
    'Other'
  ];

  return (
    <>
    <div className="sales-inquiry-container">
      <div className="sales-inquiry-header">
        <h1>Contact Sales</h1>
        <p>Get in touch with our sales team for product information and pricing</p>
      </div>

      <form onSubmit={handleSubmit} className="sales-inquiry-form">
        {/* User Type Section */}
        <div className="form-section">
          <h2 className="section-title">*User type</h2>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="Business"
                checked={formData.userType === 'Business'}
                onChange={handleInputChange}
              />
              <span className="radio-custom"></span>
              Business
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="userType"
                value="Personal"
                checked={formData.userType === 'Personal'}
                onChange={handleInputChange}
              />
              <span className="radio-custom"></span>
              Personal
            </label>
          </div>
        </div>

        {/* Message Section */}
        <div className="form-section">
          <h2 className="section-title">What can we help you with?</h2>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Please describe your inquiry..."
              maxLength={200}
            />
            <div className="char-counter">{formData.message.length}/200</div>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h2 className="section-title">How can we reach you?</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        {/* Company Details Section */}
        <div className="form-section">
          <h2 className="section-title">Company Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">Company Name *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`form-input ${errors.companyName ? 'error' : ''}`}
                placeholder="Enter company name"
              />
              {errors.companyName && <span className="error-message">{errors.companyName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="businessType" className="form-label">Business Type/Role *</label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={`form-select ${errors.businessType ? 'error' : ''}`}
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && <span className="error-message">{errors.businessType}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="industry" className="form-label">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your job title"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country" className="form-label">Country/Region *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`form-select ${errors.country ? 'error' : ''}`}
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="province" className="form-label">Province/State *</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className={`form-input ${errors.province ? 'error' : ''}`}
                placeholder="Enter province/state"
              />
              {errors.province && <span className="error-message">{errors.province}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="postcode" className="form-label">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter postcode"
              />
            </div>
          </div>
        </div>

        {/* Subscription and Legal Section */}
        <div className="form-section">
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              Yes, I would like to subscribe to newsletters and be informed of new products, services and surveys from Hikvision. I understand that I can unsubscribe at any time.
            </label>
          </div>
          <p className="legal-text">
            By submitting this form, I confirm that I have read and agreed to the{' '}
            <a href="/privacy-policy" className="privacy-link">privacy policy</a>.
          </p>
        </div>

        {/* Submit Button */}
        <div className="form-section">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
    <Contact />
    </>
  );
};

export default SalesInquiry;
