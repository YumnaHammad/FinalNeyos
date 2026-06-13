import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flame, Loader2, Package, Sparkles, MessageSquare, Search } from 'lucide-react';
import { api, getVendorSession } from '../lib/api';

export default function Dashboard() {
  const vendor = getVendorSession();
  const [stats, setStats] = useState(null);
  const [inquiryStats, setInquiryStats] = useState({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/vendors/inquiries/stats')])
      .then(([productsRes, inquiryRes]) => {
        const products = Array.isArray(productsRes.data) ? productsRes.data : [];
        setStats({
          total: products.length,
          active: products.filter((p) => p.isActive !== false).length,
          newCount: products.filter((p) => p.isNew).length,
          hotCount: products.filter((p) => p.isHot).length,
        });
        setInquiryStats(inquiryRes.data);
      })
      .catch(() => {
        setStats({ total: 0, active: 0, newCount: 0, hotCount: 0 });
        setInquiryStats({ total: 0, unread: 0 });
      })
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
          Manage the product catalogue (view only), search lists, and sales inquiries.
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
          Browse products, search lists, and review sales inquiries.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm hover:bg-[#004d5a]"
          >
            <Package size={16} />
            View Products
          </Link>
          <Link
            to="/search-list"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm hover:bg-[#006071]/5"
          >
            <Search size={16} />
            Search List
          </Link>
          <Link
            to="/inquiries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm hover:bg-[#006071]/5"
          >
            <MessageSquare size={16} />
            Sales Inquiries
            {inquiryStats.unread > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[#006071] text-white text-xs">
                {inquiryStats.unread}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
