import React, { useState } from 'react';

const Internships = () => {
  // Using useState to act as our memory for the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Mock database of industry opportunities
  const opportunities = [
    {
      id: 1,
      company: "TechNova Solutions",
      role: "Software Engineer Intern",
      type: "Internship",
      location: "Chennai / Hybrid",
      stipend: "₹15,000 / month",
      matchScore: 92,
      skills: ["React", "Python", "FastAPI"],
      postedDays: 2
    },
    {
      id: 2,
      company: "Global Data Corp",
      role: "Junior Data Analyst",
      type: "Full-Time Placement",
      location: "Bangalore",
      stipend: "6 LPA",
      matchScore: 78,
      skills: ["SQL", "Python", "Tableau"],
      postedDays: 5
    },
    {
      id: 3,
      company: "CloudSync",
      role: "Backend Developer",
      type: "Internship",
      location: "Remote",
      stipend: "₹20,000 / month",
      matchScore: 85,
      skills: ["Node.js", "PostgreSQL", "Docker"],
      postedDays: 1
    }
  ];

  // A simple filter function that updates the screen instantly when the user types
  const filteredJobs = opportunities.filter(job => 
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Industry Collaboration
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Internships & Placement</h2>
          <p className="text-sm text-indigo-100 mt-1">AI-matched opportunities based on your verified SkillBridge profile.</p>
        </div>
        
        {/* Search Bar powered by React State */}
        <div className="w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search roles or companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 bg-white/90 focus:bg-white outline-none border-2 border-transparent focus:border-indigo-300 transition shadow-sm"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-indigo-300 transition duration-300">
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                    job.type === 'Internship' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    {job.type}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Posted {job.postedDays} days ago</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{job.role}</h3>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">{job.company} • {job.location}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                <div className="text-center">
                  <p className={`text-2xl font-extrabold ${job.matchScore >= 90 ? 'text-emerald-600' : job.matchScore >= 80 ? 'text-blue-600' : 'text-amber-600'}`}>
                    {job.matchScore}%
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">AI Match</p>
                </div>
                
                <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                
                <div className="text-center md:text-right">
                  <p className="text-sm font-bold text-slate-800 mb-2">{job.stipend}</p>
                  <button 
                    onClick={() => alert(`Your verified profile has been submitted to ${job.company}!`)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer shadow-sm w-full md:w-auto"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No opportunities match your search.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Internships;
