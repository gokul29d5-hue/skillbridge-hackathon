import React from 'react';

const SuperAdminOverview = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-blue-600/30 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
            System Core v2.4
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Platform Command Center</h2>
          <p className="text-sm text-slate-400 mt-1">Real-time telemetry and ecosystem-wide engagement metrics.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-400">All Systems Operational</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Active Students</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">4,648</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-2 inline-block">↑ +12% this week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Institutions</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">14</p>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mt-2 inline-block">2 Pending Audit</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Industry Partners</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">28</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-2 inline-block">Active Hiring Pools</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gemini API Latency</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">240ms</p>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 mt-2 inline-block">Optimal Performance</span>
        </div>
      </div>

      {/* Bottom Section: Security & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Audit Logs */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Recent Security & Provisioning Logs</h3>
          <div className="space-y-3">
            {[
              { time: "10:42 AM", event: "New partner account provisioned: SRM Institute", type: "success" },
              { time: "09:15 AM", event: "Database backup completed successfully on Render", type: "info" },
              { time: "Yesterday", event: "Gemini Pro skill-mapping model weights updated", type: "info" },
              { time: "Yesterday", event: "Security audit passed: 0 vulnerabilities found", type: "success" }
            ].map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">{log.event}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{log.time}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Infrastructure Status</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>PostgreSQL Database Load</span>
                  <span className="text-slate-900 font-bold">14%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>FastAPI Server Memory</span>
                  <span className="text-slate-900 font-bold">32%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Vercel Edge Network</span>
                  <span className="text-emerald-600 font-bold">100% Uptime</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-sm">
            Download System Diagnostics
          </button>
        </div>

      </div>

    </div>
  );
};

export default SuperAdminOverview;
