import React, { useState } from 'react';

const Settings = ({ role }) => {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: role === 'student' ? 'Aarav Sharma' : role === 'institution' ? 'Vel Tech Institution' : 'TechNova Solutions',
    email: 'gokul1032k24@gmail.com',
    notifications: true,
    darkMode: false,
    twoFactor: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Account Settings ⚙️</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your {role} portal preferences and security configurations.</p>
        </div>
        <span className="bg-slate-100 text-slate-700 text-xs font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200">
          {role} mode
        </span>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-xl text-center">
          ✅ Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {role === 'company' ? 'Company Name' : role === 'institution' ? 'Institution Name' : 'Full Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm bg-slate-50 text-slate-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Preferences & Notifications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3">Preferences & Security</h3>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
              <div>
                <p className="font-bold text-slate-800 text-xs">Email Notifications</p>
                <p className="text-[11px] text-slate-500">Receive alerts regarding new applications and messages.</p>
              </div>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
              <div>
                <p className="font-bold text-slate-800 text-xs">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-slate-500">Add an extra layer of security to your account login.</p>
              </div>
              <input
                type="checkbox"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
