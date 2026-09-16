import React, { useState } from 'react';

const Learning = () => {
  // We use state to switch between viewing 'Recommended' courses and 'In Progress' courses
  const [activeTab, setActiveTab] = useState('recommended');

  // Mock database of courses recommended by the AI
  const recommendedCourses = [
    {
      id: 1,
      title: "Docker & Kubernetes for Developers",
      provider: "SkillBridge Advanced",
      duration: "4 Weeks",
      level: "Intermediate",
      tags: ["Cloud", "DevOps"],
      matchReason: "Fills your 'Cloud Deployment' skill gap"
    },
    {
      id: 2,
      title: "Advanced SQL Optimization",
      provider: "Industry Partner: TechNova",
      duration: "2 Weeks",
      level: "Advanced",
      tags: ["Database", "Backend"],
      matchReason: "Required for 'Backend Developer' roles"
    }
  ];

  const inProgressCourses = [
    {
      id: 3,
      title: "ReactJS Modern Frontend Architecture",
      provider: "SkillBridge Core",
      progress: 65,
      lastAccessed: "2 days ago"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Personalized Guidance
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Learning & Upskilling</h2>
          <p className="text-sm text-blue-100 mt-1">AI-curated learning paths to bridge your specific skill gaps.</p>
        </div>
      </div>

      {/* Custom Tab Navigation */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('recommended')}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === 'recommended' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          AI Recommended Paths
        </button>
        <button
          onClick={() => setActiveTab('inprogress')}
          className={`px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === 'inprogress' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          In Progress
        </button>
      </div>

      {/* Dynamic Content Area based on State */}
      <div className="space-y-4 pt-2">
        
        {activeTab === 'recommended' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-cyan-300 transition duration-300">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase bg-amber-50 text-amber-700 border border-amber-100">
                      {course.level}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{course.provider}</p>
                  
                  <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex gap-2 items-start">
                    <span className="text-blue-600 text-sm">💡</span>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                      <span className="font-bold">AI Insight:</span> {course.matchReason}
                    </p>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-3 rounded-xl transition cursor-pointer shadow-sm">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inprogress' && (
          <div className="space-y-4">
            {inProgressCourses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{course.provider}</p>
                  <p className="text-xs text-slate-400 mt-2">Last accessed: {course.lastAccessed}</p>
                </div>
                
                <div className="w-full md:w-64">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                    <span>Course Progress</span>
                    <span className="text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer border border-blue-200">
                    Resume Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Learning;
