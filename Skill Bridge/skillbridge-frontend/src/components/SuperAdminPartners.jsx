import React, { useState } from 'react';

const SuperAdminPartners = () => {
  const [activeTab, setActiveTab] = useState('institutions');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock database of registered partners
  const partners = [
    { id: "INST-001", name: "Vel Tech Engineering College", type: "institution", email: "admin@veltech.edu", status: "Active", joined: "Aug 2026", users: 1248 },
    { id: "INST-002", name: "SRM Institute", type: "institution", email: "registrar@srm.edu", status: "Active", joined: "Jul 2026", users: 3400 },
    { id: "COMP-001", name: "TechNova Solutions", type: "company", email: "hr@technova.com", status: "Active", joined: "Sep 2026", activeListings: 4 },
    { id: "COMP-002", name: "Global Data Corp", type: "company", email: "talent@globaldata.com", status: "Pending Verification", joined: "Sep 2026", activeListings: 0 }
  ];

  const displayedPartners = partners.filter(p => p.type === activeTab);

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
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm border border-blue-500"
        >
          + Provision New Partner
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('institutions')}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === 'institutions' 
              ? 'text-slate-900 border-b-2 border-slate-900' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Registered Institutions
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
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
                <th className="p-4">Partner ID</th>
                <th className="p-4">Organization Name</th>
                <th className="p-4">Admin Email</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-slate-50 transition duration-150">
                  <td className="p-4 text-sm font-mono text-slate-500">{partner.id}</td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-slate-800">{partner.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Joined {partner.joined}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600">{partner.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      partner.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-red-600 transition mx-2">Sus</button>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-bold transition">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-up Modal for adding a partner (Hidden by default) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Provision New Partner</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("In production, this creates an account via your FastAPI backend."); setShowAddModal(false); }}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization Name</label>
                <input type="text" required className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email</label>
                <input type="email" required className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partner Type</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                  <option>Institution</option>
                  <option>Company</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-sm">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminPartners;
