'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Search, 
  User, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const conversations = [
  { id: '1', visitor: 'Visitor #4829', lastMessage: 'What is the deposit amount for the Riverside Loft?', time: '2 mins ago', leadCaptured: true, transcript: [
    { role: 'visitor', text: 'Hi, I saw the Riverside Loft listing.' },
    { role: 'bot', text: 'Hello! I can help you with that. Would you like to know the price or schedule a viewing?' },
    { role: 'visitor', text: 'What is the deposit amount?' },
    { role: 'bot', text: 'The deposit for Riverside Loft is typically 2 months rent ($4,000). Would you like to see the full list of requirements?' }
  ]},
  { id: '2', visitor: 'Visitor #4830', lastMessage: 'Thanks, I will think about it.', time: '1 hour ago', leadCaptured: false, transcript: [
    { role: 'visitor', text: 'Do you have anything under $600k in the downtown area?' },
    { role: 'bot', text: 'We have a few options! The Skyview Condos start at $580k. Would you like me to send you the floor plans?' }
  ]},
];

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Chat List */}
        <div className="w-full lg:w-80 flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h1 className="text-xl font-bold text-slate-900 mb-4">Conversations</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-600/20 outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "p-5 cursor-pointer transition-all hover:bg-slate-50 flex flex-col gap-2",
                  selectedChat.id === chat.id ? "bg-blue-50/50 border-l-4 border-l-blue-600" : ""
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">{chat.visitor}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">{chat.lastMessage}</p>
                <div className="flex items-center gap-2 mt-1">
                  {chat.leadCaptured ? (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full uppercase">
                      <CheckCircle2 size={8} /> Lead Captured
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase">Anonymous</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="flex-1 flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative">
          {/* Chat Header */}
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedChat.visitor}</h3>
                <p className="text-[10px] text-slate-500 font-medium">Session started {selectedChat.time}</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Transcript */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-slate-50/30">
            {selectedChat.transcript.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col max-w-[80%]",
                msg.role === 'bot' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "flex items-center gap-2 mb-1.5",
                  msg.role === 'bot' ? "flex-row-reverse" : ""
                )}>
                  {msg.role === 'bot' ? (
                    <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center text-white">
                      <Sparkles size={10} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-slate-200 rounded-md flex items-center justify-center text-slate-500">
                      <User size={10} />
                    </div>
                  )}
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {msg.role === 'bot' ? 'Estate Assistant' : 'Visitor'}
                  </span>
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'bot' 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Footer - Read Only */}
          <div className="p-6 bg-white border-t border-slate-50 flex items-center justify-center">
            <p className="text-xs text-slate-400 font-medium italic">Transcript is read-only. AI managed this conversation.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
