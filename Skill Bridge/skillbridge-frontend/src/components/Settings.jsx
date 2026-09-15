import React, { useState } from 'react';

const Settings = ({ role }) => {
  // Dynamic styling based on the user's role to match your sidebar themes
  const isCompany = role === 'company';
  const themeColorText = isCompany ? 'text-emerald-600' : 'text-blue-600';
  const themeColorBg = isCompany ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700';
  const themeColorFocus = isCompany ? 'focus:ring-emerald-600' : 'focus:ring-blue-600';
  const themeColorLightBg = isCompany ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700';

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    platformUpdates: true,
    newOpportunities: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    
    // Simulating an API call to update the password
    setTimeout(() => {
      setMessage("Your password has been successfully updated.");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1000);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800">Account Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your security preferences, notifications, and account details.</p>
        <div className={`inline-block mt-3 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${themeColorLightBg}`}>
          {role} Account
        </div>
      </div>

      {/* Security & Password Section */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800">Security & Password</h3>
          <p className="text-xs text-slate-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-5 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Current Password</label>
            <input 
              type="password" 
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password" 
              className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50 focus:ring-2 focus:bg-white transition ${themeColorFocus}`} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">New Password</label>
            <input 
              type="password" 
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="8+ characters" 
              className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50 focus:ring-2 focus:bg-white transition ${themeColorFocus}`} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Confirm New Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm 8+ characters" 
              className={`w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none text-sm bg-slate-50 focus:ring-2 focus:bg-white transition ${themeColorFocus}`} 
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className={`text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-sm cursor-pointer disabled:opacity-50 ${themeColorBg}`}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </section>

      {/* Notifications Section */}
      <section className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-800">Notification Preferences</h3>
          <p className="text-xs text-slate-500 mt-1">Control how and when you want to be notified by the platform.</p>
        </div>

        <div className="space-y-4">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer" onClick={() => toggleNotification('emailAlerts')}>
            <div>
              <p className="text-sm font-bold text-slate-800">Email Alerts</p>
              <p className="text-xs text-slate-500 mt-0.5">Receive daily summaries and critical account alerts via email.</p>
            </div>
            <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.emailAlerts ? themeColorBg : 'bg-slate-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${notifications.emailAlerts ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer" onClick={() => toggleNotification('platformUpdates')}>
            <div>
              <p className="text-sm font-bold text-slate-800">Platform Updates</p>
              <p className="text-xs text-slate-500 mt-0.5">Get notified about new features and system maintenance.</p>
            </div>
            <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.platformUpdates ? themeColorBg : 'bg-slate-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${notifications.platformUpdates ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>

          {/* Toggle 3 (Dynamic based on role) */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer" onClick={() => toggleNotification('newOpportunities')}>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {role === 'student' ? 'New Job Opportunities' : role === 'company' ? 'New Talent Alerts' : 'Institution Activity Alerts'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {role === 'student' ? 'Get instantly notified when matching jobs are posted.' : 'Get notified when high-matching students update their profiles.'}
              </p>
            </div>
            <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${notifications.newOpportunities ? themeColorBg : 'bg-slate-300'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${notifications.newOpportunities ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-red-700">Danger Zone</h3>
          <p className="text-xs text-red-500 mt-1">Irreversible and permanent actions for your account.</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-xl border border-red-100 shadow-sm">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm font-bold text-slate-800">Deactivate Account</p>
            <p className="text-xs text-slate-500 mt-0.5">Permanently remove your account and all associated data.</p>
          </div>
          <button onClick={() => alert("Please contact your Super Admin to perform account deletion.")} className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2.5 px-5 rounded-lg text-sm transition cursor-pointer whitespace-nowrap">
            Request Deactivation
          </button>
        </div>
      </section>

    </div>
  );
};

export default Settings;
