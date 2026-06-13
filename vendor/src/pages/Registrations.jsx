import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, UserCircle, X } from 'lucide-react';
import { api } from '../lib/api';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

function DetailRow({ label, value }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{String(value)}</p>
    </div>
  );
}

export default function Registrations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/vendors/registrations');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load registrations');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Users
        </p>
        <h1 className="text-3xl font-black text-gray-900">Registered Users</h1>
        <p className="text-gray-500 mt-1">
          Website sign-ups from Create Account. View only — contact admin to make changes.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#006071]" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No registered users yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => setSelected(item)}
                    className="cursor-pointer hover:bg-gray-50/80"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{item.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.companyName || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{item.country || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold ${item.isActive ? 'text-emerald-600' : 'text-gray-400'}`}
                      >
                        {item.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <UserCircle size={20} className="text-[#006071]" />
                <h2 className="text-lg font-black">User Details</h2>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-4">
              <DetailRow label="Name" value={`${selected.firstName} ${selected.lastName}`} />
              <DetailRow label="Email" value={selected.email} />
              <DetailRow label="Company" value={selected.companyName} />
              <DetailRow label="Type" value={selected.type} />
              <DetailRow label="Country" value={selected.country} />
              <DetailRow
                label="Partner Portal"
                value={
                  selected.partnerPortal === 'yes'
                    ? 'Yes'
                    : selected.partnerPortal === 'no'
                      ? 'No'
                      : '—'
                }
              />
              <DetailRow label="Newsletter" value={selected.subscribe ? 'Yes' : 'No'} />
              <DetailRow label="Status" value={selected.isActive ? 'Active' : 'Disabled'} />
              <DetailRow label="Registered" value={formatDate(selected.createdAt)} />
            </div>
            <div className="px-6 py-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
