import React, { useState, useEffect } from 'react';

const SuperAdminPartners = () => {
  const [activeTab, setActiveTab] = useState('institutions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleType, setRoleType] = useState('institution');

  // Fetch real partners from your Python FastAPI backend on Render
  const fetchPartners = () => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/superadmin/partners')
      .then(res => res.json())
      .then(data => {
        setPartners(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback mock data if backend request fails
        setPartners([
          { name: "Vel Tech Engineering College", email: "admin@veltech.edu", role: "institution" },
          { name: "TechNova Solutions", email: "hr@technova.com", role: "company" }
        ]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Handle creating a new partner account via the backend API
  const handleCreatePartner = (e) => {
    e.preventDefault();
    
    fetch('https://skillbridge-api-vslj.onrender.com/api/superadmin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: roleType
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to create partner account");
      return res.json();
    })
    .then(data => {
      alert(data.message || "Partner account created successfully!");
      setShowAddModal(false);
      // Clear inputs
      setName('');
      setEmail('');
      setPassword('');
      // Refresh the list
      fetchPartners();
    })
    .catch(err => {
      alert("Error creating account. Email may already be registered.");
    });
  };

  // Filter partners based on the active tab (institution or company)
  const displayedPartners = partners.filter(p => p.role.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 to-black rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-700">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            System Administration
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Partner Management</h2>
          <p className="text-sm text-slate-400 mt-1">Manage and provision access for Institutions and Industry Partners.</p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm border border-blue-500 cursor-pointer"
        >
          + Provision New Partner
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('institutions')}
          className={`px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'institutions' 
              ? 'text-slate-900 border-b-2 border-slate-900' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Registered Institutions
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'company' 
              ? 'text-slate-900 border-b-2 border-slate-900' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Industry Partners
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Organization Name</th>
                <th className="p-4">Admin Email</th>
                <th className="p-4">Role Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-slate-500 font-medium">Loading database records...</td>
                </tr>
              ) : displayedPartners.length > 0 ? (
                displayedPartners.map((partner, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition duration-150">
                    <td className="p-4">
                      <p className="text-sm font-bold text-slate-800">{partner.name}</p>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">{partner.email}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                        {partner.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-bold transition cursor-pointer">Manage</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">No partners found in this category. Click "+ Provision New Partner" to add one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-up Modal for adding a partner */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Provision New Partner</h3>
            <form className="space-y-4" onSubmit={handleCreatePartner}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SRM Institute"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@srm.edu"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Temporary Password</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partner Type</label>
                <select 
                  value={roleType}
                  onChange={(e) => setRoleType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                >
                  <option value="institution">Institution</option>
                  <option value="company">Company</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm cursor-pointer">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminPartners;
