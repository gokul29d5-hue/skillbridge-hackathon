import React from 'react';

const Portfolio = () => {
  // Mock data representing the student's verified achievements
  const studentData = {
    name: "SkillBridge Student",
    githubRating: "Top 15%",
    totalCommits: 342,
    verifiedProjects: 5,
    badges: [
      { id: 1, name: "React Innovator", issuer: "TechNova", date: "Aug 2026", icon: "⚛️" },
      { id: 2, name: "Cloud Native", issuer: "AWS Academy", date: "Sep 2026", icon: "☁️" },
      { id: 3, name: "SIH Finalist", issuer: "Gov of India", date: "Sep 2026", icon: "🏆" }
    ],
    projects: [
      {
        id: 101,
        title: "Smart Water Management Dashboard",
        techStack: ["React", "Tailwind", "Node.js"],
        description: "Built the frontend analytics dashboard for tracking municipal water flow.",
        verified: true,
        link: "github.com/student/water-dash"
      },
      {
        id: 102,
        title: "Tuition-Portal DB Engine",
        techStack: ["Python", "FastAPI", "PostgreSQL"],
        description: "Deployed a secure backend for a local education center using Render.",
        verified: true,
        link: "github.com/student/tuition-backend"
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-slate-700 shadow-lg">
            SB
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">{studentData.name}</h2>
            <p className="text-sm text-slate-400 mt-1">Verified Digital Portfolio</p>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center flex-1">
            <p className="text-2xl font-extrabold text-blue-400">{studentData.verifiedProjects}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">Verified Projects</p>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center flex-1">
            <p className="text-2xl font-extrabold text-emerald-400">{studentData.totalCommits}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-1">Git Commits</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Digital Badges */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Verified Credentials</h3>
            <div className="space-y-3">
              {studentData.badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{badge.name}</p>
                    <p className="text-[10px] font-semibold text-slate-500 uppercase">{badge.issuer} • {badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Projects */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Evidence-Based Projects</h3>
          
          {studentData.projects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{project.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                </div>
                {project.verified && (
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                    <span>✓</span> Verified
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <div className="flex gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={`https://${project.link}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                  View Repository →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Portfolio;
