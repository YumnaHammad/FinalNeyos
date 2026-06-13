import { Link } from 'react-router-dom';
import { Box, Search, Layers, ArrowRight } from 'lucide-react';

const links = [
  {
    title: 'Products',
    desc: 'Create and edit product pages, categories, filter tags, specs, and gallery.',
    path: '/products',
    icon: Box,
  },
  {
    title: 'Search List',
    desc: 'View each product family (sub-sub category) with its search box, filters, and cards.',
    path: '/search-list',
    icon: Search,
  },
  {
    title: 'Categories',
    desc: 'Manage category → sub-category → product family hierarchy.',
    path: '/categories-settings',
    icon: Layers,
  },
];

export default function Dashboard() {
  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto space-y-8">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Nexyos Admin
        </p>
        <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Use the links below or open <strong>Catalogue</strong> in the sidebar.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {links.map(({ title, desc, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className="group bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8 hover:border-[#006071]/30 hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#006071]/10 text-[#006071] flex items-center justify-center mb-5">
              <Icon size={22} />
            </div>
            <h2 className="text-xl font-black text-gray-900 group-hover:text-[#006071] transition-colors">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
            <span className="inline-flex items-center gap-1 mt-5 text-sm font-bold text-[#006071]">
              Open <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
