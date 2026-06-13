import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({
  value,
  onChange,
  name,
  placeholder,
  required = false,
  autoComplete = 'current-password',
  className = 'mt-1 w-full border rounded-xl px-4 py-2.5 text-sm pr-11',
  leftIcon: LeftIcon = null,
}) {
  const [visible, setVisible] = useState(false);

  const inputClass = LeftIcon
    ? 'w-full pl-10 pr-11 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006071] focus:border-transparent outline-none'
    : className;

  return (
    <div className="relative">
      {LeftIcon && (
        <LeftIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      )}
      <input
        type={visible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={inputClass}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={visible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
