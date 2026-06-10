import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Save, Loader2, Plus, Edit2, Trash2, X, Download } from 'lucide-react';
import { uploadImageFile, resolveMediaUrl } from '../../lib/api';

const API_SEC = '/api/sec/7';

const emptyCard = () => ({
  title: '',
  frontImage: '',
  frontHint: 'Hover to see details',
  bulletPoints: [''],
});

const CapabilitiesEditor = () => {
  const [meta, setMeta] = useState({
    tag: 'Our Capabilities',
    title: 'Innovative IoT Solutions',
    subtitle: '',
  });
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadingDefaults, setLoadingDefaults] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyCard());

  const parseSection = (data) => {
    const content = data?.content;
    const block = Array.isArray(content)
      ? content.find((c) => c.kind === 'capabilities') || content[0]
      : content;
    if (block?.meta) setMeta(block.meta);
    if (Array.isArray(block?.cards)) {
      setCards(
        block.cards.map((c, i) => ({
          ...c,
          bulletPoints: normalizeBullets(c.bulletPoints),
        }))
      );
    }
  };

  const normalizeBullets = (points) => {
    if (!points) return [''];
    return points.map((p) =>
      typeof p === 'string' ? p : p.description || p.key || ''
    );
  };

  useEffect(() => {
    axios
      .get(API_SEC)
      .then((res) => parseSection(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setSaving(true);
    const t = toast.loading('Saving capabilities section...');
    try {
      const payload = {
        replaceAll: true,
        content: [
          {
            kind: 'capabilities',
            meta,
            cards: cards.map((c) => ({
              title: c.title,
              frontImage: c.frontImage,
              frontHint: c.frontHint || 'Hover to see details',
              bulletPoints: c.bulletPoints.filter((b) => b.trim()),
            })),
          },
        ],
      };
      await axios.put(API_SEC, payload);
      toast.success('Capabilities section saved!', { id: t });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message, { id: t });
    } finally {
      setSaving(false);
    }
  };

  const loadDefaults = async () => {
    if (!window.confirm('Load default capabilities data? This replaces current content.')) return;
    setLoadingDefaults(true);
    const t = toast.loading('Loading defaults...');
    try {
      const { data } = await axios.get(`${API_SEC}/defaults`);
      await axios.put(API_SEC, {
        replaceAll: true,
        content: [{ kind: 'capabilities', ...data }],
      });
      parseSection({ content: [{ kind: 'capabilities', ...data }] });
      toast.success('Defaults loaded!', { id: t });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message, { id: t });
    } finally {
      setLoadingDefaults(false);
    }
  };

  const openModal = (mode, card = null, index = null) => {
    setModal({ mode, index });
    if (card) {
      const bullets = normalizeBullets(card.bulletPoints);
      setForm({
        ...card,
        bulletPoints: bullets.length ? bullets : [''],
      });
    } else {
      setForm(emptyCard());
    }
  };

  const saveCard = () => {
    const cleaned = {
      ...form,
      bulletPoints: form.bulletPoints.map((b) => b.trim()).filter(Boolean),
    };
    if (!cleaned.title.trim()) {
      toast.error('Card title is required');
      return;
    }
    if (modal.mode === 'add') {
      setCards((prev) => [...prev, cleaned]);
    } else {
      setCards((prev) => prev.map((c, i) => (i === modal.index ? cleaned : c)));
    }
    setModal(null);
    toast.success('Card updated — click Save section to publish');
  };

  const deleteCard = (index) => {
    if (!window.confirm('Delete this card?')) return;
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    try {
      const url = await uploadImageFile(file);
      setForm((f) => ({ ...f, frontImage: url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-20 flex justify-center">
        <Loader2 className="animate-spin text-[#006071]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={loadDefaults}
          disabled={loadingDefaults}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 disabled:opacity-50"
        >
          {loadingDefaults ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
          Load default data (3 cards)
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/40">
          <h3 className="text-xl font-black text-gray-900">Section header</h3>
          <p className="text-sm text-gray-500 mt-1">Tag, title, and subtitle above the flip cards</p>
        </div>
        <div className="p-8 grid gap-6 max-w-3xl">
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Tag</label>
            <input
              className="w-full mt-2 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
              value={meta.tag}
              onChange={(e) => setMeta({ ...meta, tag: e.target.value })}
              placeholder="Our Capabilities"
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title</label>
            <input
              className="w-full mt-2 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
              value={meta.title}
              onChange={(e) => setMeta({ ...meta, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subtitle</label>
            <textarea
              rows={3}
              className="w-full mt-2 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#006071]/20"
              value={meta.subtitle}
              onChange={(e) => setMeta({ ...meta, subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="px-8 pb-4 flex justify-between items-center">
          <h3 className="text-xl font-black text-gray-900">Flip cards</h3>
          <button
            type="button"
            onClick={() => openModal('add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#006071] text-white rounded-xl text-sm font-bold"
          >
            <Plus size={16} /> Add card
          </button>
        </div>

        <div className="px-8 pb-8 space-y-4">
          {cards.length === 0 ? (
            <p className="text-gray-400 text-sm">No cards yet. Load defaults or add a card.</p>
          ) : (
            cards.map((card, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50/50"
              >
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {card.frontImage ? (
                    <img
                      src={resolveMediaUrl(card.frontImage)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{card.title}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {card.bulletPoints?.length || 0} bullet points
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openModal('edit', card, index)}
                  className="p-2 text-gray-400 hover:text-[#006071]"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteCard(index)}
                  className="p-2 text-gray-400 hover:text-rose-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-gray-50">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-4 bg-[#006071] text-white rounded-2xl font-black hover:bg-[#004d5a] disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save section to website
          </button>
        </div>
      </form>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h4 className="text-xl font-black">{modal.mode === 'add' ? 'New card' : 'Edit card'}</h4>
              <button type="button" onClick={() => setModal(null)}>
                <X />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">Front title</label>
                <input
                  className="w-full mt-1 p-3 bg-gray-50 rounded-xl"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">Front hint</label>
                <input
                  className="w-full mt-1 p-3 bg-gray-50 rounded-xl"
                  value={form.frontHint}
                  onChange={(e) => setForm({ ...form, frontHint: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">Background image</label>
                <input
                  className="w-full mt-1 p-3 bg-gray-50 rounded-xl"
                  value={form.frontImage}
                  onChange={(e) => setForm({ ...form, frontImage: e.target.value })}
                  placeholder="/uploads/... or https://..."
                />
                <label className="inline-flex mt-2 items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-xs font-bold cursor-pointer">
                  <Plus size={14} /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                {form.frontImage && (
                  <img
                    src={resolveMediaUrl(form.frontImage)}
                    alt=""
                    className="mt-2 h-24 w-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase">
                  Hover bullet points (one per line)
                </label>
                <textarea
                  rows={6}
                  className="w-full mt-1 p-3 bg-gray-50 rounded-xl font-mono text-sm"
                  value={form.bulletPoints.join('\n')}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bulletPoints: e.target.value.split('\n'),
                    })
                  }
                />
              </div>
              <button
                type="button"
                onClick={saveCard}
                className="w-full py-3 bg-[#006071] text-white rounded-xl font-bold"
              >
                {modal.mode === 'add' ? 'Add card' : 'Update card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapabilitiesEditor;
