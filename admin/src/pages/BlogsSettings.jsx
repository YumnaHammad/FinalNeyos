import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Download,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  X,
  Save,
} from 'lucide-react';
import { api, resolveMediaUrl, uploadImageFile } from '../lib/api';

const EMPTY_POST = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  categories: [],
  isFeatured: false,
  isPublished: true,
  publishedAt: new Date().toISOString().slice(0, 10),
  sortOrder: 0,
};

export default function BlogsSettings() {
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_POST);
  const [editId, setEditId] = useState(null);
  const [newCategory, setNewCategory] = useState('');

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        api.get('/blogs', { params: { admin: 1, limit: 100 } }),
        api.get('/blogs/categories/list'),
      ]);
      setPosts(postsRes.data.items || postsRes.data || []);
      setCategories(Array.isArray(catsRes.data) ? catsRes.data : []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const categoryNames = useMemo(
    () => categories.map((c) => c.name).filter(Boolean),
    [categories]
  );

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_POST);
    setEditorOpen(true);
  };

  const openEdit = (post) => {
    setEditId(post._id);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      image: post.image || '',
      categories: post.categories || [],
      isFeatured: !!post.isFeatured,
      isPublished: post.isPublished !== false,
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      sortOrder: post.sortOrder || 0,
    });
    setEditorOpen(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await api.post('/blogs/seed');
      toast.success('Sample blogs loaded');
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
        publishedAt: form.publishedAt ? new Date(form.publishedAt) : new Date(),
      };
      if (editId) {
        await api.put(`/blogs/${editId}`, payload);
        toast.success('Blog updated');
      } else {
        await api.post('/blogs', payload);
        toast.success('Blog created');
      }
      setEditorOpen(false);
      loadAll();
    } catch (err) {
      const status = err.response?.status;
      let msg = err.response?.data?.message || err.message || 'Save failed';
      if (status === 404) {
        msg = 'Blog API not found. Restart the backend: npm run dev in the backend folder.';
      } else if (!err.response) {
        msg = 'Cannot reach the API. Make sure the backend is running on port 5000.';
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
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

  const toggleCategory = (name) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(name)
        ? prev.categories.filter((c) => c !== name)
        : [...prev.categories, name],
    }));
  };

  const addCategory = async () => {
    const name = newCategory.trim();
    if (!name) return;
    try {
      await api.post('/blogs/categories', { name });
      setNewCategory('');
      toast.success('Category added');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add category');
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/blogs/categories/${id}`);
      toast.success('Category deleted');
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
            Company
          </p>
          <h1 className="text-3xl font-black text-gray-900">Blog Management</h1>
          <p className="text-gray-500 mt-1">
            Create and manage blog posts shown on <code>/company/blog</code>.
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
            Load Sample Blogs
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#004d5a]"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        {['posts', 'categories'].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2 font-bold text-sm capitalize border-b-2 -mb-px ${
              tab === key
                ? 'border-[#006071] text-[#006071]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#006071]" size={32} />
        </div>
      ) : tab === 'categories' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm"
            >
              Add
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <li key={cat._id || cat.id} className="flex items-center justify-between py-3">
                <span className="font-semibold text-gray-800">{cat.name}</span>
                <button
                  type="button"
                  onClick={() => deleteCategory(cat._id || cat.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Post</th>
                  <th className="px-4 py-3">Categories</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-gray-500">
                      No posts yet. Click &quot;Load Sample Blogs&quot; or create a new post.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50/80">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {post.image ? (
                            <img
                              src={resolveMediaUrl(post.image)}
                              alt=""
                              className="w-14 h-10 object-cover rounded-lg bg-gray-100"
                            />
                          ) : (
                            <div className="w-14 h-10 rounded-lg bg-gray-100" />
                          )}
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                            <p className="text-xs text-gray-400">/{post.slug}</p>
                          </div>
                          {post.isFeatured && (
                            <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(post.categories || []).map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded-full bg-[#006071]/10 text-[#006071] text-xs font-semibold"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {post.isPublished ? (
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
                          <button
                            type="button"
                            onClick={() => openEdit(post)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(post._id)}
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
        </div>
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">
                {editId ? 'Edit Blog Post' : 'New Blog Post'}
              </h2>
              <button type="button" onClick={() => setEditorOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Title *</span>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Slug</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-from-title"
                    className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Excerpt</span>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-gray-500 uppercase">Content (HTML)</span>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={8}
                  className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-xs"
                />
              </label>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase">Featured Image</span>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  {form.image && (
                    <img src={resolveMediaUrl(form.image)} alt="" className="h-16 rounded-lg object-cover" />
                  )}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase">Categories</span>
                {categoryNames.length === 0 ? (
                  <p className="mt-2 text-sm text-amber-600">
                    No categories yet. Add them under the Categories tab or click Load Sample Blogs.
                  </p>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categoryNames.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleCategory(name)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          form.categories.includes(name)
                            ? 'bg-[#006071] text-white border-[#006071]'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-500 uppercase">Publish Date</span>
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                    className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  />
                  <span className="text-sm font-semibold">Featured hero post</span>
                </label>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  />
                  <span className="text-sm font-semibold">Published</span>
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-[#006071] text-white font-bold text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
