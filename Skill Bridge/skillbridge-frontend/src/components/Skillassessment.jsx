import React from 'react';

const SkillAssessment = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Skill Assessments & Certifications 🏆</h2>
          <p className="text-blue-100 text-sm mt-1">Validate your knowledge, earn badges, and stand out to top companies.</p>
        </div>
        <div className="hidden md:block bg-white/20 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30 text-center">
          <p className="text-[10px] uppercase font-bold tracking-wider text-blue-50">Global Rank</p>
          <p className="text-2xl font-extrabold">#4,208</p>
        </div>
      </div>

      {/* Recommended Assessments Grid */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Recommended for your profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Assessment Card 1 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl text-xl mb-3">🌐</div>
            <h4 className="font-bold text-slate-800">Advanced Networking</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Master the OSI Model, hardware architecture, and complex network topologies.</p>
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">⏱️ 45 Mins</span>
              <span className="flex items-center gap-1">📝 30 Qs</span>
            </div>
            <button className="w-full mt-5 bg-slate-900 text-white text-sm font-bold py-2 rounded-xl hover:bg-slate-800 transition cursor-pointer">
              Start Assessment
            </button>
          </div>

          {/* Assessment Card 2 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl text-xl mb-3">💻</div>
            <h4 className="font-bold text-slate-800">Computer Science Mastery</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Core programming logic, data structures, and algorithmic problem solving.</p>
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">⏱️ 60 Mins</span>
              <span className="flex items-center gap-1">📝 40 Qs</span>
            </div>
            <button className="w-full mt-5 bg-slate-900 text-white text-sm font-bold py-2 rounded-xl hover:bg-slate-800 transition cursor-pointer">
              Start Assessment
            </button>
          </div>

          {/* Assessment Card 3 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="w-10 h-10 bg-purple-50 text-purple-600 flex items-center justify-center rounded-xl text-xl mb-3">☁️</div>
            <h4 className="font-bold text-slate-800">Cloud Computing Basics</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Introduction to AWS, Azure, virtualization, and cloud deployment models.</p>
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">⏱️ 30 Mins</span>
              <span className="flex items-center gap-1">📝 20 Qs</span>
            </div>
            <button className="w-full mt-5 bg-slate-900 text-white text-sm font-bold py-2 rounded-xl hover:bg-slate-800 transition cursor-pointer">
              Start Assessment
            </button>
          </div>

        </div>
      </div>

      {/* Completed Badges Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs mt-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Your Verified Badges</h3>
        <div className="space-y-3">
          {[
            { title: "Python Fundamentals", score: "96%", date: "Mar 10, 2026", status: "Verified", icon: "🐍" },
            { title: "Database Management (SQL)", score: "88%", date: "Feb 22, 2026", status: "Verified", icon: "🗄️" },
            { title: "Frontend Development (React)", score: "92%", date: "Jan 15, 2026", status: "Verified", icon: "⚛️" }
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-2xl">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{badge.title}</h4>
                  <p className="text-xs text-slate-500">Completed on {badge.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-lg font-extrabold text-emerald-600">{badge.score}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                  ✓ {badge.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
