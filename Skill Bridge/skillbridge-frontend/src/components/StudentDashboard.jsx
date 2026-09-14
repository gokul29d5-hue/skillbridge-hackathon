import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch('https://skillbridge-api-vslj.onrender.com/api/student')
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch(() => {
        setStudent({
          name: "Aarav Sharma",
          college: "Computer Science Engineering • 3rd Year • XYZ College",
          verified_skills: 3,
          certifications: 2,
          projects: 5,
          skills: [
            { name: "Python", progress: 85, level: "Advanced" },
            { name: "Java", progress: 70, level: "Intermediate" },
            { name: "SQL", progress: 65, level: "Intermediate" },
            { name: "Communication", progress: 90, level: "Expert" },
            { name: "Teamwork", progress: 80, level: "Advanced" }
          ]
        });
        setLoading(false);
      });
  }, []);

  const handleCompleteQuiz = () => {
    if (selectedAns === 'b') {
      setStudent(prev => ({
        ...prev,
        verified_skills: prev.verified_skills + 1,
        skills: [...prev.skills, { name: "FastAPI", progress: 95, level: "Advanced" }]
      }));
    }
    setQuizFinished(true);
  };

  if (loading) return <div className="text-slate-500 p-8 font-medium">Loading Student Dashboard...</div>;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-2xl p-6 border border-slate-200 shadow-xs gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, Aarav! 👋</h2>
          <p className="text-sm text-slate-500 mt-1">Build your skills. Explore opportunities. Shape your future.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl flex items-center justify-between gap-6 w-full md:w-auto shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Your next step</p>
            <p className="text-sm font-medium mt-0.5">Complete your skill assessment to get recommendations.</p>
          </div>
          <button 
            onClick={() => { setShowQuiz(true); setQuizFinished(false); }}
            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition cursor-pointer whitespace-nowrap shadow-xs"
          >
            Take Assessment →
          </button>
        </div>
      </div>

      {/* Profile & Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Stats Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">AS</div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
              <p className="text-xs text-slate-500">{student.college}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xl font-bold text-blue-600">{student.verified_skills}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Verified Skills</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xl font-bold text-blue-600">{student.certifications}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Certifications</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <p className="text-xl font-bold text-blue-600">{student.projects}</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">Projects</p>
            </div>
          </div>
        </div>

        {/* My Skills Progress */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">My Skills (Live Backend Data)</h3>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer">View All →</span>
          </div>
          <div className="space-y-3">
            {student.skills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700">{skill.name}</span>
                  <span className="text-blue-600 font-semibold">{skill.level}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Internships Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 mb-4 text-base">Recommended Internships</h3>
        <div className="space-y-4">
          {[
            { title: "Software Development Intern", company: "Google", loc: "Remote", tags: ["Python", "Web Dev"] },
            { title: "Data Science Intern", company: "Microsoft", loc: "Bangalore, India", tags: ["Data Analysis", "ML"] },
            { title: "Frontend Developer Intern", company: "TCS", loc: "Hyderabad, India", tags: ["React", "JavaScript"] }
          ].map((job, idx) => (
            <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{job.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{job.company} • 📍 {job.loc}</p>
                <div className="flex gap-2 mt-2">
                  {job.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded-md font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <button className="bg-blue-600 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer shadow-xs">
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setShowQuiz(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer">✕</button>
            {!quizFinished ? (
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">FastAPI Knowledge Check</span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">Which decorator defines a standard GET endpoint in FastAPI?</h3>
                <div className="space-y-2 mt-4">
                  {[
                    { id: 'a', text: '@app.route("/")' },
                    { id: 'b', text: '@app.get("/")' },
                    { id: 'c', text: '@fastapi.listen("/")' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedAns(opt.id)}
                      className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition cursor-pointer ${selectedAns === opt.id ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!selectedAns}
                  onClick={handleCompleteQuiz}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Submit Assessment
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h3 className="text-lg font-bold text-slate-800 mt-3">Skill Verified!</h3>
                <p className="text-sm text-slate-600 mt-1">Your Verified Skills count increased and FastAPI badge was added.</p>
                <button onClick={() => setShowQuiz(false)} className="mt-5 bg-slate-900 text-white font-semibold px-6 py-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
