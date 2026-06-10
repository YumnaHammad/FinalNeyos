import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Lock, Shield, Store } from 'lucide-react';

const LOGIN_PASSWORD = '123123';

const LoginPage = () => {
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== LOGIN_PASSWORD) {
      toast.error('Invalid password');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);

    if (role === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      toast.success('Welcome, Admin!');
      setTimeout(() => navigate('/'), 600);
    } else {
      localStorage.removeItem('isAdmin');
      toast.success('Welcome, Vendor!');
      setTimeout(() => navigate('/products'), 600);
    }
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
            <h2 className="text-3xl font-bold text-[#006071]">Secure Management</h2>
            <p className="mt-4 text-gray-600">
              Sign in as Admin or Vendor to access the Nexyos portal.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#006071] mb-2">NEXYOS</h1>
            <p className="text-gray-500 text-lg">Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Login as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    role === 'admin'
                      ? 'border-[#006071] bg-[#006071]/5 text-[#006071]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Shield size={28} />
                  <span className="font-bold text-sm">Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('vendor')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    role === 'vendor'
                      ? 'border-[#006071] bg-[#006071]/5 text-[#006071]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <Store size={28} />
                  <span className="font-bold text-sm">Vendor</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006071] focus:border-transparent transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006071] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#004d5a] transition-colors shadow-lg"
            >
              Sign In as {role === 'admin' ? 'Admin' : 'Vendor'}
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
