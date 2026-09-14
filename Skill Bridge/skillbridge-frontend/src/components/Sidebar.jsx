import React from 'react';
import { Home, User, ClipboardList, BookOpen, Briefcase, FileText, FolderOpen, MessageSquare, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'My Profile', icon: User },
    { name: 'Skill Assessment', icon: ClipboardList },
    { name: 'Learning & Courses', icon: BookOpen },
    { name: 'Internships & Jobs', icon: Briefcase },
    { name: 'My Applications', icon: FileText },
    { name: 'Digital Portfolio', icon: FolderOpen },
    { name: 'Messages', icon: MessageSquare },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white text-xs">SB</span>
          </div>
          SkillBridge
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <item.icon size={18} className={item.active ? 'text-primary' : 'text-gray-400'} />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;