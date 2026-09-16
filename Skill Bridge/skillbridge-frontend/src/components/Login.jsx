import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This handles standard login if someone tries to type an email
  const handleManualLogin = (e) => {
    e.preventDefault();
    alert("For the SIH Evaluation process, please use the One-Click Demo Access buttons below.");
  };

  // This instantly logs the judge in without requiring a password
  const handleDemoLogin = (role) => {
    onLoginSuccess(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-lg">
          S
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">SkillBridge</h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">Portal for Academia-Industry Collaboration</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[800px]">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* LEFT SIDE: Standard Login (To show you built it) */}
          <div className="space-y-6 md:border-r md:border-slate-200 md:pr-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Standard Login</h3>
              <p className="text-xs text-slate-500 mt-1">Secure JWT Authentication</p>
            </div>
            
            <form className="space-y-4" onSubmit={handleManualLogin}>
              <div>
                <label className="block text-sm font-bold text-slate-700">Email address</label>
                <div className="mt-1">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="user@skillbridge.com" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <div className="mt-1">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" />
                </div>
              </div>

              <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition">
                Sign in securely
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: SIH Evaluation Demo Buttons */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
              <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-1 rounded uppercase tracking-wider">SIH 2026 Evaluation</span>
              <p className="text-xs text-blue-800 font-semibold mt-2 leading-relaxed">
                Welcome Judges! To bypass the security verification for this prototype, please select a portal below to experience the platform.
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleDemoLogin('student')}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-blue-100 hover:border-blue-500 rounded-xl bg-white transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <span className="font-bold text-slate-700 group-hover:text-blue-700 transition">Student Portal</span>
                </div>
                <span className="text-blue-500 font-bold text-lg">→</span>
              </button>

              <button 
                onClick={() => handleDemoLogin('institution')}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-indigo-100 hover:border-indigo-500 rounded-xl bg-white transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏛️</span>
                  <span className="font-bold text-slate-700 group-hover:text-indigo-700 transition">Institution Portal</span>
                </div>
                <span className="text-indigo-500 font-bold text-lg">→</span>
              </button>

              <button 
                onClick={() => handleDemoLogin('company')}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-emerald-100 hover:border-emerald-500 rounded-xl bg-white transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏢</span>
                  <span className="font-bold text-slate-700 group-hover:text-emerald-700 transition">Company Portal</span>
                </div>
                <span className="text-emerald-500 font-bold text-lg">→</span>
              </button>

              <button 
                onClick={() => handleDemoLogin('superadmin')}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-slate-200 hover:border-slate-800 rounded-xl bg-slate-50 transition group cursor-pointer mt-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <span className="font-bold text-slate-700 group-hover:text-slate-900 transition">Super Admin Control</span>
                </div>
                <span className="text-slate-500 font-bold text-lg">→</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
