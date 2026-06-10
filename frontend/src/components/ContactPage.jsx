import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    phoneNumber: "",
    companyName: "",
    postalCode: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {/* In-page CSS */}
      <style>{`
        .contact-container {
          min-height: 100vh;
          background: #f9fafb;
          padding: 3rem 1rem;
        }
        .contact-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
        .contact-title {
          font-size: 1.875rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        .contact-subtitle {
          color: #4b5563;
          font-size: 1rem;
          max-width: 640px;
          margin: 0 auto 2rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media(min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.2);
        }
        .form-textarea {
          resize: none;
          grid-column: span 2;
        }
        .submit-btn {
          display: inline-block;
          background: #2563eb;
          color: white;
          font-weight: 500;
          padding: 0.75rem 2.5rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .submit-btn:hover {
          background: #1d4ed8;
          box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }
      `}</style>

      <div className="contact-container">
        {/* Header */}
        <div className="text-center">
          <h1 className="contact-title">Have questions? We can help</h1>
          <p className="contact-subtitle">
            Our video security experts can help you implement the right security
            system for your business.
          </p>
        </div>

        {/* Form Card */}
        <div className="contact-card">
          <form onSubmit={handleSubmit}>
            {/* Inputs */}
            <div className="form-grid">
              <input
                type="text"
                name="firstName"
                placeholder="First name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="email"
                name="workEmail"
                placeholder="Work email*"
                value={formData.workEmail}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number*"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company name*"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="form-input"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal code*"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="form-input"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="What can we help with?"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
              />
            </div>

            {/* Button */}
            <div className="text-center mt-6">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
