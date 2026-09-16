import React, { useState, useEffect } from 'react';

const ContributionLedger = () => {
  const [ledger, setLedger] = useState({ logs: [], total_verified_contributions: 0 });
  const [loading, setLoading] = useState(true);
  const studentEmail = "student@college.edu"; // Uses standard email for demo purposes

  useEffect(() => {
    // Reaching out to the Python backend endpoint we built earlier
    fetch(`https://skillbridge-api-vslj.onrender.com/api/ledger/${studentEmail}`)
      .then(res => res.json())
      .then(data => {
        // If the database is empty, we inject mock data so your SIH demo looks amazing
        if (data.logs && data.logs.length > 0) {
          setLedger(data);
        } else {
          setLedger({
            total_verified_contributions: 2,
            logs: [
              { id: "TXN-9021", project_name: "Smart Water Management Dashboard", task_description: "Developed React frontend and integrated IoT pressure sensor APIs.", git_commits_count: 24, verified_by_mentor: true, date: "2026-09-12" },
              { id: "TXN-8814", project_name: "Rural Edu App (PWA)", task_description: "Configured offline caching service workers.", git_commits_count: 12, verified_by_mentor: true, date: "2026-08-28" },
              { id: "TXN-8702", project_name: "Mental Health Triage Bot", task_description: "Designed responsive UI components.", git_commits_count: 5, verified_by_mentor: false, date: "2026-08-15" }
            ]
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-slate-500 font-medium">Synchronizing with verification ledger...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-500/30">
            Evidence-Based Verification
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Individual Contribution Ledger</h2>
          <p className="text-sm text-slate-400 mt-1">Verified proof of work, Git commits, and peer-reviewed tasks for recruiters.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 text-center">
          <p className="text-3xl font-extrabold text-emerald-400">{ledger.total_verified_contributions}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">Verified Tasks</p>
        </div>
      </div>

      {/* Ledger Feed */}
      <div className="space-y-4">
        {ledger.logs.map((log, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                  {log.id}
                </span>
                <span className="text-xs font-bold text-slate-400">{log.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{log.project_name}</h3>
              <p className="text-sm text-slate-600 mt-1">{log.task_description}</p>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
              <div className="text-center">
                <p className="text-xl font-extrabold text-blue-600">{log.git_commits_count}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Git Commits</p>
              </div>
              
              <div className="hidden md:block w-px h-10 bg-slate-200"></div>
              
              <div className="text-center w-24">
                {log.verified_by_mentor ? (
                  <>
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold">
                      ✓
                    </div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verified</p>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold">
                      ⧗
                    </div>
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Pending</p>
                  </>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionLedger;
