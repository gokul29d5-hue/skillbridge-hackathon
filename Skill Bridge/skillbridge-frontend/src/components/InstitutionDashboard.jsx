import React, { useState, useEffect } from 'react';

const InstitutionDashboard = () => {
  const [stats, setStats] = useState({ total_students: 0, active_opportunities: 0, placed: 0, placement_rate: "0%" });
  const [studentsList, setStudentsList] = useState([]);
  
  // Provision Form State
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const institutionName = localStorage.getItem('skillbridge_name') || 'Your Institution';

  const fetchDashboardData = async () => {
    try {
      const statsRes = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution');
      if (statsRes.ok) setStats(await statsRes.json());

      const studentsRes = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution/students/list');
      if (studentsRes.ok) setStudentsList(await studentsRes.json());
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage(''); setError('');
    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, email: studentEmail, password: studentPassword, institution: institutionName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to create student');
      setMessage(data.message); setStudentName(''); setStudentEmail(''); setStudentPassword('');
      fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Stats */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Overview & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Students</p>
            <p className="text-3xl font-extrabold text-blue-600">{stats.total_students + studentsList.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Active Opportunities</p>
            <p className="text-3xl font-extrabold text-slate-800">{stats.active_opportunities}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Placed</p>
            <p className="text-3xl font-extrabold text-emerald-600">{stats.placed}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Placement Rate</p>
            <p className="text-3xl font-extrabold text-indigo-600">{stats.placement_rate}</p>
          </div>
        </div>
      </div>

      {/* 2. Visual Analytics (Skill Gap & Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Gap Chart Simulation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Skill Gap Analysis</h3>
          <p className="text-xs text-slate-500 mb-6">Compare industry demand vs. student proficiency</p>
          
          <div className="space-y-5">
            {[
              { skill: 'React / Frontend', demand: 95, supply: 65, color: 'bg-blue-500' },
              { skill: 'Python / Backend', demand: 85, supply: 80, color: 'bg-emerald-500' },
              { skill: 'Cloud / AWS', demand: 90, supply: 40, color: 'bg-amber-500' },
              { skill: 'Data Structures', demand: 80, supply: 75, color: 'bg-indigo-500' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-700">{item.skill}</span>
                  <span className={item.supply < item.demand - 20 ? 'text-red-500' : 'text-emerald-600'}>
                    {item.supply < item.demand - 20 ? 'High Gap' : 'On Track'}
                  </span>
                </div>
                {/* Double Progress Bar */}
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full ${item.color} opacity-30`} style={{ width: `${item.demand}%` }}></div>
                  <div className={`absolute top-0 left-0 h-full ${item.color} rounded-full`} style={{ width: `${item.supply}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Student Avg: {item.supply}%</span>
                  <span>Industry Req: {item.demand}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Activity Feed Simulation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Recent Student Activity</h3>
          <p className="text-xs text-slate-500 mb-6">Live updates from your cohort</p>
          
          <div className="space-y-4">
            {[
              { text: "completed the 'Advanced React Hooks' assessment.", time: "10 mins ago", type: "assessment" },
              { text: "updated their resume and digital portfolio.", time: "1 hour ago", type: "profile" },
              { text: "applied for Software Engineer Intern at Google.", time: "3 hours ago", type: "job" },
              { text: "achieved a 95% score on Python Data Structures.", time: "Yesterday", type: "assessment" }
            ].map((feed, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${feed.type === 'assessment' ? 'bg-emerald-500' : feed.type === 'job' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                <div>
                  <p className="text-sm text-slate-700"><span className="font-bold">A student</span> {feed.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{feed.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Account Provisioning Tool */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Provision Student Accounts</h3>
        <p className="text-xs text-slate-500 mb-4">Create official login credentials for your enrolled students.</p>
        
        {message && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold">{error}</div>}

        <form onSubmit={handleAddStudent} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Student Name</label>
            <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. John Doe" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-blue-500" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Email</label>
            <input type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="student@college.edu" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-blue-500" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Password</label>
            <input type="password" required value={studentPassword} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none text-sm focus:border-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition cursor-pointer">
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>

      {/* 4. Live Student Tracking Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Live Student Directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="p-3 font-bold">Student Name</th>
                <th className="p-3 font-bold">Email</th>
                <th className="p-3 font-bold">Current Activity</th>
                <th className="p-3 font-bold">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {studentsList.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold">{student.name}</td>
                  <td className="p-3 text-slate-500">{student.email}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">{student.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-200 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${student.progress}%` }}></div></div>
                      <span className="text-[10px] font-bold text-slate-500">{student.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              {studentsList.length === 0 && (<tr><td colSpan="4" className="p-6 text-center text-slate-400 text-sm">No students provisioned yet.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InstitutionDashboard;
