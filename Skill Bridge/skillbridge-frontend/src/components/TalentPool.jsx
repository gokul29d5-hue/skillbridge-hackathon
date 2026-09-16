import React, { useState } from 'react';

const TalentPool = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock database representing students with verified SkillBridge profiles
  const candidates = [
    {
      id: "STU-8821",
      name: "Aditi Sharma",
      targetRole: "Full Stack Developer",
      matchScore: 94,
      college: "Vel Tech Engineering College",
      verifiedSkills: ["React", "Node.js", "MongoDB"],
      portfolio: { commits: 412, verifiedProjects: 6, badges: 3 },
      status: "Actively Looking"
    },
    {
      id: "STU-9014",
      name: "Rahul Verma",
      targetRole: "Data Analyst",
      matchScore: 88,
      college: "SRM Institute",
      verifiedSkills: ["Python", "SQL", "PowerBI"],
      portfolio: { commits: 240, verifiedProjects: 4, badges: 2 },
      status: "Actively Looking"
    },
    {
      id: "STU-7732",
      name: "Priya Patel",
      targetRole: "Cloud Engineer",
      matchScore: 82,
      college: "VIT Chennai",
      verifiedSkills: ["AWS", "Docker", "Linux"],
      portfolio: { commits: 315, verifiedProjects: 5, badges: 4 },
      status: "Interviewing"
    }
  ];

  const filteredCandidates = candidates.filter(candidate => 
    candidate.verifiedSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    candidate.targetRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Industry Recruitment
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Verified Talent Pool</h2>
          <p className="text-sm text-emerald-100 mt-1">Discover candidates backed by evidence-based skill verification.</p>
        </div>
        
        {/* Search Bar */}
        <div className="w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search by skill (e.g. React) or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 bg-white/90 focus:bg-white outline-none border-2 border-transparent focus:border-emerald-300 transition shadow-sm"
          />
        </div>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-emerald-300 transition duration-300">
            
            {/* Top Match Bar */}
            <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">AI Role Match</span>
              <span className="text-sm font-extrabold text-emerald-600">{candidate.matchScore}%</span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{candidate.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{candidate.college}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg shadow-inner">
                  👤
                </div>
              </div>

              <p className="text-sm font-bold text-slate-700 mt-2">{candidate.targetRole}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                {candidate.verifiedSkills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Evidence Metrics */}
              <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 mb-4">
                <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <p className="text-lg font-extrabold text-slate-700">{candidate.portfolio.verifiedProjects}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Projects</p>
                </div>
                <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <p className="text-lg font-extrabold text-slate-700">{candidate.portfolio.commits}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Commits</p>
                </div>
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-sm">
                Shortlist Candidate
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 font-medium">No candidates match your current skill requirements.</p>
        </div>
      )}

    </div>
  );
};

export default TalentPool;
