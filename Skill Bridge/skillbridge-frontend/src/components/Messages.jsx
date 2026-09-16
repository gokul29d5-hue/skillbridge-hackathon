import React, { useState } from 'react';

const Messages = () => {
  // State to track which conversation is currently open
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  // Mock database of conversations
  const conversations = [
    {
      id: 1,
      sender: "TechNova Recruitment",
      role: "Company",
      avatar: "🏢",
      lastDate: "Today, 10:30 AM",
      messages: [
        { text: "Hello! We reviewed your verified Digital Portfolio and were very impressed by your Smart Water Management project.", isMine: false, time: "10:15 AM" },
        { text: "Would you be available for a technical round this Friday?", isMine: false, time: "10:16 AM" },
        { text: "Thank you! Yes, I am available this Friday. What time works best for your team?", isMine: true, time: "10:30 AM" }
      ]
    },
    {
      id: 2,
      sender: "Prof. Sharma",
      role: "Institution Mentor",
      avatar: "👨‍🏫",
      lastDate: "Yesterday",
      messages: [
        { text: "Make sure you complete the 'Cloud Native' module before applying to the AWS challenge.", isMine: false, time: "4:00 PM" },
        { text: "Will do, sir. I am at 65% completion right now.", isMine: true, time: "4:15 PM" }
      ]
    },
    {
      id: 3,
      sender: "Global NGO Alliance",
      role: "Community Challenge",
      avatar: "🌍",
      lastDate: "Sep 12",
      messages: [
        { text: "Your pull request for the Rural Edu App has been merged! Your contribution ledger has been updated.", isMine: false, time: "11:00 AM" }
      ]
    }
  ];

  // Find the data for the currently selected chat
  const currentConversation = conversations.find(chat => chat.id === activeChat);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    alert(`Message sent: "${newMessage}"\n\n(In production, this would securely POST to your FastAPI backend!)`);
    setNewMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] min-h-[600px] flex gap-6">
      
      {/* Left Sidebar: Conversation List */}
      <div className="w-1/3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden hidden md:flex">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-extrabold text-slate-800">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map(chat => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full text-left p-3 rounded-xl transition flex items-center gap-3 ${
                activeChat === chat.id ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm shrink-0">
                {chat.avatar}
              </div>
              <div className="overflow-hidden">
                <h3 className={`text-sm font-bold truncate ${activeChat === chat.id ? 'text-blue-800' : 'text-slate-700'}`}>
                  {chat.sender}
                </h3>
                <p className="text-[10px] text-slate-500 font-semibold truncate">{chat.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Area: Active Chat Window */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xl shadow-sm">
            {currentConversation.avatar}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">{currentConversation.sender}</h2>
            <p className="text-xs text-slate-500 font-medium">{currentConversation.role}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {currentConversation.messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.isMine 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] font-semibold text-slate-400 mt-1 mx-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm shadow-sm"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow-sm"
            >
              Send
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Messages;
