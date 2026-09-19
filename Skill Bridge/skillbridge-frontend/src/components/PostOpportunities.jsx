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
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Dynamically use the correct live API URL
  const API_URL = import.meta.env.VITE_API_URL || 'https://skillbridge-api-live.onrender.com';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Safely get company ID from localStorage
    let user;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      user = null;
    }

    // If no user is logged in, use a fallback company ID (e.g., 2) so the app doesn't break during testing
    const companyId = user && user.id ? user.id : 2; 

    try {
      const response = await fetch(`${API_URL}/api/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          job_type: formData.job_type,
          location: formData.location,
          stipend: formData.stipend,
          skills: formData.skills,
          description: formData.description || "Detailed responsibilities and requirements will be discussed during the interview.",
          company_id: companyId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Opportunity posted successfully to the live database!' });
        setFormData({ title: '', job_type: 'Internship', location: '', stipend: '', skills: '', description: '' });
      } else {
        setStatus({ type: 'error', message: `Could not post: ${typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)}` });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error posting opportunity. Check your API URL connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-sm">
        <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">Recruitment Pipeline</span>
        <h1 className="text-3xl font-extrabold mt-4 mb-2">Post an Opportunity</h1>
        <p className="text-slate-400 text-sm">Broadcast internships and full-time roles directly to verified student talent.</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        
        {status.message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Opportunity Title</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Junior React Developer"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Role Type</label>
              <select 
                name="job_type" 
                value={formData.job_type} 
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
              <input 
                type="text" 
                name="location"
                required
                value={formData.location} 
                onChange={handleChange} 
                placeholder="e.g. Remote, Bangalore, Chennai"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Stipend / Salary</label>
              <input 
                type="text" 
                name="stipend"
                required
                value={formData.stipend} 
                onChange={handleChange} 
                placeholder="e.g. $1500/month or ₹30,000/month"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Required Skills (Comma Separated)</label>
              <input 
                type="text" 
                name="skills"
                required
                value={formData.skills} 
                onChange={handleChange} 
                placeholder="e.g. Python, React, SQL"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description</label>
              <textarea 
                name="description"
                required
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe the responsibilities, requirements, and benefits..."
                rows="4"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Posting...' : 'Post Opportunity'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PostOpportunities;
