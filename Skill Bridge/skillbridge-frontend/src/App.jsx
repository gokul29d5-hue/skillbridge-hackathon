import React, { useState } from 'react';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import InstitutionDashboard from './components/InstitutionDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import SkillAssessment from './components/SkillAssessment';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLoginSuccess = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <h1 className="text-xl font-bold text-slate-800">SkillBridge</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="bg-slate-100 text-slate-600 text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200">
            {role} Portal
          </span>
          
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
        {/* Dynamic Sidebar */}
        <aside className="w-64 border-r border-slate-200 p-6 hidden md:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          {role === 'student' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">🎓</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-xs">SkillBridge</h2>
                  <p className="text-[10px] text-slate-500">Student Portal</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'profile', label: 'My Profile', icon: '👤' },
                  { id: 'skill_assessment', label: 'Skill Assessment', icon: '📊' },
                  { id: 'learning', label: 'Learning & Courses', icon: '📖' },
                  { id: 'internships', label: 'Internships & Jobs', icon: '💼' },
                  { id: 'applications', label: 'My Applications', icon: '📄' },
                  { id: 'portfolio', label: 'Digital Portfolio', icon: '📁' },
                  { id: 'messages', label: 'Messages', icon: '💬' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                      activeTab === item.id ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ) : role === 'institution' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">🎓</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-xs">SkillBridge</h2>
                  <p className="text-[10px] text-slate-500">Institution Portal</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'students', label: 'Students', icon: '👤' },
                  { id: 'opportunities', label: 'Opportunities', icon: '💼' },
                  { id: 'collaboration', label: 'Industry Collaboration', icon: '🤝' },
                  { id: 'analytics', label: 'Skill & Curriculum Analytics', icon: '📊' },
                  { id: 'applications', label: 'Applications & Tracking', icon: '📄' },
                  { id: 'reports', label: 'Reports', icon: '📈' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                      activeTab === item.id ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">🏢</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-xs">SkillBridge</h2>
                  <p className="text-[10px] text-slate-500">Company Portal</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
                  { id: 'post_opportunities', label: 'Post Opportunities', icon: '💼' },
                  { id: 'talent_pool', label: 'Talent Pool', icon: '👥' },
                  { id: 'applications', label: 'Applications', icon: '📄' },
                  { id: 'learning_programs', label: 'Learning Programs', icon: '📖' },
                  { id: 'industry_collaboration', label: 'Industry Collaboration', icon: '🤝' },
                  { id: 'feedback', label: 'Feedback & Insights', icon: '💬' },
                  { id: 'analytics_reports', label: 'Analytics & Reports', icon: '📈' },
                  { id: 'company_profile', label: 'Company Profile', icon: '🏢' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition cursor-pointer ${
                      activeTab === item.id ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </aside>

        {/* Dashboard Content area with explicit routing */}
        <main className="flex-1 p-6 md:p-8">
          {role === 'student' && activeTab === 'dashboard' && <StudentDashboard />}
          {role === 'student' && activeTab === 'skill_assessment' && <SkillAssessment />}
          {role === 'student' && activeTab !== 'dashboard' && activeTab !== 'skill_assessment' && (
            <div className="flex items-center justify-center h-64 text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-xs">
              {activeTab.replace('_', ' ').toUpperCase()} Module - Coming Soon
            </div>
          )}

          {role === 'institution' && <InstitutionDashboard />}
          {role === 'company' && <CompanyDashboard />}
        </main>
      </div>
    </div>
  );
}

export default App;
