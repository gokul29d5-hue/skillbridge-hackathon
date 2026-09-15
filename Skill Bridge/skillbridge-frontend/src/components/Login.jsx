import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('institution'); 
  const [secretCode, setSecretCode] = useState(''); // New state for the secret key
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLoginMode 
      ? 'https://skillbridge-api-vslj.onrender.com/api/login' 
      : 'https://skillbridge-api-vslj.onrender.com/api/signup';

    const payload = isLoginMode 
      ? { email, password } 
      : { name, email, password, role, secret_code: secretCode }; // Pass secret code to backend

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      if (isLoginMode) {
        localStorage.setItem('skillbridge_logged_in', 'true');
        localStorage.setItem('skillbridge_role', data.role);
        localStorage.setItem('skillbridge_name', data.name);
        onLoginSuccess(data.role);
      } else {
        setIsLoginMode(true);
        setError('Account created successfully! Please log in.');
        setSecretCode(''); // Clear it on success
      }
    } catch (err) {
      setError(err.message || 'Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-xl font-bold shadow-sm">
            S
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800">SkillBridge</h1>
          <p className="text-xs text-slate-500">
            {isLoginMode ? 'Sign in to access your portal' : 'Create your partner account'}
          </p>
        </div>

        {error && (
          <div className={`p-3 rounded-xl text-xs font-semibold text-center ${error.includes('successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm" />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm" />
          </div>

          {!isLoginMode && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-white">
                  <option value="institution">Institution / College Staff</option>
                  <option value="company">Company / Recruiter</option>
                </select>
              </div>
              
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                  Admin Access Code
                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>
                </label>
                <input type="password" required value={secretCode} onChange={(e) => setSecretCode(e.target.value)} placeholder="Enter authorization key" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-white" />
                <p className="text-[10px] text-slate-500 mt-2 font-medium">To prevent unauthorized access, only verified staff with the master key can create accounts.</p>
              </div>
            </>
          )}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm cursor-pointer disabled:opacity-50">
            {loading ? 'Processing...' : isLoginMode ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
            {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
