import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Lock, Mail, Store } from 'lucide-react';
import { api, setVendorSession } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function Login() {
  const [email, setEmail] = useState('vendor@vendor.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/vendors/login', { email, password });
      setVendorSession(res.data);
      toast.success(`Welcome, ${res.data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" />

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#021a2e] to-[#006071] items-center justify-center p-12">
        <div className="max-w-md w-full text-white text-center">
          <Store size={64} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold">Vendor Portal</h2>
          <p className="mt-4 text-white/80 leading-relaxed">
            Manage your Nexyos product catalogue, upload specifications, and keep your listings up to
            date — all in one dedicated workspace.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-[#006071] mb-2">NEXYOS</h1>
            <p className="text-gray-500 text-lg">Vendor Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vendor@vendor.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006071] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                leftIcon={Lock}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006071] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#004d5a] transition-colors shadow-lg disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Need an account? Contact your Nexyos administrator.
          </p>

          <div className="mt-12 text-center text-gray-400 text-sm">
            &copy; 2026 Nexyos. Vendor Portal
          </div>
        </div>
      </div>
    </div>
  );
}
