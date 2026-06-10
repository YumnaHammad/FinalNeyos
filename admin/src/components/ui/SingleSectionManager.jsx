import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Save, Loader2, Plus } from 'lucide-react';
import { uploadImageFile, resolveMediaUrl } from '../../lib/api';

const SingleSectionManager = ({ apiUrl, title, fields }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const normalizeItem = (item) => {
    const next = fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
    fields.forEach((f) => {
      if (f.name === 'title') {
        next.title = item.title || item.head || '';
      } else if (f.name === 'desc') {
        next.desc = item.desc || item.description || item.subtitle || '';
      } else if (f.name === 'image') {
        next.image = item.image || '';
      } else {
        next[f.name] = item[f.name] ?? '';
      }
    });
    return next;
  };

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setLoading(true);
        const res = await axios.get(apiUrl);
        const content = res.data?.content;
        const item = Array.isArray(content) ? content[0] : content;
        if (item && typeof item === 'object') {
          setFormData(normalizeItem(item));
        }
      } catch {
        // Section may not exist yet
      } finally {
        setLoading(false);
      }
    };
    fetchSection();
  }, [apiUrl]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const loadingToast = toast.loading('Saving section...');
    try {
      await axios.put(apiUrl, { replaceAll: true, content: [formData] });
      toast.success('Section saved!', { id: loadingToast });
    } catch (err) {
      toast.error('Save failed: ' + (err.response?.data?.message || err.message), {
        id: loadingToast,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    const uploadToast = toast.loading('Uploading image...');
    try {
      const url = await uploadImageFile(file);
      handleChange('image', url);
      toast.success('Image uploaded!', { id: uploadToast });
    } catch (err) {
      toast.error('Upload failed: ' + (err.response?.data?.message || err.message), {
        id: uploadToast,
      });
    }
  };

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 bg-gray-50/30">
        <h3 className="text-2xl font-black text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">
          Single block on the homepage — one background image, title, and description.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-10 space-y-8 max-w-3xl">
        {fields.map((field) => (
          <div key={field.name} className="space-y-3">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
                className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#006071]/30 font-medium"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <input
                type="text"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full p-5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#006071]/30 font-medium"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            )}
            {field.name === 'image' && (
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer text-xs font-bold border border-gray-200">
                  <Plus size={14} /> Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {formData.image && (
                  <img
                    src={resolveMediaUrl(formData.image)}
                    alt="Preview"
                    className="h-20 w-32 object-cover rounded-xl border border-gray-200"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#006071] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#004d5a] disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save section
        </button>
      </form>
    </div>
  );
};

export default SingleSectionManager;
