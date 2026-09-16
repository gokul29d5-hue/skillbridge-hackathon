import React, { useState, useEffect } from 'react';

const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/challenges')
      .then(res => res.json())
      .then(data => {
        setChallenges(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApply = (title) => {
    alert(`Successfully registered for challenge: "${title}". Your contribution ledger is now tracking your project activity!`);
  };

  if (loading) return <div className="p-8 text-slate-500 font-medium">Loading Global Challenge Marketplace...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-sm">
        <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
          Global Marketplace
        </span>
        <h2 className="text-2xl font-extrabold mt-2">Community Challenge Marketplace</h2>
        <p className="text-sm text-teal-100 mt-1">Connect with real problems posted by NGOs, MSMEs, schools, and local organizations worldwide.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-full uppercase border border-teal-100">
                {c.organization}
              </span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{c.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-4">
                {c.skills_required.map((skill, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600">{c.bounty_or_credit}</span>
              <button 
                onClick={() => handleApply(c.title)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
              >
                Accept Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityChallenges;
