import React, { useState } from 'react';

const SkillAssessment = () => {
  const [selectedSkill, setSelectedSkill] = useState('Python');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Mock Assessment Questions Database
  const assessments = {
    Python: [
      {
        question: "Which of the following is used to define a block of code in Python language?",
        options: ["Indentation", "Key", "Brackets", "Parentheses"],
        correct: 0
      },
      {
        question: "Which of the following keywords is used for creating a function in Python?",
        options: ["function", "def", "fun", "define"],
        correct: 1
      },
      {
        question: "What is the output of `print(type(1 / 2))` in Python 3?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        correct: 1
      }
    ],
    React: [
      {
        question: "What is the primary purpose of ReactJS?",
        options: ["Database management", "Building user interfaces", "Server-side routing", "Compiled machine code"],
        correct: 1
      },
      {
        question: "Which Hook should be used to handle side effects in a functional component?",
        options: ["useState", "useContext", "useEffect", "useReducer"],
        correct: 2
      },
      {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JSONX", "JavaScript XML Syntax"],
        correct: 0
      }
    ]
  };

  const questions = assessments[selectedSkill] || assessments['Python'];

  const handleOptionSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-blue-500/50 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-400/30">
            AI-Powered Proctored Evaluation
          </span>
          <h2 className="text-2xl font-extrabold mt-2">Skill Verification & Assessment</h2>
          <p className="text-sm text-blue-100 mt-1">Pass AI skill assessments to automatically boost your profile visibility to corporate recruiters.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-center">
          <p className="text-xs font-medium text-blue-100">Selected Skill</p>
          <select 
            value={selectedSkill} 
            onChange={(e) => { setSelectedSkill(e.target.value); handleRetake(); }}
            className="mt-1 bg-white text-slate-800 font-bold text-sm px-3 py-1.5 rounded-lg outline-none cursor-pointer"
          >
            <option value="Python">Python Development</option>
            <option value="React">React Frontend</option>
          </select>
        </div>
      </div>

      {/* Main Assessment Container */}
      {!isSubmitted ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Progress Bar & Question Counter */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
            <span>QUESTION {currentQuestion + 1} OF {questions.length}</span>
            <span className="text-blue-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% COMPLETED</span>
          </div>

          {/* Question Display */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-snug">{questions[currentQuestion].question}</h3>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <div 
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                  answers[currentQuestion] === idx 
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold shadow-xs' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    answers[currentQuestion] === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
                <input 
                  type="radio" 
                  checked={answers[currentQuestion] === idx} 
                  onChange={() => {}} 
                  className="accent-blue-600"
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button 
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 disabled:opacity-30 cursor-pointer transition"
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button 
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-sm cursor-pointer transition"
              >
                Next Question
              </button>
            ) : (
              <button 
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < questions.length}
                className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-sm cursor-pointer transition disabled:opacity-50"
              >
                Submit Assessment
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-sm ${
            score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}>
            {score >= 70 ? '🏆' : '📈'}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-800">
              {score >= 70 ? 'Assessment Passed Successfully!' : 'Assessment Completed'}
            </h3>
            <p className="text-sm text-slate-500">
              {score >= 70 
                ? `Congratulations! You have verified your ${selectedSkill} skill with a score of ${score}%.`
                : `You scored ${score}%. A score of 70% or higher is required to earn the verified badge.`}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl max-w-md mx-auto border border-slate-200/60 text-left space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Skill Verified:</span>
              <span className="text-slate-800">{selectedSkill}</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Final Score:</span>
              <span className={score >= 70 ? 'text-emerald-600 font-extrabold' : 'text-amber-600 font-extrabold'}>{score}%</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Profile Badge Status:</span>
              <span className={score >= 70 ? 'text-emerald-600' : 'text-slate-400'}>{score >= 70 ? 'Verified & Active' : 'Pending Retake'}</span>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleRetake}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl text-xs transition shadow-sm cursor-pointer"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SkillAssessment;
