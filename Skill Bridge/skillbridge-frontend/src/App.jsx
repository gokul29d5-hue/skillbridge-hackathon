import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import InstitutionDashboard from './components/InstitutionDashboard';
import CompanyDashboard from './components/CompanyDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student');

  // This runs when they click the "Login" button on the Login screen
  const handleLoginSuccess = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // The Gatekeeper: If they aren't logged in, ONLY show the Login page
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // If they are logged in, show the main application
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <h1 className="text-xl font-bold text-slate-800">SkillBridge</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Quick role switcher kept here so you can fast-switch during the demo */}
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-100 border-none text-sm font-medium rounded-lg px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-600"
          >
            <option value="student">Student View</option>
            <option value="institution">Institution View</option>
            <option value="company">Company View</option>
          </select>
          
          <button 
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-200 p-6 hidden md:block">
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold">
              <span className="text-lg">📊</span> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition">
              <span className="text-lg">👤</span> My Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition">
              <span className="text-lg">💬</span> Messages
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition">
              <span className="text-lg">⚙️</span> Settings
            </a>
          </nav>
        </aside>

        {/* Dashboard Content area that swaps based on role */}
        <main className="flex-1 p-6 md:p-8">
          {role === 'student' && <StudentDashboard />}
          {role === 'institution' && <InstitutionDashboard />}
          {role === 'company' && <CompanyDashboard />}
        </main>
      </div>
    </div>
  );
}

export default App;
