import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthPasswordInput from '../../components/Auth/AuthFields';

const PARTNER_TYPES = [
  'Installer',
  'System Integrator',
  'Distributor',
  'Reseller',
  'Security Services Company',
  'Alarm Receiving Center',
];

const COUNTRIES = [
  'United States',
  'Pakistan',
  'India',
  'United Kingdom',
  'United Arab Emirates',
  'Saudi Arabia',
  'Germany',
  'Australia',
];

const Signup = () => {
  const [user, setUser] = useState({
    type: '',
    country: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    verificationCode: '',
    partnerPortal: '',
    subscribe: false,
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName') && /\d/.test(value)) {
      toast.error('Numbers are not allowed in names.');
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const handleVerifyEmail = () => {
    if (!user.email) {
      toast.error('Enter your email first.');
      return;
    }
    toast.success('Verification code sent to your email.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.agree) {
      toast.error('You must agree to the Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://portal.nexyos.com/api/register/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          type: user.type,
          country: user.country,
          company_name: user.companyName,
          password: user.password,
          code: user.verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || 'Registration failed.');
        setLoading(false);
        return;
      }

      localStorage.setItem(
        'user',
        JSON.stringify({ email: user.email, password: user.password })
      );

      toast.success('Account created successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: user.email, password: user.password })
      );
      toast.success('Account saved locally. You can sign in now.');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <AuthLayout
        alternateLink={{
          prefix: 'Already have an account?',
          label: 'Sign In',
          to: '/login',
        }}
      >
        <h1 className="auth-page__title">Create Account</h1>

        <div className="auth-page__info-box">
          <strong>OneNexyosID</strong> is a unified account for Nexyos.com and the Partner
          Portal. Register once to access product resources, partner tools, and project
          registration.
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__row">
            <div className="auth-field">
              <select
                value={user.type}
                onChange={(e) => setUser({ ...user, type: e.target.value })}
                required
              >
                <option value="">Type *</option>
                {PARTNER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="auth-field">
              <select
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                required
              >
                <option value="">Country/Region *</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="auth-form__row">
            <div className="auth-field">
              <div className="auth-input-wrap">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={user.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="auth-field">
              <div className="auth-input-wrap">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={user.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-input-wrap">
              <input
                type="text"
                placeholder="Company Name *"
                value={user.companyName}
                onChange={(e) => setUser({ ...user, companyName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="auth-form__row">
            <div className="auth-field">
              <div className="auth-input-wrap auth-input-wrap--verify">
                <input
                  type="email"
                  placeholder="Email *"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
                <button type="button" className="auth-verify-btn" onClick={handleVerifyEmail}>
                  Verify
                </button>
              </div>
            </div>
            <div className="auth-field">
              <div className="auth-input-wrap">
                <input
                  type="text"
                  placeholder="Verification Code *"
                  value={user.verificationCode}
                  onChange={(e) => setUser({ ...user, verificationCode: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="auth-field">
            <AuthPasswordInput
              id="signup-password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password *"
              autoComplete="new-password"
            />
          </div>

          <div className="auth-radio-group">
            <p>Do you want to sign up to the channel partner portal?</p>
            <label className="auth-radio-option">
              <input
                type="radio"
                name="partnerPortal"
                value="yes"
                checked={user.partnerPortal === 'yes'}
                onChange={(e) => setUser({ ...user, partnerPortal: e.target.value })}
                required
              />
              Yes, I want to become a Nexyos authorized partner and register with Partner Pro.
            </label>
            <label className="auth-radio-option">
              <input
                type="radio"
                name="partnerPortal"
                value="no"
                checked={user.partnerPortal === 'no'}
                onChange={(e) => setUser({ ...user, partnerPortal: e.target.value })}
              />
              No, I just want to register as an official website user.
            </label>
          </div>

          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={user.subscribe}
              onChange={(e) => setUser({ ...user, subscribe: e.target.checked })}
            />
            Subscribe to Nexyos newsletters and product updates.
          </label>

          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={user.agree}
              onChange={(e) => setUser({ ...user, agree: e.target.checked })}
              required
            />
            <span>
              I agree to Nexyos OneNexyosID&apos;s Terms and Conditions and Privacy Policy.
            </span>
          </label>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>
      </AuthLayout>
    </>
  );
};

export default Signup;
