import React, { useState, useEffect } from 'react';

const Profile = () => {
  const studentName = localStorage.getItem('skillbridge_name') || 'Student Name';
  
  // State to toggle between View and Edit modes
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile Data State
  const [profileData, setProfileData] = useState({
    name: studentName,
    headline: "B.Tech Information Technology Student | Aspiring Software Engineer",
    email: "student@college.edu",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    college: "Vel Tech Multi Tech Engineering College",
    passingYear: "2026",
    bio: "Passionate about full-stack development and cloud architecture. Currently building scalable web applications and preparing for industry placements. Strong foundation in Python and React.",
    github: "github.com/student",
    linkedin: "linkedin.com/in/student"
  });

  // Handle input changes during edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you would send a PUT request to your backend here
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-start">
            <div className="relative -mt-12 flex items-end space-x-4">
              <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md">
                <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-slate-500">
                  {profileData.name.charAt(0)}
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-extrabold text-slate-800">{profileData.name}</h2>
                {isEditing ? (
                  <input 
                    type="text" name="headline" value={profileData.headline} onChange={handleChange}
                    className="w-full text-sm mt-1 px-3 py-1 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <p className="text-sm text-slate-500 font-medium">{profileData.headline}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              {isEditing ? (
                <div className="space-x-3">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer">Cancel</button>
                  <button onClick={handleSave} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer shadow-sm">Save Profile</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-lg transition cursor-pointer shadow-sm">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Personal & Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                {isEditing ? (
                  <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full text-sm mt-1 px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                ) : (
                  <p className="text-sm text-slate-700 font-medium">{profileData.email}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                {isEditing ? (
                  <input type="text" name="phone" value={profileData.phone} onChange={handleChange} className="w-full text-sm mt-1 px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                ) : (
                  <p className="text-sm text-slate-700 font-medium">{profileData.phone}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                {isEditing ? (
                  <input type="text" name="location" value={profileData.location} onChange={handleChange} className="w-full text-sm mt-1 px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                ) : (
                  <p className="text-sm text-slate-700 font-medium">{profileData.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Web Links</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">LinkedIn</label>
                {isEditing ? (
                  <input type="text" name="linkedin" value={profileData.linkedin} onChange={handleChange} className="w-full text-sm mt-1 px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                ) : (
                  <a href={`https://${profileData.linkedin}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-semibold hover:underline block">{profileData.linkedin}</a>
                )}
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">GitHub</label>
                {isEditing ? (
                  <input type="text" name="github" value={profileData.github} onChange={handleChange} className="w-full text-sm mt-1 px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                ) : (
                  <a href={`https://${profileData.github}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-semibold hover:underline block">{profileData.github}</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Education */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">About Me</h3>
            {isEditing ? (
              <textarea 
                name="bio" value={profileData.bio} onChange={handleChange} rows="4"
                className="w-full text-sm mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Education History</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-200">
                🎓
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">College / University</label>
                      <input type="text" name="college" value={profileData.college} onChange={handleChange} className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Expected Passing Year</label>
                      <input type="text" name="passingYear" value={profileData.passingYear} onChange={handleChange} className="w-full text-sm px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-base font-bold text-slate-800">{profileData.college}</h4>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Undergraduate Degree</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">Expected Graduation: {profileData.passingYear}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Resume Upload Module (Visual Only) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Resume & Documents</h3>
             <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer">
                <span className="text-3xl block mb-2">📄</span>
                <p className="text-sm font-bold text-blue-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400">PDF, DOCX up to 5MB</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
