import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loginn from "../assets/images/nexyos/Loginn.jpg";

// ✅ MUI Components
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        localStorage.setItem("loggedIn", "true");
        navigate("/");
      }, 1500); // ✅ wait for message before redirecting
    } else {
      toast.error("Incorrect email or password");
    }
  };

  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };

  return (
    <div className="full-page">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="left-panel">
        <h2 className="title">Welcome</h2>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="OneNexyosID / Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        <div className="bottom-text">
          <p>
            New to Nexyos? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>

      <div className="right-panel">
        <img src={Loginn} alt="Login Visual" />
      </div>

      {/* ✅ Snackbar Alert */}
      {/* Removed Snackbar component */}

      <style>{`
        .full-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .full-page {
            flex-direction: row;
          }
        }

        .left-panel {
          flex: 1;
          padding: 30px;
          background-color: #f9f9f9;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .left-panel::-webkit-scrollbar {
          display: none;
        }

        .right-panel {
          flex: 1.8;
          background: #000;
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
        }

        .title {
          font-size: 32px;
          font-weight: bold;
          color: #01667D;
          margin-bottom: 20px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 40px;
          }
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px;
          border-radius: 8px;
      
        }

        input {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 15px;
        }

        input:focus {
          outline: none;
          border-color: #d40000;
        }

        button {
          background-color: #01667D;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background-color: #014e61;
        }

        .bottom-text {
          margin-top: 20px;
          font-size: 14px;
          text-align: center;
        }

        .bottom-text a {
          color: #007bff;
          text-decoration: none;
        }

        .bottom-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
