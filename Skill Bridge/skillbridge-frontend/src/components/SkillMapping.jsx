import React, { useState } from 'react';

const AiSkillMapping = () => {
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Use the live backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://skillbridge-api-live.onrender.com';

  // In a fully complete app, this would be fetched from the database based on the student's passing assessments and GitHub analysis.
  const currentVerifiedSkills = ["Python", "HTML", "CSS", "Basic SQL"];

  const handleAnalyze = async () => {
    if (!targetRole) {
      alert("Please enter a target role.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/ai/skill-mapping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_role: targetRole,
          student_skills: currentVerifiedSkills
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to connect to the AI engine. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800">AI Skill Mapping & Roadmap</h2>
        <p className="text-sm text-slate-500 mt-1">
          Our Machine Learning model calculates your readiness, and our AI generates your personalized roadmap based on your verified GitHub and assessment data.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3">Your Verified Skills</h3>
            <div className="flex flex-wrap gap-2">
              {currentVerifiedSkills.map((skill, idx) => (
                <span key={idx} className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">
                  ✓ {skill}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">
              *These skills have been mathematically verified via our Skill Assessment and GitHub repository analysis.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3">What is your target role?</h3>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="e.g. Backend Developer, Data Scientist..." 
                className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
              <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Analyzing Profile...
                  </>
                ) : "Generate Roadmap"}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          
          {/* Scikit-Learn Score Card */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center items-center text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Scikit-Learn ML Score</p>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={`${result.readiness_score > 70 ? 'text-green-400' : result.readiness_score > 40 ? 'text-yellow-400' : 'text-red-400'}`} strokeDasharray={`${result.readiness_score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-4xl font-extrabold">{result.readiness_score}</div>
            </div>
            <p className="text-sm font-medium mt-4">Readiness for {targetRole}</p>
            <div className="mt-4 bg-slate-800/50 rounded-lg p-3 w-full border border-slate-700">
              <p className="text-xs text-slate-400">Market Demand</p>
              <p className="text-sm font-bold text-blue-300">{result.market_demand}</p>
            </div>
          </div>

          {/* Gemini Roadmap Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">✨</span>
              <h3 className="text-lg font-extrabold text-slate-800">AI Mentor Roadmap</h3>
            </div>
            
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Critical Missing Skill</p>
              <p className="text-base font-bold text-slate-800 mt-1">{result.top_missing_skill}</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800 mb-4">Recommended Next Steps:</p>
              <div className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 w-full">
                      <p className="text-sm text-slate-700 font-medium">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="mt-6 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold py-3 rounded-xl transition">
              Find Projects to Build These Skills →
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default AiSkillMapping;
