import React from 'react';

const Profile = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
            GD
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Gokulnath D.</h2>
            <p className="text-sm text-slate-500">B.Tech Information Technology • Vel Tech Multi Tech</p>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-emerald-200">
          Verified Student
        </span>
      </div>

      {/* Academic & Personal Details */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Academic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Degree Program</p>
            <p className="font-bold text-slate-700 mt-0.5">B.Tech Information Technology (IT-B)</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Institution</p>
            <p className="font-bold text-slate-700 mt-0.5">Vel Tech Multi Tech Dr. Rangarajan Dr. Sakunthala Engineering College</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">12th Grade Performance</p>
            <p className="font-bold text-slate-700 mt-0.5">511 / 600 (100/100 in Computer Science)</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Contact Email</p>
            <p className="font-bold text-slate-700 mt-0.5">gokul1032k24@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Verified Core Competencies */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Core Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["Python", "React", "SQL", "Networking & OSI Model", "Database Management", "Problem Solving"].map((skill, idx) => (
            <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1.5 rounded-xl">
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
