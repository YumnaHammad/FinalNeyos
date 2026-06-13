import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Loader2, Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';
import { api, resolveMediaUrl, uploadImageFile } from '../lib/api';

const EMPTY = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  year: new Date().getFullYear(),
  productLine: '',
  topic: '',
  isPublished: true,
  publishedAt: new Date().toISOString().slice(0, 10),
  sortOrder: 0,
};

export default function NewsSettings() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ productLines: [], topics: [] });
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
      const [newsRes, metaRes] = await Promise.all([
        api.get('/news', { params: { admin: 1, limit: 100 } }),
        api.get('/news/meta'),
      ]);
      setItems(newsRes.data.items || newsRes.data || []);
      setMeta(metaRes.data || { productLines: [], topics: [] });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load news');
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
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      image: item.image || '',
      year: item.year || new Date().getFullYear(),
      productLine: item.productLine || '',
      topic: item.topic || '',
      isPublished: item.isPublished !== false,
      publishedAt: item.publishedAt
        ? new Date(item.publishedAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      sortOrder: item.sortOrder || 0,
    });
    setEditorOpen(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post('/news/seed');
      toast.success('Sample news loaded');
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
        year: Number(form.year),
        publishedAt: form.publishedAt ? new Date(form.publishedAt) : new Date(),
      };
      if (editId) {
        await api.put(`/news/${editId}`, payload);
        toast.success('News updated');
      } else {
        await api.post('/news', payload);
        toast.success('News created');
      }
      setEditorOpen(false);
      loadAll();
    } catch (err) {
      const status = err.response?.status;
      let msg = err.response?.data?.message || err.message || 'Save failed';
      if (status === 404) msg = 'News API not found. Restart backend (npm run dev in backend folder).';
      else if (!err.response) msg = 'Cannot reach API. Start backend on port 5000.';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news article?')) return;
    try {
      await api.delete(`/news/${id}`);
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

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">Company</p>
          <h1 className="text-3xl font-black text-gray-900">News Management</h1>
          <p className="text-gray-500 mt-1">
            Manage news articles on <code>/company/news</code>.
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
            Load Sample News
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#004d5a]"
          >
            <Plus size={16} />
            New Article
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
                  <th className="px-4 py-3">Article</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Filters</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                      No news yet. Click Load Sample News or create a new article.
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
                            <p className="text-xs text-gray-400">/{item.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold">{item.year}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">
                        {item.productLine && <div>{item.productLine}</div>}
                        {item.topic && <div className="text-gray-400">{item.topic}</div>}
                      </td>
                      <td className="px-4 py-3">
                        {item.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                            <Eye size={14} /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-bold">
                            <EyeOff size={14} /> Draft
                          </span>
                        )}
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
              <h2 className="text-lg font-black">{editId ? 'Edit News' : 'New News Article'}</h2>
              <button type="button" onClick={() => setEditorOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Title *</span>
                  <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Slug</span>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Excerpt</span>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Content (HTML)</span>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm font-mono text-xs" />
              </label>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase">Featured Image</span>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  {form.image && <img src={resolveMediaUrl(form.image)} alt="" className="h-16 rounded-lg object-cover" />}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Year</span>
                  <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Publish Date</span>
                  <input type="date" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm" />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Product Line</span>
                  <select value={form.productLine} onChange={(e) => setForm({ ...form, productLine: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm">
                    <option value="">Select…</option>
                    {meta.productLines.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Topic</span>
                  <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm">
                    <option value="">Select…</option>
                    {meta.topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                  <span className="text-sm font-semibold">Published</span>
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button type="button" onClick={() => setEditorOpen(false)} className="px-4 py-2 rounded-xl border font-bold text-sm">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
