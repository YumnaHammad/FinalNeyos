import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Edit2, Eye, Trash2, Plus, X, Save, Loader2, Search } from 'lucide-react';
import { uploadImageFile, resolveMediaUrl } from '../../lib/api';

const UniversalManager = ({ page, sectionName, title, fields, customPath, isCollection }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  const apiUrl = customPath || `/api/sections/${page}/${sectionName}`;

  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const emptyForm = () =>
    fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});

  useEffect(() => {
    fetchItems();
  }, [page, sectionName, customPath]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apiUrl);

      if (res.data?.content && Array.isArray(res.data.content)) {
        setItems(res.data.content);
      } else {
        setItems(Array.isArray(res.data) ? res.data : res.data ? [res.data] : []);
      }

      toast.success(`${title} Synced`, { id: 'load' });
    } catch (err) {
      setItems([]);
      toast.error(`Failed to load: ${err.response?.status === 404 ? 'API not found — restart backend' : err.message}`, { id: 'load' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setFormData(item ? { ...item } : emptyForm());
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    const loadingToast = toast.loading('Saving changes...');
    try {
      if (isCollection) {
        if (modalMode === 'edit') {
          await axios.put(`${apiUrl}/${formData._id}`, formData, { headers: authHeaders() });
        } else {
          await axios.post(apiUrl, formData, { headers: authHeaders() });
        }
      } else {
        await axios.put(apiUrl, formData, { headers: authHeaders() });
      }

      toast.success('Changes Committed!', { id: loadingToast });
      setModalMode(null);
      fetchItems();
    } catch (err) {
      toast.error('Save Failed: ' + (err.response?.data?.message || err.message), {
        id: loadingToast,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    const loadingToast = toast.loading('Deleting...');
    try {
      if (isCollection) {
        await axios.delete(`${apiUrl}/${deleteTarget.id}`, { headers: authHeaders() });
      } else {
        await axios.delete(apiUrl, {
          headers: authHeaders(),
          data: {
            id: deleteTarget.id || null,
            index: deleteTarget.index,
          },
        });
      }

      toast.success('Deleted Successfully!', { id: loadingToast });
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      toast.error('Delete Failed: ' + (err.response?.data?.message || err.message), {
        id: loadingToast,
      });
    }
  };

  const filteredItems = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayTitle = (item) => item.name || item.head || item.title || 'Untitled Record';
  const displaySubtitle = (item) =>
    item.desc || item.description || item.subtitle || (item.image ? 'Image configured' : 'No additional details available.');

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Synchronizing Data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
    >
      <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h3>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Manage your {title.toLowerCase()} repository here.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#006071]/20 outline-none transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => handleOpenModal('add')}
            className="bg-[#006071] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#004d5a] transition-all shadow-lg shadow-[#006071]/20 font-bold text-sm"
          >
            <Plus size={18} /> Create New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                Record Info
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-8 py-16 text-center text-gray-400 font-medium">
                  No records yet. Click &quot;Create New&quot; to add one.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, idx) => (
                <motion.tr
                  key={item._id || item.id || idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/80 transition-all group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#006071]/5 flex items-center justify-center text-[#006071] font-black text-xl overflow-hidden border border-gray-100/50">
                        {item.logo || item.image ? (
                          <img
                            src={resolveMediaUrl(item.logo || item.image)}
                            alt={displayTitle(item)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          displayTitle(item)[0].toUpperCase()
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-lg group-hover:text-[#006071] transition-colors">
                          {displayTitle(item)}
                        </h4>
                        <p className="text-gray-400 text-sm font-medium line-clamp-1">{displaySubtitle(item)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                      Live on Web
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button
                        type="button"
                        onClick={() => handleOpenModal('view', item)}
                        className="p-2.5 bg-white text-gray-400 hover:text-blue-600 hover:shadow-lg rounded-xl border border-gray-100 transition-all"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenModal('edit', item)}
                        className="p-2.5 bg-white text-gray-400 hover:text-[#006071] hover:shadow-lg rounded-xl border border-gray-100 transition-all"
                        title="Edit Content"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            id: item._id ? item._id.toString() : item.id ? item.id.toString() : null,
                            index: idx,
                          })
                        }
                        className="p-2.5 bg-white text-gray-400 hover:text-rose-600 hover:shadow-lg rounded-xl border border-gray-100 transition-all"
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalMode(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden relative z-10 flex flex-col max-h-full"
            >
              <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div>
                  <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
                    Editor Mode
                  </p>
                  <h4 className="text-3xl font-black text-gray-900">
                    {modalMode === 'view'
                      ? 'Reviewing Entry'
                      : modalMode === 'edit'
                        ? 'Update Content'
                        : 'New Stored Entry'}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="p-3 bg-white text-gray-400 hover:text-gray-900 rounded-2xl shadow-sm border border-gray-100 transition-all"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-12 space-y-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {fields.map((field) => (
                    <div
                      key={field.name}
                      className={`space-y-3 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                    >
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          disabled={modalMode === 'view'}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-[#006071]/30 transition-all font-medium disabled:bg-gray-100/50"
                          rows={4}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            disabled={modalMode === 'view'}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-[#006071]/30 transition-all font-medium disabled:bg-gray-100/50"
                            placeholder={`Enter ${field.label.toLowerCase()}...`}
                          />
                          {(field.name === 'image' || field.name === 'logo') && modalMode !== 'view' && (
                            <div className="flex items-center gap-4 mt-2">
                              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl cursor-pointer transition-all text-xs font-bold border border-gray-200">
                                <Plus size={14} /> Upload Image File
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    e.target.value = '';
                                    const uploadToast = toast.loading('Uploading image...');
                                    try {
                                      const url = await uploadImageFile(file);
                                      setFormData((prev) => ({ ...prev, [field.name]: url }));
                                      toast.success('Uploaded successfully!', { id: uploadToast });
                                    } catch (err) {
                                      toast.error(
                                        'Upload failed: ' + (err.response?.data?.message || err.message),
                                        { id: uploadToast }
                                      );
                                    }
                                  }}
                                />
                              </label>
                              {formData[field.name] && (
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] text-gray-400 font-bold">Preview:</span>
                                  <img
                                    src={resolveMediaUrl(formData[field.name])}
                                    className="h-16 w-24 object-cover border border-gray-200 rounded-lg bg-white shadow-sm"
                                    alt="Preview"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {modalMode !== 'view' && (
                  <div className="pt-10 flex gap-6">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-[2] bg-[#006071] text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-[#004d5a] transition-all shadow-2xl shadow-[#006071]/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="animate-spin" size={24} /> Processing...
                        </>
                      ) : (
                        <>
                          <Save size={24} /> Commit Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalMode(null)}
                      className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-[1.5rem] font-black hover:bg-gray-200 transition-all"
                    >
                      Discard
                    </button>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget !== null && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md w-full relative z-10 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                <Trash2 size={40} />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-gray-900">Are you sure?</h4>
                <p className="text-gray-500 font-medium">
                  This action cannot be undone. This record will be permanently removed from the website.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UniversalManager;
