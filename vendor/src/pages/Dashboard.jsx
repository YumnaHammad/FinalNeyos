import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flame, Loader2, Package, Sparkles } from 'lucide-react';
import { api, getVendorSession } from '../lib/api';

export default function Dashboard() {
  const vendor = getVendorSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/vendors/dashboard')
      .then((res) => setStats(res.data))
      .catch(() => setStats({ total: 0, active: 0, newCount: 0, hotCount: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Products', value: stats?.total ?? '—', icon: Package, color: 'text-[#006071]' },
    { label: 'Active Listings', value: stats?.active ?? '—', icon: Box, color: 'text-emerald-600' },
    { label: 'Marked NEW', value: stats?.newCount ?? '—', icon: Sparkles, color: 'text-blue-600' },
    { label: 'Marked HOT', value: stats?.hotCount ?? '—', icon: Flame, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto space-y-8">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Vendor Portal
        </p>
        <h1 className="text-3xl font-black text-gray-900">
          Welcome back, {vendor?.name || 'Vendor'}
        </h1>
        <p className="text-gray-500 mt-1">
          {vendor?.company ? `${vendor.company} · ` : ''}
          Manage your product catalogue and keep listings current.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#006071]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <Icon className={`${color} mb-3`} size={28} />
              <p className="text-3xl font-black text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Quick actions</h2>
        <p className="text-gray-500 text-sm mb-4">
          Add or edit products with full specifications, images, and downloadable resources.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm hover:bg-[#004d5a]"
        >
          <Package size={16} />
          Manage Products
        </Link>
      </div>
    </div>
  );
}
