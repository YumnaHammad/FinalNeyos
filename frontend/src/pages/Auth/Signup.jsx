import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loginn from "../assets/images/nexyos/Loginn.jpg";

// ✅ MUI Components
import { toast, Toaster } from 'react-hot-toast';

const Signup = () => {
  const [user, setUser] = useState({
    type: "",
    country: "",
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    verificationCode: "",
    partnerPortal: "",
    subscribe: false,
    agree: false,
  });

  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName') && /\d/.test(value)) {
      toast.error('Numbers are not allowed in names.');
      return;
    }
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.agree) {
      toast.error("You must agree to the Privacy Policy.");
      return;
    }

    try {
      const response = await fetch('https://portal.nexyos.com/api/register/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          type: user.type,
          country: user.country,
          company_name: user.companyName,

          password: user.password,
          code:           user.verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed.');
        return;
      }

      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="full-page">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="left-panel">
        <h2 className="title">Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <select value={user.type} onChange={(e) => setUser({ ...user, type: e.target.value })} required>
            <option value="">Select Type</option>
            <option>Installer</option>
            <option>System Integrator</option>
            <option>Distributor</option>
            <option>Reseller</option>
            <option>Security Services Company</option>
            <option>Alarm Receiving Center</option>
          </select>

          <select value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })} required>
            <option value="">Select Country/Region</option>
            <option>United States</option>
            <option>Pakistan</option>
            <option>India</option>
            <option>UK</option>
          </select>

          <div className="input-row">
            <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleInputChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleInputChange} required />
          </div>
          <input type="text" placeholder="Company Name" value={user.companyName} onChange={(e) => setUser({ ...user, companyName: e.target.value })} required />
          <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
          <input type="text" placeholder="Verification Code" value={user.verificationCode} onChange={(e) => setUser({ ...user, verificationCode: e.target.value })} required />
          <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />

          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="partnerPortal" value="yes" onChange={(e) => setUser({ ...user, partnerPortal: e.target.value })} required />
              Yes, register with Nexyos-Partner Pro
            </label>

            <label className="radio-option">
              <input type="radio" name="partnerPortal" value="no" onChange={(e) => setUser({ ...user, partnerPortal: e.target.value })} required />
              No, just register as official user
            </label>
          </div>

          <label className="checkbox-label">
            <input type="checkbox" checked={user.subscribe} onChange={(e) => setUser({ ...user, subscribe: e.target.checked })} />
            Subscribe to newsletters
          </label>

          <label className="checkbox-label">
            <input type="checkbox" checked={user.agree} onChange={(e) => setUser({ ...user, agree: e.target.checked })} required />
            I agree to Nexyos OneNexyosID’s Privacy Policy
          </label>

          <button type="submit">Register</button>
        </form>

        <p className="redirect-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>

      <div className="right-panel">
        <img src={Loginn} alt="Signup Visual" />
      </div>

      <style>{`
        .full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: linear-gradient(to right, #f0f0f0, #d9d9d9);
        }

        @media (min-width: 768px) {
          .full-page {
            flex-direction: row;
          }
        }

        .left-panel {
          flex: 1;
          padding: 30px;
          background-color: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .left-panel::-webkit-scrollbar {
          display: none;
        }

        .right-panel {
          flex: 1.5;
          background: #222;
          display: none;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 768px) {
          .right-panel {
            display: flex;
          }
        }

        .right-panel img {
          width: 100%;
          height: auto;
          max-width: 100%;
          filter: brightness(0.7);
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: #014f5d;
          margin-bottom: 20px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 36px;
          }
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.8);
        }

        .input-row {
          display: flex;
          gap: 14px;
        }

        .input-row input {
          flex: 1;
        }

        input, select {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #bbb;
          font-size: 14px;
          transition: border-color 0.3s ease;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #014f5d;
        }

        button {
          background-color: #014f5d;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #013a47;
        }

        .radio-group {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 14px;
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        .radio-group label {
          font-size: 13px;
          margin: 4px 0;
          text-align: left;
        }

        .checkbox-label {
          font-size: 13px;
          margin: 4px 0;
          text-align: left;
        }

        .redirect-text {
          margin-top: 18px;
          font-size: 13px;
          text-align: center;
        }

        .redirect-text a {
          color: #007bff;
          text-decoration: none;
        }

        .redirect-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Signup;
