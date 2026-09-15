import React, { useState, useEffect } from 'react';

const InstitutionDashboard = ({ onLogout }) => {
  const [stats, setStats] = useState({
    total_students: 0,
    active_opportunities: 0,
    placed: 0,
    placement_rate: "0%"
  });

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // State for the Live Student Activity table
  const [studentsList, setStudentsList] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const institutionName = localStorage.getItem('skillbridge_name') || 'Your Institution';

  // Fetch Dashboard Stats & Student List
  const fetchDashboardData = async () => {
    try {
      // Fetch Stats
      const statsRes = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution');
      if (statsRes.ok) setStats(await statsRes.json());

      // Fetch Live Student Activity List
      const studentsRes = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution/students/list');
      if (studentsRes.ok) setStudentsList(await studentsRes.json());
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/institution/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName,
          email: studentEmail,
          password: studentPassword,
          institution: institutionName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to create student account');
      }

      setMessage(data.message);
      setStudentName('');
      setStudentEmail('');
      setStudentPassword('');
      
      // Refresh the live student list and stats instantly
      fetchDashboardData();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold">SkillBridge Institution Portal</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold text-slate-600">Welcome, {institutionName}</span>
          <button 
            onClick={onLogout}
            className="text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Stats Grid */}
        <section>
          <h2 className="text-lg font-bold mb-4 uppercase text-slate-500 tracking-wider">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Total Students</p>
              <p className="text-3xl font-extrabold text-blue-600">{stats.total_students + studentsList.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Active Opportunities</p>
              <p className="text-3xl font-extrabold text-slate-800">{stats.active_opportunities}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Placed</p>
              <p className="text-3xl font-extrabold text-emerald-600">{stats.placed}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500 font-semibold uppercase mb-1">Placement Rate</p>
              <p className="text-3xl font-extrabold text-indigo-600">{stats.placement_rate}</p>
            </div>
          </div>
        </section>

        {/* Create Student Section */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-800">Provision New Student Account</h2>
            <p className="text-sm text-slate-500 mt-1">Create official login credentials for your enrolled students.</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Student Full Name</label>
              <input type="text" required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. John Doe" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Student Email</label>
              <input type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="student@college.edu" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Assign Password</label>
              <input type="password" required value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50" />
            </div>
            <div className="md:col-span-3 mt-2 border-t border-slate-100 pt-6">
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-sm transition shadow-sm cursor-pointer disabled:opacity-50 float-right">
                {loading ? 'Creating Account...' : 'Create Student Account'}
              </button>
            </div>
          </form>
        </section>

        {/* Live Student Activity Monitor */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6 flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Live Student Activity Monitor</h2>
              <p className="text-sm text-slate-500 mt-1">Track the progress and platform activity of provisioned students.</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Live System</span>
            </div>
          </div>

          {loadingStudents ? (
            <p className="text-sm text-slate-500 text-center py-8">Fetching live student data...</p>
          ) : studentsList.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">No students provisioned yet. Use the form above to create the first account.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                    <th className="p-4 font-bold rounded-tl-lg">Student Name</th>
                    <th className="p-4 font-bold">Email Account</th>
                    <th className="p-4 font-bold">Current Status</th>
                    <th className="p-4 font-bold rounded-tr-lg">Skill Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {studentsList.map((student, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-semibold text-slate-800">{student.name}</td>
                      <td className="p-4 text-slate-500">{student.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          student.status === 'Online' ? 'bg-emerald-100 text-emerald-700' :
                          student.status.includes('Active') ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{student.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default InstitutionDashboard;
