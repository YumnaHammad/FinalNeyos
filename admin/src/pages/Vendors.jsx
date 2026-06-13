import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Loader2, Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { api } from '../lib/api';
import PasswordInput from '../components/ui/PasswordInput';

const EMPTY = {
  name: '',
  email: '',
  password: '',
  company: '',
  phone: '',
  country: '',
  isActive: true,
};

export default function Vendors() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/vendors');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load vendors');
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
      name: item.name || '',
      email: item.email || '',
      password: '',
      company: item.company || '',
      phone: item.phone || '',
      country: item.country || '',
      isActive: item.isActive !== false,
    });
    setEditorOpen(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post('/vendors/seed');
      toast.success(' vendor created (vendor@vendor.com / 123123)');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    if (!editId && !form.password.trim()) {
      toast.error('Password is required for new vendors');
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (editId && !payload.password) delete payload.password;
      if (editId) {
        await api.put(`/vendors/${editId}`, payload);
        toast.success('Vendor updated');
      } else {
        await api.post('/vendors', payload);
        toast.success('Vendor created');
      }
      setEditorOpen(false);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vendor account?')) return;
    try {
      await api.delete(`/vendors/${id}`);
      toast.success('Deleted');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
            Partners
          </p>
          <h1 className="text-3xl font-black text-gray-900">Vendors</h1>
          <p className="text-gray-500 mt-1">
            Manage vendor accounts for the separate Vendor Portal (
            <code>http://localhost:5175</code>).
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
            Create Demo Vendor
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#004d5a]"
          >
            <Plus size={16} />
            New Vendor
          </button>
        </div>
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
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                    No vendors yet. Create a demo vendor or add a new account.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/80">
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.company || '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold ${item.isActive ? 'text-emerald-600' : 'text-gray-400'}`}
                      >
                        {item.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-500"
                        >
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
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-black">{editId ? 'Edit Vendor' : 'New Vendor'}</h2>
              <button type="button" onClick={() => setEditorOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Name *</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Email *</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  Password {editId ? '(leave blank to keep)' : '*'}
                </span>
                <PasswordInput
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Company</span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
                />
              </label>
              <label className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                <span className="text-sm font-semibold">Active account</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button type="button" onClick={() => setEditorOpen(false)} className="px-4 py-2 rounded-xl border font-bold text-sm">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
