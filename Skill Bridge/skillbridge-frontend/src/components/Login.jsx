import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLoginSuccess(role); // Tells the main app to load this specific dashboard
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email ID first to receive the reset link.");
      return;
    }
    alert(`✅ Password reset link successfully sent to: ${email}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 text-center bg-blue-600 text-white">
          <h2 className="text-3xl font-bold">SkillBridge</h2>
          <p className="text-blue-100 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="p-6">
          {/* Role Selection Tabs */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
            {['student', 'institution', 'company'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md capitalize transition cursor-pointer ${
                  role === r ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email ID</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none pr-10"
                placeholder="Enter your password"
              />
              {/* Working Eye Icon Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={handleForgotPassword} className="text-xs text-blue-600 hover:underline font-medium cursor-pointer">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer">
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <button type="button" onClick={handleLogin} className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer">
              <span className="text-lg">G</span> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
