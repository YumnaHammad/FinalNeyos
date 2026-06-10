import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { uploadImageFile, resolveMediaUrl } from '../../lib/api';

const emptySubSub = () => ({ name: '', slug: '' });
const emptySub = () => ({ name: '', slug: '', image: '', subSubCategories: [] });

const emptyCategory = () => ({
  name: '',
  slug: '',
  description: '',
  image: '',
  sortOrder: 0,
  isActive: true,
  subCategories: [],
});

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const CategoriesManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState(emptyCategory());
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [expandedSub, setExpandedSub] = useState(0);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/categories');
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch {
      setItems([]);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setFormData(item ? { ...item, subCategories: item.subCategories || [] } : emptyCategory());
    setExpandedSub(0);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await axios.post('/api/categories/seed');
      toast.success('Default categories loaded');
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      slug: formData.slug || slugify(formData.name),
    };
    try {
      if (modalMode === 'edit') {
        await axios.put(`/api/categories/${formData._id}`, payload);
      } else {
        await axios.post('/api/categories', payload);
      }
      toast.success('Category saved');
      setModalMode(null);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`/api/categories/${deleteTarget}`);
      toast.success('Category deleted');
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const updateSub = (index, field, value) => {
    const subs = [...(formData.subCategories || [])];
    subs[index] = { ...subs[index], [field]: value };
    if (field === 'name' && !subs[index].slug) subs[index].slug = slugify(value);
    setFormData({ ...formData, subCategories: subs });
  };

  const addSub = () => {
    setFormData({
      ...formData,
      subCategories: [...(formData.subCategories || []), emptySub()],
    });
    setExpandedSub((formData.subCategories || []).length);
  };

  const removeSub = (index) => {
    const subs = [...(formData.subCategories || [])];
    subs.splice(index, 1);
    setFormData({ ...formData, subCategories: subs });
  };

  const addSubSub = (subIndex) => {
    const subs = [...(formData.subCategories || [])];
    subs[subIndex] = {
      ...subs[subIndex],
      subSubCategories: [...(subs[subIndex].subSubCategories || []), emptySubSub()],
    };
    setFormData({ ...formData, subCategories: subs });
  };

  const updateSubSub = (subIndex, sscIndex, field, value) => {
    const subs = [...(formData.subCategories || [])];
    const sscs = [...(subs[subIndex].subSubCategories || [])];
    sscs[sscIndex] = { ...sscs[sscIndex], [field]: value };
    if (field === 'name' && !sscs[sscIndex].slug) sscs[sscIndex].slug = slugify(value);
    subs[subIndex] = { ...subs[subIndex], subSubCategories: sscs };
    setFormData({ ...formData, subCategories: subs });
  };

  const removeSubSub = (subIndex, sscIndex) => {
    const subs = [...(formData.subCategories || [])];
    const sscs = [...(subs[subIndex].subSubCategories || [])];
    sscs.splice(sscIndex, 1);
    subs[subIndex] = { ...subs[subIndex], subSubCategories: sscs };
    setFormData({ ...formData, subCategories: subs });
  };

  const filtered = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading categories...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
    >
      <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">Catalogue</p>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Product Categories</h3>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Manage top-level categories, sub-categories and product families.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#006071]/20"
            />
          </div>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2.5 rounded-xl border border-[#006071]/30 text-[#006071] font-bold text-sm flex items-center gap-2 hover:bg-[#006071]/5 disabled:opacity-50"
          >
            {seeding ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            Load Defaults
          </button>
          <button
            type="button"
            onClick={() => handleOpenModal('add')}
            className="bg-[#006071] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#004d5a] font-bold text-sm shadow-lg shadow-[#006071]/20"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sub-categories</th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-16 text-center text-gray-400">
                  No categories yet. Click &quot;Load Defaults&quot; or &quot;Add Category&quot;.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/80 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#006071]/5 border border-gray-100 flex-shrink-0">
                        {item.image ? (
                          <img src={resolveMediaUrl(item.image)} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#006071] font-black text-xl">
                            {item.name?.[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-lg">{item.name}</h4>
                        <p className="text-gray-400 text-sm">/{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                      {(item.subCategories || []).length} sub-categories
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenModal('edit', item)}
                        className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-[#006071] hover:bg-white"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item._id)}
                        className="p-2.5 rounded-xl border border-gray-100 text-gray-400 hover:text-rose-600 hover:bg-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl"
              onClick={() => setModalMode(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h4 className="text-2xl font-black text-gray-900">
                  {modalMode === 'edit' ? 'Edit Category' : 'New Category'}
                </h4>
                <button type="button" onClick={() => setModalMode(null)} className="p-2 text-gray-400 hover:text-gray-900">
                  <X />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Name</label>
                    <input
                      required
                      value={formData.name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: formData.slug || slugify(e.target.value),
                        })
                      }
                      className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Slug</label>
                    <input
                      required
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                      className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category Image</label>
                  <div className="flex items-center gap-4">
                    <input
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Image URL or upload"
                      className="flex-1 p-4 bg-gray-50 rounded-xl outline-none"
                    />
                    <label className="px-4 py-3 bg-gray-100 rounded-xl cursor-pointer text-sm font-bold hover:bg-gray-200">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          e.target.value = '';
                          try {
                            const url = await uploadImageFile(file);
                            setFormData((prev) => ({ ...prev, image: url }));
                            toast.success('Image uploaded');
                          } catch {
                            toast.error('Upload failed');
                          }
                        }}
                      />
                    </label>
                  </div>
                  {formData.image && (
                    <img src={resolveMediaUrl(formData.image)} alt="" className="h-20 w-32 object-cover rounded-xl mt-2" />
                  )}
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-black text-gray-900">Sub-categories</h5>
                    <button type="button" onClick={addSub} className="text-[#006071] font-bold text-sm flex items-center gap-1">
                      <Plus size={16} /> Add Sub-category
                    </button>
                  </div>

                  {(formData.subCategories || []).map((sub, subIdx) => (
                    <div key={subIdx} className="mb-4 border border-gray-100 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedSub(expandedSub === subIdx ? -1 : subIdx)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                      >
                        <span className="font-bold text-gray-800">{sub.name || `Sub-category ${subIdx + 1}`}</span>
                        {expandedSub === subIdx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      {expandedSub === subIdx && (
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              placeholder="Sub-category name"
                              value={sub.name || ''}
                              onChange={(e) => updateSub(subIdx, 'name', e.target.value)}
                              className="p-3 bg-gray-50 rounded-xl text-sm"
                            />
                            <input
                              placeholder="Slug"
                              value={sub.slug || ''}
                              onChange={(e) => updateSub(subIdx, 'slug', e.target.value)}
                              className="p-3 bg-gray-50 rounded-xl text-sm"
                            />
                          </div>
                          <div className="space-y-2 pl-4 border-l-2 border-[#006071]/20">
                            <p className="text-xs font-black text-gray-400 uppercase">Product families</p>
                            {(sub.subSubCategories || []).map((ssc, sscIdx) => (
                              <div key={sscIdx} className="flex gap-2">
                                <input
                                  placeholder="Name"
                                  value={ssc.name || ''}
                                  onChange={(e) => updateSubSub(subIdx, sscIdx, 'name', e.target.value)}
                                  className="flex-1 p-2 bg-gray-50 rounded-lg text-sm"
                                />
                                <input
                                  placeholder="Slug"
                                  value={ssc.slug || ''}
                                  onChange={(e) => updateSubSub(subIdx, sscIdx, 'slug', e.target.value)}
                                  className="flex-1 p-2 bg-gray-50 rounded-lg text-sm"
                                />
                                <button type="button" onClick={() => removeSubSub(subIdx, sscIdx)} className="text-rose-500 p-2">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => addSubSub(subIdx)}
                              className="text-xs font-bold text-[#006071]"
                            >
                              + Add product family
                            </button>
                          </div>
                          <button type="button" onClick={() => removeSub(subIdx)} className="text-rose-500 text-sm font-bold">
                            Remove sub-category
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#006071] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" /> : <Save />}
                  Save Category
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div className="absolute inset-0 bg-gray-900/60" onClick={() => setDeleteTarget(null)} />
            <motion.div className="bg-white rounded-2xl p-8 max-w-sm w-full relative z-10 text-center space-y-4">
              <h4 className="text-xl font-black">Delete category?</h4>
              <p className="text-gray-500 text-sm">This will remove the category and all nested sub-categories.</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">
                  Cancel
                </button>
                <button type="button" onClick={handleDelete} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoriesManager;
