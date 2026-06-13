import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import AuthLayout from '../../components/Auth/AuthLayout';
import AuthPasswordInput, { AuthEmailInput } from '../../components/Auth/AuthFields';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      toast.success('Login successful! Redirecting…');
      localStorage.setItem('loggedIn', 'true');
      setTimeout(() => navigate('/'), 1200);
    } else {
      toast.error('Incorrect email or password');
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <AuthLayout
        alternateLink={{
          prefix: 'New to Nexyos?',
          label: 'Create Account',
          to: '/signup',
        }}
      >
        <h1 className="auth-page__title">Welcome</h1>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-field">
            <AuthEmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              showHint
            />
          </div>

          <div className="auth-field">
            <AuthPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-forgot">
            <Link to="/contact">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="auth-footer-link d-lg-none">
          New to Nexyos? <Link to="/signup">Create Account</Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Login;
