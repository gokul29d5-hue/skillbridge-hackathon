import React from 'react';
import { Users, Briefcase, Building, GraduationCap, ChevronRight, ArrowRight, FileText, UserPlus, FileBarChart, RefreshCw } from 'lucide-react';

const InstitutionDashboard = () => {
  const stats = [
    { label: 'Total Students', value: '1,248', trend: '↑ 6% this month', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Opportunities', value: '38', trend: '↑ 12% this month', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Partner Industries', value: '21', trend: '↑ 5% this month', icon: Building, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Placed Students', value: '184', trend: '↑ 18% this year', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const skillGaps = [
    { name: 'Cloud & DevOps', percent: 65, height: 'h-32' },
    { name: 'Data Science & ML', percent: 58, height: 'h-28' },
    { name: 'Full Stack Dev', percent: 52, height: 'h-24' },
    { name: 'Communication', percent: 41, height: 'h-20' },
    { name: 'Cybersecurity', percent: 37, height: 'h-16' },
  ];

  const opportunities = [
    { company: 'Google', role: 'Software Development Intern', duration: '6 weeks • Remote', tags: ['Python', 'Java', 'Web Dev'], badge: 'G', badgeBg: 'bg-red-50 text-red-500' },
    { company: 'Microsoft', role: 'Data Science Intern', duration: '8 weeks • Hybrid', tags: ['Python', 'ML', 'Data Analysis'], badge: 'M', badgeBg: 'bg-blue-50 text-blue-500' },
    { company: 'TCS', role: 'Frontend Developer Intern', duration: '6 weeks • Onsite', tags: ['React', 'JavaScript', '+1'], badge: 'T', badgeBg: 'bg-indigo-50 text-indigo-600' },
    { company: 'Amazon', role: 'Machine Learning Intern', duration: '10 weeks • Remote', tags: ['Python', 'ML', 'Deep Learning'], badge: 'A', badgeBg: 'bg-orange-50 text-orange-500' },
  ];

  const applications = [
    { name: 'Aarav Sharma', role: 'Software Development Intern', company: 'Google', status: 'Applied', color: 'bg-blue-50 text-blue-600' },
    { name: 'Priya S', role: 'Data Science Intern', company: 'Microsoft', status: 'Shortlisted', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Vikram M', role: 'Frontend Developer Intern', company: 'TCS', status: 'Under Review', color: 'bg-amber-50 text-amber-600' },
    { name: 'Sneha R', role: 'Web Development Intern', company: 'Accenture', status: 'Applied', color: 'bg-blue-50 text-blue-600' },
    { name: 'Arjun K', role: 'Data Analyst Intern', company: 'Deloitte', status: 'Rejected', color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              <p className="text-xs text-emerald-600 font-medium mt-1">{stat.trend}</p>
            </div>
          </div>
        ))}
        {/* Call to Action Banner */}
        <div className="lg:col-span-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Discover Industry Opportunities</h3>
            <p className="text-sm text-gray-600 mt-1">Find internships, live projects and training programs tailored for your students.</p>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2">
            Explore Opportunities <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Gap Analysis */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Skill Gap Analysis (Top Areas)</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View Details →</button>
          </div>
          <div className="flex items-end justify-between h-40 mt-4 gap-2">
            {skillGaps.map((gap, idx) => (
              <div key={idx} className="flex flex-col items-center w-full group">
                <span className="text-xs font-bold text-gray-600 mb-2">{gap.percent}%</span>
                <div className={`w-full max-w-[40px] rounded-t-md transition-all duration-300 group-hover:opacity-80 ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-emerald-500' : idx === 2 ? 'bg-purple-500' : idx === 3 ? 'bg-orange-400' : 'bg-cyan-400'} ${gap.height}`}></div>
                <span className="text-[10px] text-center text-gray-500 mt-3 font-medium h-8 flex items-center">{gap.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Opportunities */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recommended Opportunities</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
          </div>
          <div className="space-y-4">
            {opportunities.map((opp, idx) => (
              <div key={idx} className="flex items-start justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${opp.badgeBg}`}>{opp.badge}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{opp.role}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{opp.company} • {opp.duration}</p>
                    <div className="flex gap-1.5 mt-1.5">
                      {opp.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[9px] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 border border-gray-200 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-50">Explore</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recent Applications</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All →</button>
          </div>
          <div className="space-y-4">
            {applications.map((app, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{app.name}</h4>
                    <p className="text-[11px] text-gray-500">{app.role} • {app.company}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded ${app.color}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { title: 'Post New Opportunity', desc: 'Internship / Project / Job', icon: FileText },
              { title: 'Invite Industry Partner', desc: 'Build collaborations', icon: UserPlus },
              { title: 'View Student Skill Report', desc: 'Analytics & insights', icon: FileBarChart },
              { title: 'Update Curriculum', desc: 'Based on industry demand', icon: RefreshCw },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <action.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{action.title}</p>
                    <p className="text-[10px] text-gray-400">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDashboard;