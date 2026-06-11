import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Download, Loader2 } from 'lucide-react';
import ProductDetailEditor from '../components/ui/ProductDetailEditor';

export default function Products() {
  const [seeding, setSeeding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await axios.post('/api/products/seed');
      toast.success('Default products loaded');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed — restart backend (npm run dev in backend folder)');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">Catalogue</p>
          <h1 className="text-3xl font-black text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">
            Edit full product long pages (gallery, specs, resources). Each product maps to{' '}
            <code>/products/[slug]</code> on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSeed}
          disabled={seeding}
          className="self-start px-5 py-2.5 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm flex items-center gap-2 hover:bg-[#006071]/5 disabled:opacity-50"
        >
          {seeding ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          Load Default Products
        </button>
      </div>

      <ProductDetailEditor key={refreshKey} />
    </div>
  );
}
