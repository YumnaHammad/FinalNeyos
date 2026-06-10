import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPhoneCall } from "react-icons/fi";
import { PiEnvelopeFill } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { HiClock } from "react-icons/hi2";
import ContactPage from "./ContactPage";

const Contact = () => {
  const captchaStyle = {
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  };
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
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
    if (!formData.email) {
      error.email = "Email is required";
    }
    if (!formData.company) {
      error.company = "Company is required";
    }
    if (!formData.product) {
      error.product = "Product is required";
    }
    if (!formData.country) {
      error.country = "Country is required";
    }
    if (!formData.website) {
      error.website = "Website is required";
    }
    if (!formData.message) {
      error.message = "Message is required";
    }
    if (!formData.phone) {
      error.phone = "Phone is required";
    }
    if (!formData.business_type) {
      error.business_type = "Business Type is required";
    }
    if (!formData.verification_code) {
      error.verification_code = "Verification Code is required";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
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
      body: JSON.stringify(formData),
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
    setFormData({
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
    <>
    <ContactPage/>
        <section className="contact py-80 mx-40">
      <div className="container container-lg">
        <div className="row gy-5">
          <div className="col-lg-8">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <form onSubmit={handleSubmit}>
                <div className="row gy-4">
                  {/* Row 1 */}
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="email" className="form-label">
                      *Your Email
                    </label>
                    <input
                      type="email"
                      className="common-input px-16"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="company" className="form-label">
                      *Company
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="company"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="product" className="form-label">
                      *What Product are You Interested in?
                    </label>
                    <select
                      id="product"
                      className="common-input px-16"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                    >
                      <option>Select Product</option>
                      <option value="Product A">Product A</option>
                      <option value="Product B">Product B</option>
                    </select>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="country" className="form-label">
                      *Country
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Row 2 */}
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="website" className="form-label">
                      *Your Website
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="website"
                      name="website"
                      placeholder="Your Website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="message" className="form-label">
                      *Message
                    </label>
                    <input
                      type="text"
                      className="common-input px-16"
                      id="message"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="phone" className="form-label">
                      *Your Phone
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="common-input px-16"
                        style={{ width: "30%" }}
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                      >
                        <option>+92</option>
                        <option>+91</option>
                        <option>+1</option>
                      </select>
                      <input
                        type="number"
                        className="common-input px-16"
                        style={{ width: "70%" }}
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <label htmlFor="business_type" className="form-label">
                      *Business Type
                    </label>
                    <select
                      id="business_type"
                      className="common-input px-16"
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                    >
                      <option>Select Type</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>
                  {/* Row 3 */}
                  <div className="col-md-4 col-sm-6 d-flex align-items-end">
                    <div>
                      <label className="form-label d-block">
                        *Verification Code
                      </label>
                      <div className="d-flex gap-2">
                        <div style={captchaStyle}>8 7 H K</div>
                        <input
                          type="text"
                          className="common-input px-16"
                          placeholder="Enter Code"
                          name="verification_code"
                          value={formData.verification_code}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div
                    className="col-12 text-center"
                    style={{
                      paddingTop: "20px",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-main py-18 px-32 rounded-8"
                    >
                      Let’s Talk
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
              <h6 className="mb-48"  data-aos="fade-right">Get In Touch</h6>
              <div className="flex-align gap-16 mb-16">
                <span
                  className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-2xl flex-shrink-0"
                  style={{
                    color: "#3c8a9b",
                  }}
                >
                   <FiPhoneCall />
                </span>
                <Link
                  to="/tel:+918008008841"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  +918008008841
                </Link>
                <Link
                  to="/tel:8008008841"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  , 8008008841
                </Link>
              </div>
              <div className="flex-align gap-16 mb-16">
                <span
                  className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-2xl flex-shrink-0"
                  style={{
                    color: "#3c8a9b",
                  }}
                >
                   <PiEnvelopeFill />
                </span>
                <Link
                  to="mailto:info@nexyos.com"
                  className="text-md text-gray-900 hover-text-main-600"
                >
                  info@nexyos.com
                </Link>
              </div>
              <div className="flex-align gap-16 mb-0">
                <span
                  className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-2xl flex-shrink-0"
                  style={{
                    color: "#3c8a9b",
                  }}
                >
                   <FaLocationDot />
                </span>
                <span className="text-md text-gray-900 text-start">
                  <strong>Address(Qatar): </strong>
                  4TH Floor, office num 4 Building number 20 Muntazah ,zone 24,
                  Doha Qatar
                </span>
              </div>
              <div className="flex-align gap-16 mb-0">
                <span
                  className="w-40 h-40 flex-center rounded-circle border border-gray-100  text-2xl flex-shrink-0"
                  style={{
                    color: "#3c8a9b",
                  }}
                >
                  <FaLocationDot />
                </span>
                <span className="text-md text-gray-900 text-start">
                  <strong>Address(India):</strong> Near, police station road,
                  Koyilandy, Kerala 673305, India
                </span>
              </div>
              <div className="flex-align gap-16 mb-0">
                <span
                  className="w-40 h-40 flex-center rounded-circle border border-gray-100  text-2xl flex-shrink-0"
                  style={{
                    color: "#3c8a9b",
                  }}
                >
                  <HiClock />
                </span>
                <span className="text-md text-gray-900 ">
                  <strong>Hours:</strong>
                  10:00 - 18:00, Mon - Sat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></>

  );
};

export default Contact;
