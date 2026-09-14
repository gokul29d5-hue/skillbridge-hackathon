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
    <div className="flex gap-6 min-h-screen bg-slate-50">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden lg:flex flex-col justify-between h-screen sticky top-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2 pt-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">🎓</div>
            <div>
              <h1 className="font-bold text-slate-800 text-sm">SkillBridge</h1>
              <p className="text-[10px] text-slate-500">Institution Portal</p>
            </div>
          </div>

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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏛️</span>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">Vel Tech Multi Tech</p>
                <p className="text-[10px] text-slate-500">Engineering College</p>
              </div>
            </div>
            <span>▼</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 px-2 cursor-pointer hover:text-slate-700">
            <span>❓</span> Help & Support
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 py-6 pr-6">
        {/* Top Welcome Banner & Discover Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back, Dr. Meenakshi! 👋</h2>
            <p className="text-sm text-slate-500 mt-1">Empowering your students with industry-ready skills and opportunities.</p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Discover Industry Opportunities</p>
              <p className="text-xs text-blue-100 mt-1">Find internships, live projects and training programs tailored for your students.</p>
            </div>
            <button className="mt-4 bg-white text-blue-700 font-semibold py-2 px-4 rounded-xl text-xs hover:bg-blue-50 transition w-fit cursor-pointer shadow-xs">
              Explore Opportunities →
            </button>
          </div>
        </div>

        {/* 4 Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Students</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{data.total_students}</p>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 6% this month</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Active Opportunities</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{data.active_opportunities}</p>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 12% this month</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Partner Industries</p>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">21</p>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 5% this month</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs text-slate-500 uppercase font-semibold">Placed Students</p>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">{data.placed}</p>
            <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 18% this year</span>
          </div>
        </div>

        {/* Middle Section: Skill Gap, Recommended Opps, Recent Apps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Gap Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Skill Gap Analysis (Top Areas)</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View Details →</span>
            </div>
            <div className="grid grid-cols-5 gap-2 pt-2">
              {[
                { skill: "Cloud & DevOps", val: 65, color: "bg-blue-600" },
                { skill: "Data Science & ML", val: 58, color: "bg-emerald-600" },
                { skill: "Full Stack", val: 52, color: "bg-purple-600" },
                { skill: "Communication", val: 41, color: "bg-amber-500" },
                { skill: "Cyber", val: 37, color: "bg-teal-600" }
              ].map((bar, i) => (
                <div key={i} className="bg-slate-50 p-2 rounded-xl text-center">
                  <div className="h-28 bg-slate-100 rounded-lg flex items-end justify-center p-1 relative mb-2">
                    <div className={`w-full ${bar.color} rounded-md`} style={{ height: `${bar.val}%` }}></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 truncate">{bar.skill}</p>
                  <p className="text-[10px] text-slate-500">{bar.val}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Opportunities */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Recommended Opportunities</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All →</span>
            </div>
            <div className="space-y-3">
              {[
                { title: "Software Development Intern", comp: "Google", duration: "6 weeks", mode: "Remote", tags: ["Python", "Java"] },
                { title: "Data Science Intern", comp: "Microsoft", duration: "8 weeks", mode: "Hybrid", tags: ["Python", "ML"] },
                { title: "Frontend Developer Intern", comp: "TCS", duration: "6 weeks", mode: "Onsite", tags: ["React", "JS"] }
              ].map((opp, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs">{opp.title}</h4>
                    <p className="text-[11px] text-slate-500">{opp.comp} • {opp.duration} • {opp.mode}</p>
                  </div>
                  <button className="bg-blue-600 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                    Explore
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Recent Applications</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All →</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Aarav Sharma", role: "Software Dev Intern", status: "Applied", color: "bg-blue-50 text-blue-700" },
                { name: "Arjun K.", role: "Data Science Intern", status: "Shortlisted", color: "bg-emerald-50 text-emerald-700" },
                { name: "Sneha R.", role: "Frontend Developer", status: "Under Review", color: "bg-amber-50 text-amber-700" },
                { name: "Vikram M.", role: "Web Developer", status: "Applied", color: "bg-blue-50 text-blue-700" }
              ].map((app, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{app.name}</p>
                    <p className="text-[10px] text-slate-500">{app.role}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${app.color}`}>{app.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Events, Performance Overview, Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Upcoming Industry Events</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All →</span>
            </div>
            <div className="space-y-3">
              {[
                { date: "15 Apr", title: "Webinar: Career Guidance", time: "SkillBridge", type: "Online" },
                { date: "18 Apr", title: "Hackathon 2025", time: "XYZ College", type: "Onsite" },
                { date: "22 Apr", title: "Industry Guest Lecture", time: "TCS", type: "Online" }
              ].map((ev, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-700 font-bold p-2 rounded-lg text-center text-xs">
                      {ev.date}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{ev.title}</p>
                      <p className="text-[10px] text-slate-500">{ev.time}</p>
                    </div>
                  </div>
                  <span className="bg-slate-200/60 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-md">{ev.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Performance Overview */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-sm">Student Performance Overview</h3>
              <span className="text-xs text-blue-600 font-semibold cursor-pointer">View Details →</span>
            </div>
            <div className="flex items-center justify-center py-6">
              <div className="w-32 h-32 rounded-full border-8 border-blue-600 flex flex-col items-center justify-center text-center shadow-inner">
                <span className="text-xl font-extrabold text-slate-800">{data.total_students}</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Total Students</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Placed (184)</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Internship (312)</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> In Training (406)</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Others (346)</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                "Post New Opportunity",
                "Invite Industry Partner",
                "View Student Skill Report",
                "Manage Applications",
                "Update Curriculum"
              ].map((action, idx) => (
                <button key={idx} className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-xs font-bold text-slate-700 flex justify-between items-center transition cursor-pointer">
                  {action}
                  <span className="text-slate-400">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
