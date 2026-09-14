import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/student')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(() => {
        // Fallback data if API is sleeping
        setData({
          name: "Gokul",
          college: "B.Tech Information Technology • Vel Tech Multi Tech",
          verified_skills: 3,
          certifications: 2,
          projects: 5,
          skills: [
            { name: "Python", progress: 85, level: "Advanced" },
            { name: "React", progress: 70, level: "Intermediate" },
            { name: "Networking (OSI Model)", progress: 65, level: "Intermediate" }
          ]
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-slate-500 p-8 font-medium">Loading Student Dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, {data.name}! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">{data.college}</p>
        </div>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">Student Portal</span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Verified Skills</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{data.verified_skills}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Certifications</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{data.certifications}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 uppercase font-semibold">Projects Completed</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{data.projects}</p>
        </div>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Your Skill Progress</h3>
        <div className="space-y-4">
          {data.skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-slate-700">{skill.name}</span>
                <span className="text-slate-500">{skill.progress}% • {skill.level}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
