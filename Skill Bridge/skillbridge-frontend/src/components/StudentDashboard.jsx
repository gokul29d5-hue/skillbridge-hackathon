import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  Briefcase, 
  Award, 
  Calendar, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const StudentDashboard = () => {
  const skills = [
    { name: 'Python', level: 'Advanced', percent: 85, color: 'bg-emerald-500' },
    { name: 'Java', level: 'Intermediate', percent: 65, color: 'bg-blue-600' },
    { name: 'SQL', level: 'Intermediate', percent: 60, color: 'bg-blue-500' },
    { name: 'Communication', level: 'Basic', percent: 40, color: 'bg-amber-500' },
    { name: 'Teamwork', level: 'Advanced', percent: 90, color: 'bg-emerald-500' },
  ];

  const internships = [
    {
      title: 'Software Development Intern',
      company: 'Google',
      location: 'Remote',
      tags: ['Python', 'Web Development', '+2'],
      badge: 'G',
      badgeColor: 'text-red-500 bg-red-50',
    },
    {
      title: 'Data Science Intern',
      company: 'Microsoft',
      location: 'Bangalore, India',
      tags: ['Data Analysis', 'Machine Learning', '+1'],
      badge: 'M',
      badgeColor: 'text-blue-500 bg-blue-50',
    },
    {
      title: 'Frontend Developer Intern',
      company: 'TCS',
      location: 'Hyderabad, India',
      tags: ['React', 'JavaScript', '+1'],
      badge: 'T',
      badgeColor: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const learningPaths = [
    {
      title: 'Full Stack Web Development',
      provider: 'Coursera • 6 weeks',
      tags: ['Python', 'React', 'Node.js'],
      badge: '∞',
      badgeColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Data Science Fundamentals',
      provider: 'edX • 8 weeks',
      tags: ['Python', 'Data Analysis', 'ML'],
      badge: 'edX',
      badgeColor: 'text-gray-800 bg-gray-100',
    },
    {
      title: 'Communication Skills for Professionals',
      provider: 'LinkedIn Learning • 4 weeks',
      tags: ['Soft Skills', 'Career Growth'],
      badge: 'in',
      badgeColor: 'text-blue-700 bg-blue-50',
    },
  ];

  const events = [
    { day: '12', month: 'Apr', title: 'Industry Guest Lecture', org: 'TCS • 11:00 AM - 12:00 PM', desc: 'Future of AI in Software Development', status: 'Live', statusColor: 'bg-emerald-50 text-emerald-600' },
    { day: '15', month: 'Apr', title: 'Webinar: Career Guidance', org: 'SkillBridge • 4:00 PM - 5:00 PM', desc: 'Resume Building & Interview Tips', status: 'Online', statusColor: 'bg-blue-50 text-blue-600' },
    { day: '18', month: 'Apr', title: 'Hackathon 2026', org: 'XYZ College • 9:00 AM - 5:00 PM', desc: 'Build • Innovate • Grow', status: 'Onsite', statusColor: 'bg-purple-50 text-purple-600' },
  ];

  const applications = [
    { role: 'Software Development Intern', company: 'Google', status: 'Applied', color: 'bg-blue-50 text-blue-600' },
    { role: 'Data Science Intern', company: 'Microsoft', status: 'Shortlisted', color: 'bg-emerald-50 text-emerald-600' },
    { role: 'Frontend Developer Intern', company: 'TCS', status: 'Under Review', color: 'bg-amber-50 text-amber-600' },
    { role: 'Machine Learning Intern', company: 'Infosys', status: 'Rejected', color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl">
                AS
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Aarav Sharma</h2>
                <p className="text-sm text-gray-500">Computer Science Engineering</p>
                <p className="text-xs text-gray-400 mt-0.5">2nd Year • XYZ College</p>
              </div>
            </div>
            <button className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Verified Skills</div>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">5</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">Projects</div>
            </div>
          </div>
        </div>

        {/* Next Step Callout */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Your next step</span>
            <h3 className="text-base font-semibold text-gray-800 mt-2">
              Complete your skill assessment to get personalized learning recommendations.
            </h3>
          </div>
          <button className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors w-fit">
            Take Assessment <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Middle Row: Skills Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Skills */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">My Skills</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-gray-800 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Take Skill Assessment', icon: Award },
              { label: 'Explore Internships', icon: Briefcase },
              { label: 'Browse Job Opportunities', icon: TrendingUp },
              { label: 'View Learning Programs', icon: BookOpen },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left text-sm font-medium text-gray-700">
                <div className="flex items-center gap-3">
                  <action.icon size={16} className="text-blue-600" />
                  <span>{action.label}</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Internships & Learning Paths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Internships */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recommended Internships</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {internships.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:border-blue-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base ${item.badgeColor}`}>
                    {item.badge}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.company} • {item.location}</p>
                    <div className="flex gap-1.5 mt-2">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Paths */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Recommended Learning Paths</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {learningPaths.map((path, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:border-blue-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${path.badgeColor}`}>
                    {path.badge}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{path.title}</h4>
                    <p className="text-xs text-gray-500">{path.provider}</p>
                    <div className="flex gap-1.5 mt-2">
                      {path.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Events, Applications, Digital Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Upcoming Events</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-3">
            {events.map((ev, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center w-10 h-12 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold leading-tight">
                  <span>{ev.day}</span>
                  <span className="text-[10px] uppercase font-normal">{ev.month}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-gray-800 truncate">{ev.title}</h5>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${ev.statusColor}`}>{ev.status}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{ev.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">My Applications</h3>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-3">
            {applications.map((app, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 border-b border-gray-50 last:border-none">
                <div>
                  <h5 className="text-xs font-semibold text-gray-800">{app.role}</h5>
                  <p className="text-[11px] text-gray-400">{app.company}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${app.color}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Portfolio */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800">My Digital Portfolio</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="flex items-center gap-4 my-3">
              <div className="relative w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-sm text-gray-800">
                85%
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Profile Completeness</p>
                <p className="text-[11px] text-gray-400">Add GitHub projects to reach 100%</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-500" /> Resume Uploaded</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-500" /> 2 Certifications Verified</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-500" /> 5 Projects Linked</div>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors">
            View Portfolio →
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;