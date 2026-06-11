import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/SalesInquiry.css';

const SalesInquiry = () => {
  const location = useLocation();
  const productContext = location.state || {};

  const [formData, setFormData] = useState({
    userType: 'Business',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    province: '',
    city: '',
    postcode: '',
    message: productContext.productModel
      ? `Inquiry about ${productContext.productModel}${productContext.productTitle ? ` — ${productContext.productTitle}` : ''}`
      : '',
    companyName: '',
    businessType: '',
    industry: '',
    jobTitle: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.country.trim()) newErrors.country = 'Required';
    if (!formData.province.trim()) newErrors.province = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.message.trim()) newErrors.message = 'Required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Required';
    if (!formData.businessType.trim()) newErrors.businessType = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const businessTypes = [
    'End User',
    'System Integrator',
    'Distributor',
    'Consultant',
    'Contractor',
    'Other',
  ];

  const industries = [
    'Security & Surveillance',
    'Retail',
    'Healthcare',
    'Education',
    'Transportation',
    'Manufacturing',
    'Government',
    'Other',
  ];

  const countries = [
    'Saudi Arabia',
    'United Arab Emirates',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'India',
    'Pakistan',
    'Other',
  ];

  if (submitted) {
    return (
      <div className="sales-inquiry-page">
        <div className="sales-inquiry-wrap">
          <div className="sales-success">
            <h1>Thank you</h1>
            <p>Your sales inquiry has been received. Our team will contact you shortly.</p>
            <Link to="/" className="sales-submit-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sales-inquiry-page">
      <div className="sales-inquiry-wrap">
        <h1 className="sales-page-title">Contact Sales</h1>
        {productContext.productModel && (
          <p className="sales-product-ref">
            Regarding: <strong>{productContext.productModel}</strong>
            {productContext.productTitle && ` — ${productContext.productTitle}`}
          </p>
        )}

        <form onSubmit={handleSubmit} className="sales-form" noValidate>
          {/* User type */}
          <section className="sales-section">
            <h2 className="sales-section-title">
              <span className="sales-required">*</span>User type
            </h2>
            <div className="sales-radio-row">
              <label className="sales-radio">
                <input
                  type="radio"
                  name="userType"
                  value="Business"
                  checked={formData.userType === 'Business'}
                  onChange={handleInputChange}
                />
                <span className="sales-radio-mark" />
                Business
              </label>
              <label className="sales-radio">
                <input
                  type="radio"
                  name="userType"
                  value="Personal"
                  checked={formData.userType === 'Personal'}
                  onChange={handleInputChange}
                />
                <span className="sales-radio-mark" />
                Personal
              </label>
            </div>
          </section>

          {/* How can we reach you */}
          <section className="sales-section">
            <h2 className="sales-section-title">How can we reach you ?</h2>

            <div className="sales-row sales-row--2">
              <div className="sales-field">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name*"
                  className={errors.firstName ? 'sales-input sales-input--error' : 'sales-input'}
                />
                {errors.firstName && <span className="sales-error">{errors.firstName}</span>}
              </div>
              <div className="sales-field">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name*"
                  className={errors.lastName ? 'sales-input sales-input--error' : 'sales-input'}
                />
                {errors.lastName && <span className="sales-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="sales-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                className={errors.email ? 'sales-input sales-input--error' : 'sales-input'}
              />
              {errors.email && <span className="sales-error">{errors.email}</span>}
            </div>

            <div className="sales-field">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="sales-input"
              />
            </div>

            <div className="sales-row sales-row--2">
              <div className="sales-field">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={
                    errors.country
                      ? 'sales-input sales-select sales-input--error'
                      : 'sales-input sales-select'
                  }
                >
                  <option value="">Country/Region*</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="sales-error">{errors.country}</span>}
              </div>
              <div className="sales-field">
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  placeholder="Province/State*"
                  className={errors.province ? 'sales-input sales-input--error' : 'sales-input'}
                />
                {errors.province && <span className="sales-error">{errors.province}</span>}
              </div>
            </div>

            <div className="sales-row sales-row--2">
              <div className="sales-field">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City*"
                  className={errors.city ? 'sales-input sales-input--error' : 'sales-input'}
                />
                {errors.city && <span className="sales-error">{errors.city}</span>}
              </div>
              <div className="sales-field">
                <input
                  type="text"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder="Postcode"
                  className="sales-input"
                />
              </div>
            </div>
          </section>

          {/* What can we help you with */}
          <section className="sales-section">
            <h2 className="sales-section-title">What can we help you with ?</h2>
            <div className="sales-field">
              <div className="sales-textarea-wrap">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message*"
                  maxLength={200}
                  className={
                    errors.message ? 'sales-textarea sales-input--error' : 'sales-textarea'
                  }
                />
                <span className="sales-char-count">{formData.message.length}/200</span>
              </div>
              {errors.message && <span className="sales-error">{errors.message}</span>}
            </div>
          </section>

          {/* Company Details */}
          <section className="sales-section">
            <h2 className="sales-section-title">Company Details</h2>

            <div className="sales-field">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company Name*"
                className={
                  errors.companyName ? 'sales-input sales-input--error' : 'sales-input'
                }
              />
              {errors.companyName && <span className="sales-error">{errors.companyName}</span>}
            </div>

            <div className="sales-field">
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className={
                  errors.businessType
                    ? 'sales-input sales-select sales-input--error'
                    : 'sales-input sales-select'
                }
              >
                <option value="">Business Type/Role*</option>
                {businessTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.businessType && <span className="sales-error">{errors.businessType}</span>}
            </div>

            <div className="sales-field">
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="sales-input sales-select"
              >
                <option value="">Industry</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <div className="sales-field">
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="sales-input"
              />
            </div>
          </section>

          {/* Newsletter & legal */}
          <section className="sales-section sales-section--legal">
            <label className="sales-checkbox">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleInputChange}
              />
              <span className="sales-checkbox-mark" />
              <span>
                Yes, I would like to subscribe to newsletters and be informed of new products,
                services and surveys from Nexyos. I understand that I can unsubscribe at any time.
              </span>
            </label>

            <p className="sales-legal">
              By submitting this form, I confirm that I have read and agreed to the{' '}
              <Link to="/contact" className="sales-privacy-link">
                privacy policy
              </Link>
              .
            </p>
          </section>

          <button type="submit" className="sales-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalesInquiry;
