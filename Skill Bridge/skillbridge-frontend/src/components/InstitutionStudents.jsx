import React, { useState } from 'react';

const InstitutionStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock database of students enrolled in the institution
  const [students, setStudents] = useState([
    { id: "STU-8821", name: "Aditi Sharma", branch: "B.Tech IT", year: "3rd Year", readinessScore: 94, status: "Active" },
    { id: "STU-9014", name: "Rahul Verma", branch: "B.Tech CSE", year: "4th Year", readinessScore: 88, status: "Active" },
    { id: "STU-7732", name: "Priya Patel", branch: "B.Tech IT", year: "4th Year", readinessScore: 82, status: "In Interview" },
    { id: "STU-6541", name: "Vikram Singh", branch: "B.Tech ECE", year: "3rd Year", readinessScore: 45, status: "Needs Attention" },
    { id: "STU-9922", name: "Neha Gupta", branch: "B.Tech CSE", year: "3rd Year", readinessScore: 60, status: "Active" }
  ]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-white/20">
            Student Management
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Enrolled Students Roster</h2>
          <p className="text-sm text-blue-100 mt-1">Monitor individual placement readiness and platform activity.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 bg-white/90 focus:bg-white outline-none border-2 border-transparent focus:border-blue-300 transition shadow-sm"
          />
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap">
            + Provision Student
          </button>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Branch & Year</th>
                <th className="p-4 text-center">AI Readiness Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition duration-150">
                  <td className="p-4 text-sm font-mono text-slate-500">{student.id}</td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-slate-800">{student.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-semibold text-slate-700">{student.branch}</p>
                    <p className="text-xs text-slate-500">{student.year}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-full rounded-full ${student.readinessScore >= 80 ? 'bg-emerald-500' : student.readinessScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{ width: `${student.readinessScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8">{student.readinessScore}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      student.status === 'Active' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      student.status === 'In Interview' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-bold transition">
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">No students found matching your search.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default InstitutionStudents;
