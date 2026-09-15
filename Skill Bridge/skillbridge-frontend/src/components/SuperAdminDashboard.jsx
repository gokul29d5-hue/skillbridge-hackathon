import React, { useState, useEffect } from 'react';

const SuperAdminDashboard = ({ onLogout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('institution');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Partner Management State
  const [partners, setPartners] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const fetchPartners = async () => {
    try {
      const res = await fetch('https://skillbridge-api-vslj.onrender.com/api/superadmin/partners');
      if (res.ok) setPartners(await res.json());
    } catch (err) {
      console.error("Failed to fetch partners");
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleCreatePartner = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage(''); setError('');

    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/superadmin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to create partner');

      setMessage(data.message);
      setName(''); setEmail(''); setPassword('');
      fetchPartners(); // Refresh list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePartner = async (partnerEmail) => {
    if (!window.confirm(`Are you sure you want to delete ${partnerEmail}? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`https://skillbridge-api-vslj.onrender.com/api/superadmin/partners/${partnerEmail}`, { method: 'DELETE' });
      if (res.ok) fetchPartners();
    } catch (err) {
      alert("Failed to delete partner");
    }
  };

  const handleUpdatePassword = async (partnerEmail) => {
    if (!newPassword) return alert("Please enter a new password");
    try {
      const res = await fetch(`https://skillbridge-api-vslj.onrender.com/api/superadmin/partners/${partnerEmail}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword })
      });
      if (res.ok) {
        alert("Password updated successfully!");
        setEditingEmail(null);
        setNewPassword('');
      } else {
        alert("Failed to update password");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <nav className="bg-slate-900 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">SA</div>
          <span className="text-xl font-bold text-white tracking-wide">SkillBridge Master Control</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-slate-300">System Administrator</span>
          <button onClick={onLogout} className="text-sm font-bold text-red-400 hover:text-red-300 bg-slate-800 px-4 py-2 rounded-lg transition cursor-pointer">Logout</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 space-y-8 mt-4">
        
        {/* Create Partner Form */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Generate Partner Credentials</h2>
          </div>
          {message && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold">{message}</div>}
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold">{error}</div>}

          <form onSubmit={handleCreatePartner} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Organization Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. SRM University" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Account Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-white">
                <option value="institution">Institution (College/University)</option>
                <option value="company">Company (Recruiter/Employer)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Official Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@college.edu" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Assign Initial Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" disabled={loading} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl text-sm transition shadow-md cursor-pointer disabled:opacity-50">
                {loading ? 'Provisioning Account...' : 'Create Partner Account'}
              </button>
            </div>
          </form>
        </section>

        {/* Manage Accounts Table */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Manage Partner Accounts</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="p-4 font-bold rounded-tl-lg">Organization</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold">Email (Login ID)</th>
                  <th className="p-4 font-bold rounded-tr-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {partners.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold text-slate-800">{p.name}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${p.role === 'company' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{p.email}</td>
                    <td className="p-4 text-right space-x-2">
                      {editingEmail === p.email ? (
                        <div className="flex justify-end items-center space-x-2">
                          <input 
                            type="password" 
                            placeholder="New Password" 
                            className="px-2 py-1 border border-slate-300 rounded text-xs outline-none focus:border-blue-500 w-32"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <button onClick={() => handleUpdatePassword(p.email)} className="bg-emerald-500 text-white px-3 py-1 rounded text-xs font-bold hover:bg-emerald-600">Save</button>
                          <button onClick={() => {setEditingEmail(null); setNewPassword('');}} className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs font-bold hover:bg-slate-300">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setEditingEmail(p.email)} className="text-blue-600 font-semibold text-xs hover:underline cursor-pointer">Edit Password</button>
                          <span className="text-slate-300">|</span>
                          <button onClick={() => handleDeletePartner(p.email)} className="text-red-600 font-semibold text-xs hover:underline cursor-pointer">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {partners.length === 0 && (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-500">No partners have been created yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default SuperAdminDashboard;
