import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Navbar = ({ currentRole, setCurrentRole }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full shadow-sm">
      {/* Search Bar */}
      <div className="flex w-full max-w-xl items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search students, opportunities, companies, or skills..." 
          className="bg-transparent border-none outline-none w-full ml-2 text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right Side Icons & Profile Switcher */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          {/* Avatar logic based on role */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${
            currentRole === 'student' ? 'bg-blue-600' : 
            currentRole === 'institution' ? 'bg-purple-600' : 'bg-slate-800'
          }`}>
            {currentRole === 'student' ? 'AS' : currentRole === 'institution' ? 'DM' : 'T'}
          </div>
          
          {/* Role Switcher Dropdown */}
          <select 
            className="bg-transparent border-none text-sm font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-4 custom-select"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
          >
            <option value="student">Aarav Sharma (Student)</option>
            <option value="institution">Dr. Meenakshi (Institution)</option>
            <option value="company">TechNova Solutions (Company)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;