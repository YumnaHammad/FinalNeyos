import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Loader2,
  Mail,
  Trash2,
  X,
  CheckCircle,
  Circle,
  MessageSquare,
} from 'lucide-react';
import { api } from '../lib/api';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{value}</p>
    </div>
  );
}

export default function SalesInquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/sales-inquiries');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const openDetail = async (item) => {
    setSelected(item);
    if (item.status === 'new') {
      try {
        await api.patch(`/sales-inquiries/${item._id}`, { status: 'read' });
        setItems((prev) =>
          prev.map((row) => (row._id === item._id ? { ...row, status: 'read' } : row))
        );
        setSelected({ ...item, status: 'read' });
      } catch {
        /* keep modal open */
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/sales-inquiries/${id}`);
      toast.success('Deleted');
      setSelected(null);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const unreadCount = items.filter((i) => i.status === 'new').length;

  return (
    <div className="p-8 lg:p-12 max-w-[1400px] mx-auto space-y-6">
      <div>
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Leads
        </p>
        <h1 className="text-3xl font-black text-gray-900">Sales Inquiries</h1>
        <p className="text-gray-500 mt-1">
          Submissions from the website Contact Sales form appear here in real time.
          {unreadCount > 0 && (
            <span className="ml-2 text-[#006071] font-bold">{unreadCount} new</span>
          )}
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
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No sales inquiries yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => openDetail(item)}
                    className={`cursor-pointer hover:bg-gray-50/80 ${
                      item.status === 'new' ? 'bg-[#006071]/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{item.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.productModel || item.productTitle
                        ? `${item.productModel || ''}${item.productTitle ? ` — ${item.productTitle}` : ''}`
                        : 'General inquiry'}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {[item.city, item.country].filter(Boolean).join(', ')}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold ${
                          item.status === 'new' ? 'text-[#006071]' : 'text-gray-400'
                        }`}
                      >
                        {item.status === 'new' ? <Circle size={8} fill="currentColor" /> : null}
                        {item.status === 'new' ? 'New' : 'Read'}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <MessageSquare size={20} className="text-[#006071]" />
                <h2 className="text-lg font-black">Inquiry Details</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <DetailRow label="Name" value={`${selected.firstName} ${selected.lastName}`} />
                <DetailRow label="Email" value={selected.email} />
                <DetailRow label="Phone" value={selected.phone} />
                <DetailRow label="User type" value={selected.userType} />
                <DetailRow
                  label="Product"
                  value={
                    selected.productModel || selected.productTitle
                      ? `${selected.productModel || ''}${selected.productTitle ? ` — ${selected.productTitle}` : ''}`
                      : 'General inquiry'
                  }
                />
                <DetailRow
                  label="Vendor"
                  value={selected.vendorId?.name || selected.vendorId?.company || '—'}
                />
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Message
                </p>
                <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t">
                <DetailRow
                  label="Location"
                  value={[selected.city, selected.province, selected.country, selected.postcode]
                    .filter(Boolean)
                    .join(', ')}
                />
                {selected.userType === 'business' && (
                  <>
                    <DetailRow label="Company" value={selected.companyName} />
                    <DetailRow label="Business role" value={selected.businessRole} />
                    <DetailRow label="Industry" value={selected.industry} />
                    <DetailRow label="Job title" value={selected.jobTitle} />
                  </>
                )}
                <DetailRow label="Newsletter" value={selected.subscribe ? 'Yes' : 'No'} />
                <DetailRow label="Submitted" value={formatDate(selected.createdAt)} />
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-between gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm hover:bg-gray-50"
              >
                <Mail size={16} />
                Reply by email
              </a>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selected._id)}
                  className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 font-bold text-sm flex items-center gap-2 hover:bg-rose-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
