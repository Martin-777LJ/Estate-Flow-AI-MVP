'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { format } from 'date-fns';
import { 
  MessageSquare, 
  User, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ConversationsPage() {
  const supabase = createClient();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('conversations')
        .select('*, leads(full_name, email)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setConversations(data);
      }
      setLoading(false);
    };

    fetchConversations();
  }, [supabase]);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Loading Transcripts...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">Conversations</h1>
        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-tight text-slate-400">AI Activity Stream</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Conversation List */}
        <div className="lg:col-span-4 bg-white border border-slate-200/60 rounded-[40px] overflow-hidden shadow-sm flex flex-col h-[750px]">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Recent Activity</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div 
                  key={conv.id} 
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    "p-8 cursor-pointer transition-all group relative",
                    selectedId === conv.id ? "bg-blue-50/50" : "hover:bg-slate-50/50"
                  )}
                >
                  {selectedId === conv.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        selectedId === conv.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:border-blue-100"
                      )}>
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-[13px]">
                          {conv.leads?.full_name || `Visitor ${conv.visitor_id.slice(0, 4)}`}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                          <Clock size={10} strokeWidth={3} />
                          {format(new Date(conv.created_at), 'h:mm a')}
                        </div>
                      </div>
                    </div>
                    {conv.lead_captured && (
                      <div className="bg-emerald-50 p-1.5 rounded-lg">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium line-clamp-2 italic leading-relaxed">
                    &quot;{conv.last_message}&quot;
                  </p>
                </div>
              ))
            ) : (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-200">
                  <MessageSquare size={32} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No chats yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Preview */}
        <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[40px] overflow-hidden shadow-sm flex flex-col h-[750px] relative">
          {selectedConversation ? (
            <>
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 border border-white/10">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 tracking-tight text-lg uppercase">
                      {selectedConversation.leads?.full_name || 'Anonymous Visitor'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} strokeWidth={3} />
                        Started {format(new Date(selectedConversation.created_at), 'MMM d, p')}
                      </span>
                      {selectedConversation.lead_captured && (
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">
                          Lead Captured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8FAFC]/50">
                {Array.isArray(selectedConversation.transcript) && selectedConversation.transcript.map((msg: any, i: number) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      msg.role === 'bot' ? "items-start" : "ml-auto items-end"
                    )}
                  >
                    <div className={cn(
                      "p-5 rounded-[28px] text-sm leading-relaxed shadow-sm",
                      msg.role === 'bot' 
                        ? "bg-white text-slate-800 border border-slate-100 rounded-tl-none font-medium" 
                        : "bg-slate-900 text-white rounded-tr-none font-bold"
                    )}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2 px-1">
                      {msg.role === 'bot' ? 'Assistant' : 'Visitor'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 bg-[#F8FAFC]/50 flex items-center justify-center p-20">
              <div className="text-center max-w-sm">
                <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center text-slate-100 mx-auto mb-8 shadow-sm">
                  <MessageSquare size={48} />
                </div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">Select a Conversation</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  Choose a chat from the activity stream on the left to read the full AI-visitor transcript.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
