import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Download, Loader2 } from 'lucide-react';
import UniversalManager from '../components/ui/UniversalManager';
import SingleSectionManager from '../components/ui/SingleSectionManager';
import CapabilitiesEditor from '../components/ui/CapabilitiesEditor';

/** Admin sidebar section number → page config (route /section/:num = API /api/sec/:num) */
const SECTION_CONFIG = {
  '1': {
    title: 'BANNER (SEC 1)',
    hint: 'Homepage hero carousel',
    type: 'list',
    fields: [
      { name: 'title', label: 'Main Heading' },
      { name: 'miniTitle', label: 'Mini Title' },
      { name: 'subtitle', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image URL' },
      { name: 'button', label: 'Button Text' },
      { name: 'buttonLink', label: 'Button Link' },
    ],
  },
  '3': {
    title: 'SENSING MATTER (SEC 3)',
    hint: 'Expandable sensing cards',
    type: 'list',
    loadDefaults: { endpoint: '/api/sec/3/defaults', label: 'Load default cards (4)' },
    fields: [
      { name: 'title', label: 'Card Title' },
      { name: 'image', label: 'Background Image' },
    ],
  },
  '4': {
    title: 'SUCCESS STORIES (SEC 4)',
    hint: 'Single block on the homepage',
    type: 'single',
    loadDefaults: { endpoint: '/api/sec/4/defaults', label: 'Load default section' },
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'desc', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Background Image' },
    ],
  },
  '5': {
    title: 'SOLUTIONS (SEC 5)',
    hint: 'Homepage solutions carousel',
    type: 'list',
    loadDefaults: { endpoint: '/api/sec/5/defaults', label: 'Load default solutions (3)' },
    fields: [
      { name: 'title', label: 'Solution Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image (card & detail)' },
    ],
  },
  '6': {
    title: 'PARTNERS (SEC 6)',
    hint: 'Channel partners — partner names only (not solutions)',
    type: 'list',
    loadDefaults: { endpoint: '/api/sec/6/defaults', label: 'Load default partners (6)' },
    fields: [
      { name: 'head', label: 'Partner Name' },
      { name: 'logo', label: 'Logo URL (optional)' },
    ],
  },
  '7': {
    title: 'CAPABILITIES (SEC 7)',
    hint: 'Flip cards + section header',
    type: 'capabilities',
  },
  '8': {
    title: 'VENDORS (SEC 8)',
    hint: 'Trusted by — scrolling name carousel (text only, no images)',
    type: 'list',
    loadDefaults: { endpoint: '/api/sec/8/defaults', label: 'Load default vendors (6)' },
    fields: [{ name: 'name', label: 'Vendor Name' }],
  },
};

const DynamicSectionPage = () => {
  const { num } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [loadingDefaults, setLoadingDefaults] = useState(false);

  const config = SECTION_CONFIG[num];
  const apiUrl = `/api/sec/${num}`;

  const loadDefaults = async () => {
    if (!config?.loadDefaults) return;
    if (!window.confirm(`Load defaults for ${config.title}? This replaces current content.`)) {
      return;
    }
    setLoadingDefaults(true);
    const loadingToast = toast.loading('Loading defaults...');
    try {
      const { data: defaults } = await axios.get(config.loadDefaults.endpoint);
      await axios.put(apiUrl, { replaceAll: true, content: defaults });
      toast.success('Defaults loaded!', { id: loadingToast });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      toast.error('Failed: ' + (err.response?.data?.message || err.message), {
        id: loadingToast,
      });
    } finally {
      setLoadingDefaults(false);
    }
  };

  if (!config) {
    return (
      <div className="p-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-gray-900">Unknown section</h2>
        <p className="text-gray-500 mt-2">
          No admin page configured for section {num}. Check the sidebar routes.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.4em] mb-2">
            Local Management
          </p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">{config.title}</h2>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            Route: /section/{num} → API: /api/sec/{num}
            {config.hint && ` — ${config.hint}`}
          </p>
        </div>

        {config.loadDefaults && (
          <button
            type="button"
            onClick={loadDefaults}
            disabled={loadingDefaults}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50"
          >
            {loadingDefaults ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Download size={20} />
            )}
            {config.loadDefaults.label}
          </button>
        )}
      </div>

      {config.type === 'capabilities' && (
        <CapabilitiesEditor key={`sec-${num}-${refreshKey}`} />
      )}

      {config.type === 'single' && (
        <SingleSectionManager
          key={`sec-${num}-${refreshKey}`}
          apiUrl={apiUrl}
          title={config.title}
          fields={config.fields}
        />
      )}

      {config.type === 'list' && (
        <UniversalManager
          key={`sec-${num}-${refreshKey}`}
          title={`Manage ${config.title}`}
          fields={config.fields}
          customPath={apiUrl}
        />
      )}
    </div>
  );
};

export default DynamicSectionPage;
