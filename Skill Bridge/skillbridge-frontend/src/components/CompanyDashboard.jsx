import React from 'react';
import { Briefcase, Users, UserCheck, Award, ChevronRight, PlusCircle, Search, FileText } from 'lucide-react';

const CompanyDashboard = () => {
  const stats = [
    { label: 'Active Opportunities', value: '12', trend: '↑ 3 this week', desc: 'Internships, Projects, Jobs', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Applications', value: '248', trend: '↑ 18% this week', desc: 'From eligible students', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Shortlisted Candidates', value: '56', trend: '↑ 12% this week', desc: 'Ready for interview', icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Ongoing Internships', value: '34', trend: '↑ 6% this week', desc: 'Across multiple departments', icon: Award, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const talents = [
    { name: 'Priya S', college: 'Vel Tech Multi Tech Engineering College', match: '92%', tags: ['Java', 'Spring Boot', 'MySQL', '+2'], avatar: 'P' },
    { name: 'Arjun K', college: 'Kumaraguru College of Technology', match: '88%', tags: ['Python', 'Data Analysis', 'Machine Learning'], avatar: 'A' },
    { name: 'Sneha R', college: 'SRM Institute of Science and Technology', match: '85%', tags: ['React', 'Node.js', 'Express.js'], avatar: 'S' },
    { name: 'Vikram M', college: 'PSG College of Technology', match: '82%', tags: ['Java', 'DSA', 'Problem Solving'], avatar: 'V' },
  ];

  const applications = [
    { name: 'Priya S', role: 'Software Development Intern', date: '12 Apr 2026', status: 'Shortlisted', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Arjun K', role: 'Data Science Intern', date: '11 Apr 2026', status: 'Under Review', color: 'bg-amber-50 text-amber-600' },
    { name: 'Sneha R', role: 'Frontend Developer Intern', date: '10 Apr 2026', status: 'Applied', color: 'bg-blue-50 text-blue-600' },
    { name: 'Vikram M', role: 'Machine Learning Intern', date: '08 Apr 2026', status: 'Interview', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, TechNova Solutions!</h1>
          <p className="text-sm text-gray-500 mt-1">Discover talent, post opportunities and build a stronger future with academia.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between min-w-[300px]">
          <div>
            <h4 className="text-sm font-bold text-blue-800">Empower future talent</h4>
            <p className="text-xs text-blue-600 mt-1">Internships | Projects | Placements</p>
          </div>
          <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-semibold text-emerald-600">{stat.trend}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommended Talent */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recommended Talent Matches</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
          </div>
          <p className="text-xs text-gray-500 mb-4">Students whose skills and interests match your current requirements.</p>
          <div className="space-y-4">
            {talents.map((talent, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-blue-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-lg">
                    {talent.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{talent.name}</h4>
                    <p className="text-[11px] text-gray-500">{talent.college}</p>
                    <div className="flex gap-1.5 mt-2">
                      {talent.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">{talent.match} Match</span>
                  <button className="text-xs px-3 py-1.5 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post Opportunity & Applications */}
        <div className="space-y-6">
          {/* Post New */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <PlusCircle size={18} className="text-blue-600" />
              <h3 className="font-bold text-gray-800">Post New Opportunity</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">Create and publish internships, projects or jobs.</p>
            <div className="grid grid-cols-2 gap-3">
              {['Internship', 'Project', 'Apprenticeship', 'Job'].map((type, i) => (
                <button key={i} className="py-3 flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors text-xs font-semibold text-gray-700">
                  <FileText size={16} className="text-blue-500" />
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Mini */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Recent Applications</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
            </div>
            <div className="space-y-3">
              {applications.map((app, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">{app.name}</h5>
                    <p className="text-[10px] text-gray-500 truncate max-w-[120px]">{app.role}</p>
                  </div>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${app.color}`}>{app.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;