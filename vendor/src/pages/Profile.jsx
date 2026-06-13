import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2, Save } from 'lucide-react';
import { api, getVendorSession, setVendorSession } from '../lib/api';
import PasswordInput from '../components/PasswordInput';

export default function Profile() {
  const session = getVendorSession();
  const [form, setForm] = useState({
    name: session?.name || '',
    company: session?.company || '',
    phone: session?.phone || '',
    country: session?.country || '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get('/vendors/me')
      .then((res) => {
        setForm((prev) => ({
          ...prev,
          name: res.data.name || '',
          company: res.data.company || '',
          phone: res.data.phone || '',
          country: res.data.country || '',
        }));
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        company: form.company,
        phone: form.phone,
        country: form.country,
      };
      if (form.password.trim()) payload.password = form.password;
      const res = await api.put('/vendors/me', payload);
      setVendorSession({ ...res.data, id: res.data.id || session?.id });
      toast.success('Profile updated');
      setForm((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-[#006071]" size={32} />
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-[640px] mx-auto">
      <div className="mb-8">
        <p className="text-[10px] font-black text-[#006071] uppercase tracking-[0.3em] mb-1">
          Account
        </p>
        <h1 className="text-3xl font-black text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Update your vendor account details.</p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4"
      >
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">Email</span>
          <input
            type="email"
            value={session?.email || ''}
            disabled
            className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">Name *</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">Company</span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">Country</span>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="mt-1 w-full border rounded-xl px-4 py-2.5 text-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-500 uppercase">New Password</span>
          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
            autoComplete="new-password"
            required={false}
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006071] text-white font-bold text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </form>
    </div>
  );
}
