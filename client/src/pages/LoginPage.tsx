import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../store/authStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      // Handled by store
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold font-heading text-center">LOGIN TO LUDO LEGENDS</h2>

        {error && <div className="p-3 bg-red-950 border border-red-800 text-red-300 text-xs rounded-lg">{error}</div>}

        <div>
          <label className="block text-xs text-slate-400 mb-2">EMAIL ADDRESS</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
          />
        </div>

        <Button variant="primary" isLoading={isLoading} className="w-full">
          SIGN IN
        </Button>
      </form>
    </div>
  );
};
