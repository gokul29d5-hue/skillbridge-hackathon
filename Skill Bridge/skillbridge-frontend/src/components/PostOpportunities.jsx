import React, { useState } from 'react';

const PostOpportunities = () => {
  // We use one state object to manage the entire form memory
  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    location: 'Hybrid',
    stipend: '',
    skills: '',
    description: ''
  });

  // This helper function updates the exact field the user is typing in
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Success! "${formData.title}" has been broadcasted to the Student Portal.\n\nStudents matching the required skills will be notified by the Gemini AI engine.`);
    // Clear the form after submission
    setFormData({ title: '', type: 'Internship', location: 'Hybrid', stipend: '', skills: '', description: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Talent Acquisition
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Post a New Opportunity</h2>
          <p className="text-sm text-emerald-100 mt-1">Publish internships, jobs, or community challenges to verified students.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Role Title</label>
              <input 
                type="text" 
                name="title"
                required
                placeholder="e.g., Junior React Developer"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Opportunity Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time Placement">Full-Time Placement</option>
                <option value="Community Challenge">Community Challenge</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Location Setting</label>
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm bg-white"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700">Stipend / Salary</label>
              <input 
                type="text" 
                name="stipend"
                placeholder="e.g., ₹15,000/month or 6 LPA"
                value={formData.stipend}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Required Skills (Comma separated)</label>
            <input 
              type="text" 
              name="skills"
              required
              placeholder="e.g., React, Node.js, PostgreSQL"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Description & Responsibilities</label>
            <textarea 
              name="description"
              required
              rows="4"
              placeholder="Describe the day-to-day tasks and expected outcomes..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-sm resize-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-sm"
            >
              Broadcast Opportunity
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default PostOpportunities;
