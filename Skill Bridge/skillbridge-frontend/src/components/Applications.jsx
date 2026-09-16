import React, { useState } from 'react';

const Applications = () => {
  const [filter, setFilter] = useState('All');

  // Mock database of the student's job and challenge applications
  const applicationsList = [
    {
      id: "APP-1042",
      company: "TechNova Solutions",
      role: "Software Engineer Intern",
      type: "Internship",
      appliedDate: "Sep 14, 2026",
      status: "Interview Scheduled",
      nextStep: "Technical Round on Sep 18"
    },
    {
      id: "APP-1043",
      company: "Local Municipal Corp",
      role: "Smart Water Management Dashboard",
      type: "Community Challenge",
      appliedDate: "Sep 15, 2026",
      status: "Under Review",
      nextStep: "Awaiting mentor approval"
    },
    {
      id: "APP-0998",
      company: "Global Data Corp",
      role: "Junior Data Analyst",
      type: "Full-Time Placement",
      appliedDate: "Sep 01, 2026",
      status: "Rejected",
      nextStep: "Position filled"
    },
    {
      id: "APP-0985",
      company: "NextGen AI Startups",
      role: "Prompt Engineer",
      type: "Internship",
      appliedDate: "Aug 20, 2026",
      status: "Offer Extended",
      nextStep: "Accept or decline by Sep 20"
    }
  ];

  // Filter logic to let the student sort their applications
  const displayedApps = filter === 'All' 
    ? applicationsList 
    : applicationsList.filter(app => app.status.includes(filter) || (filter === 'Active' && !app.status.includes('Rejected')));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Application Tracking
          </span>
          <h2 className="text-2xl font-extrabold mt-2">My Applications</h2>
          <p className="text-sm text-orange-100 mt-1">Track your internship, placement, and community challenge requests.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px overflow-x-auto">
        {['All', 'Active', 'Interview', 'Offer'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm font-bold transition-colors whitespace-nowrap ${
              filter === tab 
                ? 'text-orange-600 border-b-2 border-orange-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4 pt-2">
        {displayedApps.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition duration-300">
            
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                  {app.id}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                  app.type === 'Internship' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                  app.type === 'Community Challenge' ? 'bg-teal-50 text-teal-700 border-teal-100' :
                  'bg-purple-50 text-purple-700 border-purple-100'
                }`}>
                  {app.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{app.role}</h3>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">{app.company}</p>
              <p className="text-xs font-semibold text-slate-400 mt-2">Applied on: {app.appliedDate}</p>
            </div>

            <div className="flex flex-col items-start md:items-end w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
              {/* Conditional Styling for Status Badges */}
              <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${
                app.status.includes('Interview') ? 'bg-blue-100 text-blue-700' :
                app.status.includes('Offer') ? 'bg-emerald-100 text-emerald-700' :
                app.status.includes('Rejected') ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {app.status}
              </span>
              
              <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 w-full md:w-64 text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Next Step</p>
                <p className="text-xs text-slate-700 font-semibold">{app.nextStep}</p>
              </div>
            </div>

          </div>
        ))}
        
        {displayedApps.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No applications found for this filter.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Applications;
