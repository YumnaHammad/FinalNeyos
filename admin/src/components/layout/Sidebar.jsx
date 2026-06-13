import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  Box,
  LogOut,
  Briefcase,
  ChevronRight,
  Zap,
  Home,
  Star,
  Video,
  Search,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState(['Landing Page', 'Catalogue', 'Company']);

  const toggleMenu = (name) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    {
      name: 'Landing Page',
      icon: Home,
      submenu: [
        { name: 'Banner (Sec 1)', icon: ImageIcon, path: '/section/1' },
        { name: 'Sensing Matter (Sec 3)', icon: Zap, path: '/section/3' },
        { name: 'Success Stories (Sec 4)', icon: Star, path: '/section/4' },
        { name: 'Solutions (Sec 5)', icon: Briefcase, path: '/section/5' },
        { name: 'Partners (Sec 6)', icon: Users, path: '/section/6' },
        { name: 'Capabilities (Sec 7)', icon: Video, path: '/section/7' },
        { name: 'Vendors (Sec 8)', icon: Users, path: '/section/8' },
      ],
    },
    {
      name: 'Catalogue',
      icon: Box,
      submenu: [
        { name: 'Categories', icon: Box, path: '/categories-settings' },
        { name: 'Products', icon: Box, path: '/products' },
        { name: 'Search List', icon: Search, path: '/search-list' },
      ],
    },
    {
      name: 'Company',
      icon: Briefcase,
      submenu: [
        { name: 'Blog', icon: BookOpen, path: '/blogs-settings' },
        { name: 'News', icon: BookOpen, path: '/news-settings' },
        { name: 'Events', icon: BookOpen, path: '/events-settings' },
      ],
    },
    { name: 'Vendor Accounts', icon: Users, path: '/vendors' },
    { name: 'Sales Inquiries', icon: MessageSquare, path: '/sales-inquiries' },
    { name: 'Registered Users', icon: Users, path: '/registrations' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-100">
        <p className="text-xl font-black text-[#006071]">NEXYOS</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">
          Admin Portal
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {menuItems.map((item) =>
          item.submenu ? (
            <div key={item.name} className="mb-2">
              <button
                type="button"
                onClick={() => toggleMenu(item.name)}
                className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#006071] rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <item.icon size={18} />
                  {item.name}
                </span>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${openMenus.includes(item.name) ? 'rotate-90' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openMenus.includes(item.name) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden ml-4 mt-1 space-y-0.5"
                  >
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg ${
                            isActive || location.pathname === sub.path
                              ? 'bg-[#006071]/10 text-[#006071]'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`
                        }
                      >
                        <sub.icon size={14} />
                        {sub.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 mb-1 text-sm font-semibold rounded-lg ${
                  isActive
                    ? 'bg-[#006071] text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#006071]'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          )
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-gray-500 hover:text-red-600 rounded-lg"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
