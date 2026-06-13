import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Lock, Shield } from 'lucide-react';
import PasswordInput from '../components/ui/PasswordInput';

const LOGIN_PASSWORD = '123123';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== LOGIN_PASSWORD) {
      toast.error('Invalid password');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('userRole', 'admin');
    toast.success('Welcome, Admin!');
    setTimeout(() => navigate('/'), 600);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" />

      <div className="hidden lg:flex lg:w-1/2 bg-[#f8fafc] items-center justify-center p-12">
        <div className="max-w-md w-full">
          <img
            src="https://img.freepik.com/free-vector/security-concept-illustration_114360-1498.jpg"
            alt="Nexyos Security"
            className="w-full h-auto"
          />
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-[#006071]">Admin Portal</h2>
            <p className="mt-4 text-gray-600">
              Manage catalogue, content, partners, and site settings.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              Vendors use the separate portal at port 5175.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#006071] mb-2">NEXYOS</h1>
            <p className="text-gray-500 text-lg">Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#006071] bg-[#006071]/5 text-[#006071]">
              <Shield size={28} />
              <span className="font-bold text-sm">Administrator Sign In</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                leftIcon={Lock}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#006071] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#004d5a] transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-12 text-center text-gray-500 text-sm">
            &copy; 2026 Nexyos. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
