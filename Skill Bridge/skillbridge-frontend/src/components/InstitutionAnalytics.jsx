import React from 'react';

const InstitutionAnalytics = () => {
  // Mock data representing the aggregated AI analysis of all students in the institution
  const batchData = {
    totalStudentsAnalyzed: 1248,
    overallReadiness: 68,
    topStrengths: [
      { skill: "Python Programming", proficiency: 85 },
      { skill: "Frontend Basics (HTML/CSS)", proficiency: 82 },
      { skill: "Basic SQL", proficiency: 75 }
    ],
    criticalGaps: [
      { skill: "Cloud Deployment (AWS/Render)", deficiency: 72, industryDemand: "Very High" },
      { skill: "System Design Architecture", deficiency: 65, industryDemand: "High" },
      { skill: "CI/CD Pipelines", deficiency: 80, industryDemand: "Critical" }
    ],
    aiRecommendations: [
      "Introduce a mandatory 2-week Docker & Containerization workshop in Semester 6.",
      "Partner with TechNova Solutions to host a weekend Hackathon focused on System Design.",
      "Replace 'Legacy Web Tech' elective with 'Cloud Infrastructure Deployment'."
    ]
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Dual-Level AI Intelligence
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Curriculum & Skill Analytics</h2>
          <p className="text-sm text-blue-100 mt-1">Aggregated skill gap analysis for the Class of 2026 based on live industry data.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 text-center">
          <p className="text-3xl font-extrabold text-blue-300">{batchData.overallReadiness}%</p>
          <p className="text-[10px] text-blue-200 uppercase font-bold tracking-wider mt-1">Batch Placement Readiness</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Strengths and Gaps */}
        <div className="space-y-6">
          
          {/* Critical Gaps Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Critical Batch Deficiencies</h3>
            <div className="space-y-4">
              {batchData.criticalGaps.map((gap, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>{gap.skill}</span>
                    <span className="text-red-500">{gap.deficiency}% lack this</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${gap.deficiency}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Market Demand: <span className="text-slate-700">{gap.industryDemand}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Strengths Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Batch Strengths</h3>
            <div className="space-y-4">
              {batchData.topStrengths.map((strength, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>{strength.skill}</span>
                    <span className="text-emerald-600">{strength.proficiency}% Proficient</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${strength.proficiency}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Action Plan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <span className="text-2xl">🧠</span>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Gemini AI Curriculum Action Plan</h3>
          </div>
          
          <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">
            Based on the gap between your students' verified portfolios and live job postings from our industry partners, Gemini recommends the following immediate interventions to boost placement rates:
          </p>

          <div className="space-y-4 flex-1">
            {batchData.aiRecommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 font-semibold leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-3 rounded-xl transition shadow-sm">
            Generate Detailed PDF Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default InstitutionAnalytics;
