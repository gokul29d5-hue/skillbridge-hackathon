import React, { useState, useEffect } from 'react';

const InstitutionDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/institution')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(() => {
        setData({ total_students: 1248, active_opportunities: 38, placed: 184, placement_rate: "84%" });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-slate-500 p-8 font-medium">Loading Institution Dashboard...</div>;

  return (
    <div className="flex gap-6">
      {/* Institution Specific Sidebar Navigation as requested */}
      <aside className="w-64 bg-white border border-slate-200 rounded-2xl p-4 hidden lg:block shadow-xs h-fit sticky top-24">
        <nav className="space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
            { id: 'students', label: 'Students', icon: '👤' },
            { id: 'opportunities', label: 'Opportunities', icon: '💼' },
            { id: 'collaboration', label: 'Industry Collaboration', icon: '🤝' },
            { id: 'analytics', label: 'Skill & Curriculum Analytics', icon: '📊' },
            { id: 'applications', label: 'Applications & Tracking', icon: '📄' },
            { id: 'reports', label: 'Reports', icon: '📈' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, Dr. Meenakshi! 👋</h2>
            <p className="text-sm text-slate-500 mt-1">Empowering your students with industry-ready skills and opportunities.</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-100">Institution Portal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Students</p>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">{data.total_students}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Active Opportunities</p>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">{data.active_opportunities}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Partner Industries</p>
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">21</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Placed Students</p>
            <p className="text-3xl font-extrabold text-indigo-700 mt-2">{data.placed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
