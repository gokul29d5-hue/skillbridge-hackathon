import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import InstitutionDashboard from './components/InstitutionDashboard';
import CompanyDashboard from './components/CompanyDashboard';

function App() {
  const [currentRole, setCurrentRole] = useState('student');
  const [serverStatus, setServerStatus] = useState('Connecting to backend...');

  // This is the magic bridge! It fetches data from your Python server.
  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then((response) => response.json())
      .then((data) => {
        setServerStatus(data.message); // This grabs "SkillBridge API is LIVE! 🚀"
      })
      .catch((error) => {
        setServerStatus('Backend is offline (Start it with uvicorn!)');
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar currentRole={currentRole} setCurrentRole={setCurrentRole} />
        
        <main className="p-8 pb-16">
          {/* Live API Status Badge */}
          <div className="mb-6 flex items-center gap-3 bg-blue-50 border border-blue-200 p-3 rounded-xl w-fit">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-bold text-blue-800">
              System Status: <span className="font-medium">{serverStatus}</span>
            </p>
          </div>

          {currentRole === 'student' && <StudentDashboard />}
          {currentRole === 'institution' && <InstitutionDashboard />}
          {currentRole === 'company' && <CompanyDashboard />}
        </main>
      </div>
    </div>
  );
}

export default App;