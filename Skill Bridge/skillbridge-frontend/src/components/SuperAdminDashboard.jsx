import SuperAdminOverview from './SuperAdminOverview';
import React, { useState } from 'react';
import SuperAdminPartners from './SuperAdminPartners';
import Settings from './Settings';

const SuperAdminDashboard = ({ onLogout }) => {
  // Super Admin has its own activeTab state, defaulting to the partner screen
  const [activeTab, setActiveTab] = useState('partners');

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Super Admin Top Navbar (Dark Mode to look distinct) */}
      <header className="bg-black border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white font-bold">⚙️</div>
          <h1 className="text-xl font-bold text-white">SkillBridge Core</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="bg-slate-800 text-slate-300 text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-700">
            Super Admin
          </span>
          
          <button 
            onClick={onLogout}
            className="text-sm font-semibold text-red-400 hover:text-red-300 bg-red-900/30 hover:bg-red-900/50 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        
        {/* Super Admin Sidebar */}
        <aside className="w-64 border-r border-slate-800 p-6 hidden md:block sticky top-20 h-[calc(100vh-5rem)]">
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2 text-white">
              <div className="w-7 h-7 bg-slate-700 rounded-lg flex items-center justify-center text-xs font-bold">🛡️</div>
              <div>
                <h2 className="font-bold text-sm">Master Control</h2>
                <p className="text-[10px] text-slate-400">Platform Management</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'System Overview', icon: '🌍' },
                { id: 'partners', label: 'Partner Management', icon: '🏢' },
                { id: 'settings', label: 'Security & Settings', icon: '⚙️' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                    activeTab === item.id ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Super Admin Content area */}
        <main className="flex-1 p-6 md:p-8 bg-slate-50 rounded-tl-3xl shadow-2xl overflow-y-auto mt-2 ml-2">
          {activeTab === 'dashboard' && (
            <div className="flex items-center justify-center h-64 text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-sm">
              System Overview Module - Dashboard Stats Go Here
            </div>
          )}
          {/* This is where the magic happens! */}
          {activeTab === 'partners' && <SuperAdminPartners />}
          {activeTab === 'settings' && <Settings role="superadmin" />}
          {activeTab === 'dashboard' && <SuperAdminOverview />}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
