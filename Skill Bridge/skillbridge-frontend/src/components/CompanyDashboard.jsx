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

  if (loading) return <div className="text-slate-500 p-8 font-medium">Loading Company Dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, TechNova Solutions! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Discover talent, post opportunities and build a stronger future with academia.</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl">
          <p className="text-xs uppercase font-semibold opacity-80">Industry Partner</p>
          <p className="text-sm font-medium mt-0.5">Corporate Talent Portal</p>
        </div>
      </div>

      {/* Metric Cards connected to FastAPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Active Opportunities</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{data.active_openings}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 3 this week</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Total Applications</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{data.total_applicants}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">↑ 18% this week</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Shortlisted Candidates</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">{data.shortlisted}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Ready for interview</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Ongoing Internships</p>
          <p className="text-3xl font-extrabold text-emerald-700 mt-2">{data.interviews_scheduled}</p>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Across departments</span>
        </div>
      </div>

      {/* Recommended Talent Matches Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-base">Recommended Talent Matches</h3>
          <span className="text-xs text-emerald-600 font-semibold cursor-pointer">View All →</span>
        </div>
        <div className="space-y-4">
          {[
            { name: "Priya S.", college: "Vel Tech Multi Tech Dr. RR & Dr. SR Engineering College", match: "92% Match", skills: ["Java", "Spring Boot", "MySQL"] },
            { name: "Arjun K.", college: "Kumaraguru College of Technology", match: "88% Match", skills: ["Python", "Data Analysis", "Machine Learning"] },
            { name: "Sneha R.", college: "SRM Institute of Science and Technology", match: "85% Match", skills: ["React", "Node.js", "Express.js"] }
          ].map((student, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-slate-800 text-sm">{student.name}</h4>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-100">{student.match}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{student.college}</p>
                <div className="flex gap-2 mt-2">
                  {student.skills.map((s, i) => (
                    <span key={i} className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <button className="bg-emerald-600 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-emerald-700 transition cursor-pointer shadow-xs whitespace-nowrap">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
