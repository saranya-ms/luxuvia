import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { toast } from 'sonner';

const LOGO = 'https://customer-assets.emergentagent.com/job_luxuvia-dev/artifacts/gjc6gs38_luxuvia%20icon.png';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/admin/login', { username, password });
      localStorage.setItem('admin_token', res.data.token);
      toast.success('Logged in successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-base text-text-white min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#0f1628] border border-[#1e2d50] rounded-md p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={LOGO} alt="Luxuvia" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="font-heading text-3xl text-[#eef1f6]">Admin Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block font-body text-sm text-[#8090b0] mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              className="w-full bg-[#0a0e1a]/50 border-b-2 border-[#1e2d50] focus:border-[#f59218] px-1 py-3 outline-none transition-colors placeholder:text-[#3a4a6a] text-white font-body text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-body text-sm text-[#8090b0] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full bg-[#0a0e1a]/50 border-b-2 border-[#1e2d50] focus:border-[#f59218] px-1 py-3 outline-none transition-colors placeholder:text-[#3a4a6a] text-white font-body text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
