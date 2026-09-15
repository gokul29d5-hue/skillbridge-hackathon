import React, { useState } from 'react';

const SuperAdminDashboard = ({ onLogout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('institution');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreatePartner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/superadmin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create partner account');
      }

      // Success! Clear form and show message
      setMessage(data.message);
      setName('');
      setEmail('');
      setPassword('');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Super Admin Navbar (Dark Mode to feel distinct) */}
      <nav className="bg-slate-900 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            SA
          </div>
          <span className="text-xl font-bold text-white tracking-wide">SkillBridge Master Control</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-300">System Administrator</span>
          <button
            onClick={onLogout}
            className="text-sm font-bold text-red-400 hover:text-red-300 bg-slate-800 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8 mt-8">
        
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-extrabold text-slate-800">Partner Management Console</h1>
          <p className="text-slate-500 font-medium">Provision official accounts for verified institutions and companies.</p>
        </div>

        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Generate Partner Credentials</h2>
            <p className="text-sm text-slate-500 mt-1">These credentials will allow the partner to access their dedicated portal.</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleCreatePartner} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Organization Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SRM University"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-white"
              >
                <option value="institution">Institution (College/University)</option>
                <option value="company">Company (Recruiter/Employer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Official Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.edu"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Assign Initial Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50"
              />
            </div>

            <div className="md:col-span-2 mt-4 border-t border-slate-100 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl text-sm transition shadow-md cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Provisioning Account...' : 'Create Partner Account'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
