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
        // Fallback if backend is asleep
        setStudent({
          name: "Aarav Sharma",
          college: "Computer Science Engineering • 3rd Year • Tech College",
          verified_skills: 3,
          certifications: 2,
          projects: 5,
          skills: [
            { name: "Python", progress: 85, level: "Advanced" },
            { name: "React", progress: 60, level: "Basic" }
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

  if (loading) {
    return <div className="text-gray-500 font-medium py-10">Fetching student profile from FastAPI backend...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
              {student.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <p className="text-sm text-slate-500">{student.college}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{student.verified_skills}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Verified Skills</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{student.certifications}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Certifications</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{student.projects}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Projects</p>
            </div>
          </div>
        </div>

        {/* Action Card with Working Quiz Button */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">Assessment</span>
            <h3 className="text-lg font-bold mt-3">Test Your Skills</h3>
            <p className="text-xs text-blue-100 mt-1">Complete a quick technical check to get an instant verified badge.</p>
          </div>
          <button 
            onClick={() => { setShowQuiz(true); setQuizFinished(false); }}
            className="w-full mt-4 bg-white text-blue-700 font-semibold py-2.5 rounded-xl hover:bg-blue-50 transition shadow-sm cursor-pointer"
          >
            Take Skill Assessment →
          </button>
        </div>
      </div>

      {/* Verified Skills list from Backend */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-800 mb-4">My Verified Skills (Live from FastAPI)</h3>
        <div className="space-y-4">
          {student.skills.map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1 font-medium">
                <span className="text-slate-700">{skill.name}</span>
                <span className="text-blue-600 text-xs font-semibold">{skill.level}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowQuiz(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

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
                      className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition cursor-pointer ${
                        selectedAns === opt.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-800' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
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
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-800 mt-3">Skill Verified!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {selectedAns === 'b' 
                    ? "Great job! Your Verified Skills count increased, and 'FastAPI' was added to your skills list."
                    : "Review FastAPI routes and try again to earn the badge."}
                </p>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="mt-5 bg-slate-900 text-white font-semibold px-6 py-2 rounded-xl hover:bg-slate-800 text-sm cursor-pointer"
                >
                  Close & View Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
