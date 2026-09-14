import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/student')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(() => {
        setData({
          name: "Aarav Sharma",
          college: "Computer Science Engineering • 3rd Year • XYZ College",
          verified_skills: 3,
          certifications: 2,
          projects: 5,
          skills: [
            { name: "Python", progress: 85, level: "Advanced" },
            { name: "Java", progress: 70, level: "Intermediate" },
            { name: "SQL", progress: 65, level: "Intermediate" },
            { name: "Communication", progress: 50, level: "Basic" },
            { name: "Teamwork", progress: 90, level: "Advanced" }
          ]
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-slate-500 p-8 font-medium">Loading Student Dashboard...</div>;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Next Step Card Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-slate-800">Welcome back, {data.name}! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Build your skills. Explore opportunities. Shape your future.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-blue-100">Your Next Step</p>
            <p className="text-xs font-medium mt-1">Complete your skill assessment to get personalized learning recommendations.</p>
            <button className="mt-3 bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs hover:bg-blue-50 transition cursor-pointer">
              Take Assessment →
            </button>
          </div>
          <div className="text-3xl hidden sm:block">🎯</div>
        </div>
      </div>

      {/* Profile Card & Skills / Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold">AS</div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">{data.name}</h3>
                <p className="text-xs text-slate-500">{data.college}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-6 text-center border-t border-b border-slate-100 py-4">
              <div>
                <p className="text-lg font-extrabold text-slate-800">{data.verified_skills}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Verified Skills</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-800">{data.certifications}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Certifications</p>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-800">{data.projects}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Projects</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition cursor-pointer">
            Edit Profile
          </button>
        </div>

        {/* My Skills Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-sm">My Skills</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">View All →</span>
          </div>
          <div className="space-y-3">
            {data.skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700">{skill.name}</span>
                  <span className="text-slate-400 text-[10px]">{skill.level}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Take Skill Assessment", icon: "📊" },
              { label: "Explore Internships", icon: "💼" },
              { label: "Browse Job Opportunities", icon: "🏢" },
              { label: "View Learning Programs", icon: "📖" },
              { label: "Update My Portfolio", icon: "📁" }
            ].map((action, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-xs font-medium text-slate-700 transition cursor-pointer border border-transparent hover:border-slate-100">
                <span className="flex items-center gap-2"><span>{action.icon}</span> {action.label}</span>
                <span className="text-slate-400">›</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Internships & Learning Paths Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommended Internships */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Recommended Internships</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">View All →</span>
          </div>
          <div className="space-y-3">
            {[
              { role: "Software Development Intern", company: "Google", location: "Remote", tags: ["Python", "App Development"] },
              { role: "Data Science Intern", company: "Microsoft", location: "Bangalore, India", tags: ["Data Analysis", "Machine Learning"] },
              { role: "Frontend Developer Intern", company: "TCS", location: "Hyderabad, India", tags: ["React", "JavaScript"] }
            ].map((job, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{job.role}</h4>
                  <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                  <div className="flex gap-1 mt-2">
                    {job.tags.map((t, i) => (
                      <span key={i} className="text-[9px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Paths */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Recommended Learning Paths</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">View All →</span>
          </div>
          <div className="space-y-3">
            {[
              { title: "Full Stack Web Development", provider: "Coursera • 6 weeks", tags: ["Python", "React", "Node.js"] },
              { title: "Data Science Fundamentals", provider: "edX • 4 weeks", tags: ["Python", "Data Analysis"] },
              { title: "Communication Skills for Professionals", provider: "LinkedIn • 2 weeks", tags: ["Soft Skills", "Career Growth"] }
            ].map((course, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{course.title}</h4>
                  <p className="text-[11px] text-slate-500">{course.provider}</p>
                  <div className="flex gap-1 mt-2">
                    {course.tags.map((t, i) => (
                      <span key={i} className="text-[9px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
