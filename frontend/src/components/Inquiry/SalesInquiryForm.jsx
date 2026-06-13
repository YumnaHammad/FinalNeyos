import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/SalesInquiry.css';

const MESSAGE_MAX = 200;

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'India',
  'Qatar',
  'Germany',
  'France',
  'Australia',
  'Singapore',
  'Other',
];

const BUSINESS_ROLES = [
  'System Integrator',
  'Distributor / Reseller',
  'End User',
  'Consultant',
  'Installer',
  'Other',
];

const INDUSTRIES = [
  'Security & Surveillance',
  'Smart City',
  'Retail',
  'Healthcare',
  'Education',
  'Industrial',
  'Transportation',
  'Other',
];

const EMPTY = {
  userType: 'business',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  province: '',
  city: '',
  postcode: '',
  message: '',
  companyName: '',
  businessRole: '',
  industry: '',
  jobTitle: '',
  subscribe: false,
};

export default function SalesInquiryForm({ defaultMessage = '', productLabel = '' }) {
  const [form, setForm] = useState({ ...EMPTY, message: defaultMessage });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (defaultMessage) {
      setForm((prev) => ({ ...prev, message: defaultMessage.slice(0, MESSAGE_MAX) }));
    }
  }, [defaultMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let next = type === 'checkbox' ? checked : value;
    if (name === 'message' && value.length > MESSAGE_MAX) return;
    if (name === 'userType') next = value;
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.userType) next.userType = 'Required';
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!form.email.trim()) next.email = 'Required';
    if (!form.country) next.country = 'Required';
    if (!form.province.trim()) next.province = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.message.trim()) next.message = 'Required';
    if (form.userType === 'business') {
      if (!form.companyName.trim()) next.companyName = 'Required';
      if (!form.businessRole) next.businessRole = 'Required';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success('Thank you! Our sales team will contact you shortly.');
      setForm({ ...EMPTY, message: '' });
      setErrors({});
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="sales-form" onSubmit={handleSubmit} noValidate>
      {productLabel && (
        <div className="sales-form__product-note">
          Inquiry regarding: <strong>{productLabel}</strong>
        </div>
      )}

      <section className="sales-form__section">
        <h2 className="sales-form__section-title">
          <span className="sales-form__required">*</span> User type
        </h2>
        <div className="sales-form__radio-group">
          <label className="sales-form__radio">
            <input
              type="radio"
              name="userType"
              value="business"
              checked={form.userType === 'business'}
              onChange={handleChange}
            />
            Business
          </label>
          <label className="sales-form__radio">
            <input
              type="radio"
              name="userType"
              value="personal"
              checked={form.userType === 'personal'}
              onChange={handleChange}
            />
            Personal
          </label>
        </div>
        {errors.userType && <p className="sales-form__error">{errors.userType}</p>}
      </section>

      <section className="sales-form__section">
        <h2 className="sales-form__section-title">How can we reach you?</h2>
        <div className="sales-form__grid">
          <div className="sales-form__field">
            <label htmlFor="si-firstName">First Name *</label>
            <input
              id="si-firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name*"
            />
            {errors.firstName && <p className="sales-form__error">{errors.firstName}</p>}
          </div>
          <div className="sales-form__field">
            <label htmlFor="si-lastName">Last Name *</label>
            <input
              id="si-lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name*"
            />
            {errors.lastName && <p className="sales-form__error">{errors.lastName}</p>}
          </div>
          <div className="sales-form__field sales-form__field--full">
            <label htmlFor="si-email">Email *</label>
            <input
              id="si-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email*"
            />
            {errors.email && <p className="sales-form__error">{errors.email}</p>}
          </div>
          <div className="sales-form__field sales-form__field--full">
            <label htmlFor="si-phone">Phone</label>
            <input
              id="si-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <div className="sales-form__field">
            <label htmlFor="si-country">Country/Region *</label>
            <select id="si-country" name="country" value={form.country} onChange={handleChange}>
              <option value="">Country/Region*</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="sales-form__error">{errors.country}</p>}
          </div>
          <div className="sales-form__field">
            <label htmlFor="si-province">Province/State *</label>
            <input
              id="si-province"
              name="province"
              value={form.province}
              onChange={handleChange}
              placeholder="Province/State*"
            />
            {errors.province && <p className="sales-form__error">{errors.province}</p>}
          </div>
          <div className="sales-form__field">
            <label htmlFor="si-city">City *</label>
            <input
              id="si-city"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City*"
            />
            {errors.city && <p className="sales-form__error">{errors.city}</p>}
          </div>
          <div className="sales-form__field">
            <label htmlFor="si-postcode">Postcode</label>
            <input
              id="si-postcode"
              name="postcode"
              value={form.postcode}
              onChange={handleChange}
              placeholder="Postcode"
            />
          </div>
        </div>
      </section>

      <section className="sales-form__section">
        <h2 className="sales-form__section-title">What can we help you with?</h2>
        <div className="sales-form__field sales-form__field--full">
          <label htmlFor="si-message">Message *</label>
          <div className="sales-form__textarea-wrap">
            <textarea
              id="si-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message*"
              maxLength={MESSAGE_MAX}
            />
            <span className="sales-form__char-count">
              {form.message.length}/{MESSAGE_MAX}
            </span>
          </div>
          {errors.message && <p className="sales-form__error">{errors.message}</p>}
        </div>
      </section>

      {form.userType === 'business' && (
        <section className="sales-form__section">
          <h2 className="sales-form__section-title">Company Details</h2>
          <div className="sales-form__grid">
            <div className="sales-form__field sales-form__field--full">
              <label htmlFor="si-company">Company Name *</label>
              <input
                id="si-company"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company Name*"
              />
              {errors.companyName && <p className="sales-form__error">{errors.companyName}</p>}
            </div>
            <div className="sales-form__field">
              <label htmlFor="si-role">Business Type/Role *</label>
              <select
                id="si-role"
                name="businessRole"
                value={form.businessRole}
                onChange={handleChange}
              >
                <option value="">Business Type/Role*</option>
                {BUSINESS_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.businessRole && <p className="sales-form__error">{errors.businessRole}</p>}
            </div>
            <div className="sales-form__field">
              <label htmlFor="si-industry">Industry</label>
              <select id="si-industry" name="industry" value={form.industry} onChange={handleChange}>
                <option value="">Industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="sales-form__field sales-form__field--full">
              <label htmlFor="si-job">Job Title</label>
              <input
                id="si-job"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Job Title"
              />
            </div>
          </div>
        </section>
      )}

      <div className="sales-form__checkbox-row">
        <input
          id="si-subscribe"
          name="subscribe"
          type="checkbox"
          checked={form.subscribe}
          onChange={handleChange}
        />
        <label htmlFor="si-subscribe">
          Yes, I would like to subscribe to newsletters and be informed of new products, services,
          and surveys from Nexyos. I understand that I can unsubscribe at any time.
        </label>
      </div>

      <p className="sales-form__privacy">
        By submitting this form, I confirm that I have read and agreed to the{' '}
        <Link to="/privacy-policy">privacy policy</Link>.
      </p>

      <div className="sales-form__submit-wrap">
        <button type="submit" className="sales-form__submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
