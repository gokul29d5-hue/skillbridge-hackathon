import React, { useState } from 'react';

const PostOpportunities = () => {
  const [formData, setFormData] = useState({
    title: '',
    job_type: 'Internship',
    location: '',
    stipend: '',
    skills: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          job_type: formData.job_type,
          location: formData.location,
          stipend: formData.stipend,
          skills: formData.skills,
          description: formData.description,
          company_id: parseInt(companyId)
        })
      });

      // NEW: Read the exact error from Python!
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to post opportunity");
      }
      
      setStatusMessage({ type: 'success', text: 'Success! Opportunity broadcasted to the Student Talent Pool.' });
      
      // Clear the form
      setFormData({
        title: '', job_type: 'Internship', location: '', stipend: '', skills: '', description: ''
      });
      
    } catch (error) {
      // NEW: Display the real error message on the screen
      setStatusMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }

    // In a production app, this ID comes from the logged-in user's session.
    // For your prototype, if it's missing, we default to 1 so the demo never breaks.
    const companyId = localStorage.getItem('skillbridge_user_id') || 1;

    try {
      const response = await fetch('https://skillbridge-api-vslj.onrender.com/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          job_type: formData.job_type,
          location: formData.location,
          stipend: formData.stipend,
          skills: formData.skills,
          description: formData.description,
          company_id: parseInt(companyId)
        })
      });

      if (!response.ok) throw new Error("Failed to post opportunity");
      
      setStatusMessage({ type: 'success', text: 'Success! Opportunity broadcasted to the Student Talent Pool.' });
      
      // Clear the form
      setFormData({
        title: '', job_type: 'Internship', location: '', stipend: '', skills: '', description: ''
      });
      
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error posting opportunity. Check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-500/30">
            Recruitment Pipeline
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Post an Opportunity</h2>
          <p className="text-sm text-slate-300 mt-1">Broadcast internships and full-time roles directly to verified student talent.</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
        
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold border ${statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Opportunity Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                required 
                placeholder="e.g. Junior React Developer" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Role Type</label>
              <select 
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Full-Time Placement">Full-Time Placement</option>
                <option value="Freelance/Contract">Freelance / Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                required 
                placeholder="e.g. Chennai (Hybrid) or Remote" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Stipend / Salary</label>
              <input 
                type="text" 
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                required 
                placeholder="e.g. ₹15,000/month" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Required Skills (Comma separated)</label>
              <input 
                type="text" 
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required 
                placeholder="e.g. React, Node.js, PostgreSQL" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Job Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required 
                rows="5"
                placeholder="Describe the responsibilities and what the student will learn..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition resize-none"
              ></textarea>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl text-sm font-bold text-white shadow-sm transition ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'}`}
            >
              {isSubmitting ? 'Broadcasting...' : 'Publish Opportunity'}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default PostOpportunities;
