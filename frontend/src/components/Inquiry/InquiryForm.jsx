import { useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../../styles/InquiryForm.css';

const DEFAULT_INTEREST_AREAS = [
  'Video Surveillance',
  'Nexyos IoT Cloud',
  'LoRaWAN Gateway',
  '5G/4G Router',
  'Partner Program',
  'Other',
];

const DEFAULT_PRODUCTS = [
  'Network Cameras',
  'PTZ Cameras',
  'NVR / VMS',
  'LoRaWAN Sensors',
  'LoRaWAN Gateways',
  'Industrial Routers',
  'Other',
];

const BUSINESS_TYPES = [
  'System Integrator',
  'Distributor / Reseller',
  'End User',
  'Consultant',
  'Retail',
  'Wholesale',
  'Other',
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'India',
  'Qatar',
  'Germany',
  'France',
  'Australia',
  'Other',
];

const PHONE_CODES = ['+1', '+44', '+971', '+91', '+92', '+974', '+49', '+33', '+61'];

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function InquiryForm({
  interestMode = 'area',
  interestOptions,
  defaultInterest = '',
  defaultMessage = '',
  className = '',
}) {
  const options = useMemo(
    () =>
      interestOptions ||
      (interestMode === 'product' ? DEFAULT_PRODUCTS : DEFAULT_INTEREST_AREAS),
    [interestMode, interestOptions]
  );

  const interestLabel =
    interestMode === 'product'
      ? 'What Product are You Interested in?'
      : 'Which area are you interested in?';

  const [captcha] = useState(generateCaptcha);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '',
    country: '',
    phoneCode: '+91',
    phone: '',
    company: '',
    website: '',
    businessType: '',
    interest: defaultInterest,
    message: defaultMessage,
    verificationCode: '',
  });

  useEffect(() => {
    if (defaultInterest) {
      setForm((prev) => ({ ...prev, interest: defaultInterest }));
    }
  }, [defaultInterest]);

  useEffect(() => {
    if (defaultMessage) {
      setForm((prev) => ({ ...prev, message: defaultMessage }));
    }
  }, [defaultMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Required';
    if (!form.country) next.country = 'Required';
    if (!form.phone.trim()) next.phone = 'Required';
    if (!form.company.trim()) next.company = 'Required';
    if (!form.interest) next.interest = 'Required';
    if (!form.message.trim()) next.message = 'Required';
    if (form.verificationCode.toUpperCase() !== captcha) {
      next.verificationCode = 'Incorrect code';
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
      toast.success('Thank you! Our team will contact you shortly.');
      setForm({
        email: '',
        country: '',
        phoneCode: '+91',
        phone: '',
        company: '',
        website: '',
        businessType: '',
        interest: defaultInterest,
        message: defaultMessage,
        verificationCode: '',
      });
      setErrors({});
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`inquiry-form__box ${className}`.trim()}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="inquiry-form__grid">
          <div className="inquiry-form__field">
            <label htmlFor="inquiry-email">Your Email *</label>
            <input
              id="inquiry-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && <p className="inquiry-form__error">{errors.email}</p>}
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-company">Company *</label>
            <input
              id="inquiry-company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
            />
            {errors.company && <p className="inquiry-form__error">{errors.company}</p>}
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-interest">{interestLabel} *</label>
            <select
              id="inquiry-interest"
              name="interest"
              value={form.interest}
              onChange={handleChange}
            >
              <option value="">Select…</option>
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.interest && <p className="inquiry-form__error">{errors.interest}</p>}
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-country">Country *</label>
            <select
              id="inquiry-country"
              name="country"
              value={form.country}
              onChange={handleChange}
            >
              <option value="">Select…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="inquiry-form__error">{errors.country}</p>}
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-website">Your Website</label>
            <input
              id="inquiry-website"
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              placeholder="https://"
            />
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-business">Business Type</label>
            <select
              id="inquiry-business"
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
            >
              <option value="">Select…</option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-phone">Your Phone *</label>
            <div className="inquiry-form__phone-row">
              <select name="phoneCode" value={form.phoneCode} onChange={handleChange}>
                {PHONE_CODES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
            {errors.phone && <p className="inquiry-form__error">{errors.phone}</p>}
          </div>

          <div className="inquiry-form__field inquiry-form__field--span2">
            <label htmlFor="inquiry-message">Message *</label>
            <textarea
              id="inquiry-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project or requirements…"
            />
            {errors.message && <p className="inquiry-form__error">{errors.message}</p>}
          </div>

          <div className="inquiry-form__field">
            <label htmlFor="inquiry-captcha">Verification Code *</label>
            <div className="inquiry-form__captcha-row">
              <span className="inquiry-form__captcha-img" aria-hidden>
                {captcha}
              </span>
              <input
                id="inquiry-captcha"
                name="verificationCode"
                type="text"
                value={form.verificationCode}
                onChange={handleChange}
                placeholder="Enter code"
                autoComplete="off"
              />
            </div>
            {errors.verificationCode && (
              <p className="inquiry-form__error">{errors.verificationCode}</p>
            )}
          </div>
        </div>

        <div className="inquiry-form__submit-wrap">
          <button type="submit" className="inquiry-form__submit" disabled={submitting}>
            {submitting ? 'Sending…' : "Let's Talk"}
          </button>
        </div>
      </form>
    </div>
  );
}
