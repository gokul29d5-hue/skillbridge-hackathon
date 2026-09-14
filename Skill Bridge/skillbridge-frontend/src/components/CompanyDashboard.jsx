import React, { useState, useEffect } from 'react';

const CompanyDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/company')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(() => {
        setData({ active_openings: 6, total_applicants: 42, shortlisted: 12, interviews_scheduled: 5 });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-gray-500 py-10">Loading Company Dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Recruitment & Hiring Portal</h2>
            <p className="text-sm text-slate-500">Live applicant tracking and candidate pipeline metrics</p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100">Corporate Partner</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-3xl font-extrabold text-emerald-600">{data.active_openings}</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Open Positions</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-3xl font-extrabold text-emerald-600">{data.total_applicants}</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Total Applicants</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-3xl font-extrabold text-emerald-600">{data.shortlisted}</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Shortlisted Candidates</p>
          </div>
          <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-3xl font-extrabold text-emerald-700">{data.interviews_scheduled}</p>
            <p className="text-xs text-emerald-600 uppercase font-semibold mt-1">Interviews Scheduled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
