import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Loader2, Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';
import { api, resolveMediaUrl, uploadImageFile } from '../lib/api';

const EMPTY = {
  title: '',
  image: '',
  dateDisplay: '',
  startDate: '',
  endDate: '',
  location: '',
  booth: '',
  category: 'IoT',
  registrationUrl: '',
  status: 'register',
  isPublished: true,
  sortOrder: 0,
};

export default function EventsSettings() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['IoT', 'CCTV']);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [eventsRes, metaRes] = await Promise.all([
        api.get('/events', { params: { admin: 1 } }),
        api.get('/events/meta'),
      ]);
      setItems(Array.isArray(eventsRes.data) ? eventsRes.data : eventsRes.data.items || []);
      setCategories(metaRes.data?.categories || ['IoT', 'CCTV']);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY);
    setEditorOpen(true);
  };

  const openEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title || '',
      image: item.image || '',
      dateDisplay: item.dateDisplay || '',
      startDate: item.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : '',
      location: item.location || '',
      booth: item.booth || '',
      category: item.category || 'IoT',
      registrationUrl: item.registrationUrl || '',
      status: item.status || 'register',
      isPublished: item.isPublished !== false,
      sortOrder: item.sortOrder || 0,
    });
    setEditorOpen(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post('/events/seed');
      toast.success('Sample events loaded');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        sortOrder: Number(form.sortOrder) || 0,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      };
      if (editId) {
        await api.put(`/events/${editId}`, payload);
        toast.success('Event updated');
      } else {
        await api.post('/events', payload);
        toast.success('Event created');
      }
      setEditorOpen(false);
      loadAll();
    } catch (err) {
      const status = err.response?.status;
      let msg = err.response?.data?.message || err.message || 'Save failed';
      if (status === 404) msg = 'Events API not found. Restart backend (npm run dev in backend folder).';
      else if (!err.response) msg = 'Cannot reach API. Start backend on port 5000.';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success('Deleted');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      setForm((prev) => ({ ...prev, image: url }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const statusLabel = (s) => {
    if (s === 'ended') return 'Ended';
    if (s === 'coming_soon') return 'Coming Soon';
    return 'Register';
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">Company</p>
          <h1 className="text-3xl font-black text-gray-900">Events Management</h1>
          <p className="text-gray-500 mt-1">
            Manage events on <code>/company/events</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2.5 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm flex items-center gap-2 hover:bg-[#006071]/5 disabled:opacity-50"
          >
            {seeding ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            Load Sample Events
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#004d5a]"
          >
            <Plus size={16} />
            New Event
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#006071]" size={32} />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                      No events yet. Click Load Sample Events or create a new one.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img src={resolveMediaUrl(item.image)} alt="" className="w-16 h-10 object-cover rounded-lg" />
                          ) : (
                            <div className="w-16 h-10 rounded-lg bg-gray-100" />
                          )}
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                            <p className="text-xs text-gray-400 line-clamp-1">{item.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs">{item.dateDisplay || '—'}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold text-[#006071]">{item.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <span className="text-xs font-bold">{statusLabel(item.status)}</span>
                          {item.isPublished ? (
                            <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                              <Eye size={12} /> Published
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-400 text-[10px] font-bold">
                              <EyeOff size={12} /> Draft
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button type="button" onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-gray-100">
                            <Pencil size={16} />
                          </button>
                          <button type="button" onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-rose-50 text-rose-500">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-black">{editId ? 'Edit Event' : 'New Event'}</h2>
              <button type="button" onClick={() => setEditorOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Title *</span>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
              </label>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase">Event Logo / Image</span>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  {form.image && <img src={resolveMediaUrl(form.image)} alt="" className="h-16 rounded-lg object-cover" />}
                </div>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Date Display</span>
                <input type="text" placeholder="e.g. Sept 4 - 6, 2025" value={form.dateDisplay} onChange={(e) => setForm({ ...form, dateDisplay: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Start Date</span>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">End Date</span>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Location</span>
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Booth</span>
                  <input type="text" value={form.booth} onChange={(e) => setForm({ ...form, booth: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Category</span>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm">
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Registration URL</span>
                <input type="url" value={form.registrationUrl} onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Status</span>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm">
                    <option value="register">Register Now</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="ended">Ended</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Sort Order</span>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                <span className="text-sm font-semibold">Published</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button type="button" onClick={() => setEditorOpen(false)} className="px-4 py-2 rounded-xl border font-bold text-sm">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
