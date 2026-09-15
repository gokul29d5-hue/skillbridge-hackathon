import React, { useState, useEffect } from 'react';

const SkillMapping = () => {
  const [selectedRole, setSelectedRole] = useState('Full Stack Engineer');
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAIMapping = async (role) => {
    setLoading(true);
    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/ai/skill-mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_role: role,
          student_skills: [{ name: "Python", level: "Advanced" }, { name: "React", level: "Intermediate" }]
        })
      });
      const data = await response.json();
      setAiData(data);
    } catch (err) {
      console.error("AI Mapping failed, using defaults");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIMapping(selectedRole);
  }, [selectedRole]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Banner & Target Selector */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Powered by Google Gemini AI
          </span>
          <h2 className="text-2xl font-extrabold mt-2">AI Skill Gap Mapping</h2>
          <p className="text-sm text-indigo-100 mt-1">Real-time AI evaluation matching your profile against live market demands.</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
          <label className="block text-[10px] font-bold text-indigo-200 uppercase mb-1">Target Career Role</label>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-white text-slate-800 font-bold text-sm px-3 py-1.5 rounded-lg outline-none cursor-pointer"
          >
            <option value="Full Stack Engineer">Full Stack Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="AI / ML Engineer">AI / ML Engineer</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500 font-medium">
          🤖 Gemini AI is analyzing your skill profile and market data...
        </div>
      ) : aiData && (
        <div className="space-y-6">
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">AI Readiness Score</p>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl font-extrabold text-blue-600">{aiData.readiness_score}%</span>
                <span className="text-xs text-slate-400 font-semibold">Match for {selectedRole}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${aiData.readiness_score}%` }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Market Demand</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-2">{aiData.market_demand}</p>
              <p className="text-xs text-slate-400 font-semibold mt-2">Verified via AI trend analysis</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Primary Skill Gap</p>
              <p className="text-base font-extrabold text-amber-600 mt-2 truncate">{aiData.top_missing_skill}</p>
              <p className="text-xs text-slate-400 font-semibold mt-2">Recommended focus area</p>
            </div>
          </div>

          {/* AI Recommendations Action Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-800">Gemini AI Personalized Bridge Plan</h3>
            <div className="space-y-3">
              {aiData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-blue-600 font-bold text-sm">✨</span>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillMapping;
