import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLoginMode ? '/api/login' : '/api/signup';
    const url = `https://skillbridge-api-vslj.onrender.com${endpoint}`;

    const payload = isLoginMode 
      ? { email, password } 
      : { name, email, password, role };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      if (isLoginMode) {
        onLoginSuccess(data.role);
      } else {
        alert("✅ Account created successfully in the database! Please log in.");
        setIsLoginMode(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google authentication UI is ready! We will connect this to Google Cloud API keys in a later step.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 text-center bg-blue-600 text-white transition-all duration-300">
          <h2 className="text-3xl font-bold">SkillBridge</h2>
          <p className="text-blue-100 mt-2 text-sm">
            {isLoginMode ? "Securely sign in to your portal" : "Create your account"}
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-xl text-center">
              {error}
            </div>
          )}

          {!isLoginMode && (
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
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name / Organization</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 mt-4 shadow-sm"
            >
              {isLoading ? "Processing..." : (isLoginMode ? "Secure Login" : "Create Account")}
            </button>
          </form>

          {/* NEW: Google Login Section */}
          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-slate-400 uppercase font-bold tracking-wider">Or continue with</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition cursor-pointer mt-4 shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="mt-6 text-center">
            <button 
              type="button" 
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
              }} 
              className="text-sm text-slate-500 hover:text-blue-600 font-semibold cursor-pointer transition-colors"
            >
              {isLoginMode ? "Don't have an account? Sign up here." : "Already have an account? Log in."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
