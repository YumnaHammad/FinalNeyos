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
  Layers,
  Database,
  Star,
  Video,
  Settings2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState(['Section Manager', 'Catalogue']);

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

  const userRole = localStorage.getItem('userRole') || 'admin';
  const isVendor = userRole === 'vendor';

  const adminMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    {
      name: 'Section Manager',
      icon: Layers,
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
        { name: 'Industry Solutions', icon: Briefcase, path: '/solutions-settings' },
      ],
    },
    { name: 'Specifications', icon: Settings2, path: '/specifications' },
  ];

  const vendorMenuItems = [{ name: 'Products', icon: Box, path: '/products' }];

  const menuItems = isVendor ? vendorMenuItems : adminMenuItems;

  return (
    <aside className="w-80 h-screen bg-[#00151a] text-white flex flex-col sticky top-0 border-r border-white/5 shadow-2xl z-50">
      <div className="p-10 flex flex-col items-center border-b border-white/5 bg-[#001a21]/50 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-gradient-to-br from-[#006071] to-[#00a2b8] rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[#006071]/40 mb-4 border border-white/10"
        >
          <Database size={32} className="text-white" />
        </motion.div>
        <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          NEXYOS
        </h1>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.4em] mt-1">
          {isVendor ? 'Vendor Portal' : 'Management Portal'}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-2 no-scrollbar">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {item.submenu ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold text-sm ${
                    openMenus.includes(item.name)
                      ? 'bg-white/5 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon
                      size={20}
                      className={openMenus.includes(item.name) ? 'text-[#006071]' : ''}
                    />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${openMenus.includes(item.name) ? 'rotate-90' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openMenus.includes(item.name) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((sub, subIdx) => (
                        <NavLink
                          key={subIdx}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center gap-4 p-3.5 rounded-xl text-sm font-bold transition-all relative group ${
                              isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <motion.div
                                  layoutId="activeSub"
                                  className="absolute inset-0 bg-gradient-to-r from-[#006071]/20 to-transparent rounded-xl border-l-4 border-[#006071]"
                                />
                              )}
                              <sub.icon size={16} className={isActive ? 'text-[#006071]' : ''} />
                              <span className="relative z-10">{sub.name}</span>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#006071] to-[#004d5a] text-white shadow-xl shadow-[#006071]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <motion.div layoutId="activeMain" className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <div className="p-8 border-t border-white/5 bg-[#001a21]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl transition-all font-black text-sm uppercase tracking-widest border border-rose-500/20"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
