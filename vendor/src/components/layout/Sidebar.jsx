import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Package, MessageSquare, Search, Users } from 'lucide-react';
import { clearVendorSession, getVendorSession } from '../../lib/api';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Products', icon: Package, path: '/products' },
  { name: 'Search List', icon: Search, path: '/search-list' },
  { name: 'Sales Inquiries', icon: MessageSquare, path: '/inquiries' },
  { name: 'Registered Users', icon: Users, path: '/registrations' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const vendor = getVendorSession();

  const handleLogout = () => {
    clearVendorSession();
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-[#021a2e] text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <p className="text-xl font-black tracking-tight">NEXYOS</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300 mt-1">
          Vendor Portal
        </p>
      </div>

      {vendor && (
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-sm font-bold truncate">{vendor.name}</p>
          <p className="text-xs text-white/50 truncate">{vendor.company || vendor.email}</p>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#006071] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
