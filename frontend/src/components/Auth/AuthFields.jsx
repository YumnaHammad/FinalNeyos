import { useState } from 'react';
import { Eye, EyeOff, HelpCircle } from 'lucide-react';

export default function AuthPasswordInput({
  value,
  onChange,
  placeholder = 'Password',
  id = 'password',
  required = true,
  autoComplete = 'current-password',
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-input-wrap">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="auth-input-icon"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export function AuthEmailInput({
  value,
  onChange,
  placeholder = 'OneNexyosID / Email',
  id = 'email',
  showHint = false,
}) {
  return (
    <div className="auth-input-wrap">
      <input
        id={id}
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        autoComplete="username"
      />
      {showHint && (
        <span className="auth-input-icon" style={{ cursor: 'default' }} title="Use your registered email or OneNexyosID">
          <HelpCircle size={18} />
        </span>
      )}
    </div>
  );
}
