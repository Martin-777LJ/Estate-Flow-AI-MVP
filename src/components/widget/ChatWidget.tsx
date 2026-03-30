'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Home,
  MapPin,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/config';

// Types
type Role = 'bot' | 'user';

interface Message {
  id: string;
  role: Role;
  content: string;
  type?: 'text' | 'lead-step' | 'quick-replies' | 'summary';
  options?: string[];
  field?: string;
}

interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  propertyType?: string;
  location?: string;
  budget?: string;
  interest?: 'Buy' | 'Rent' | 'Invest';
}

const QUICK_REPLIES = [
  'Browse Properties',
  'Rent a Home',
  'Buy Property',
  'Book a Viewing',
  'Speak to an Agent'
];

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'bot', content: "Hi 👋 I’m your PrimeNest Realty Assistant. I can help you find properties, answer questions, or book a viewing." },
  { id: '2', role: 'bot', content: "Select an option below or type your question.", type: 'quick-replies', options: QUICK_REPLIES }
];

export default function ChatWidget({ siteId = SITE_CONFIG.demoSiteId }: { siteId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Allow opening externally via custom event
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-estateflow-chat', handleOpenEvent);
    return () => window.removeEventListener('open-estateflow-chat', handleOpenEvent);
  }, []);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visitorId, setVisitorId] = useState<string>('');
  const [leadData, setLeadData] = useState<LeadData>({});
  const [currentLeadStep, setCurrentLeadStep] = useState<string>('none');
  const [showNotification, setShowNotification] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize and load persistent state
  useEffect(() => {
    let vid = localStorage.getItem('ef_visitor_id');
    if (!vid) {
      vid = uuidv4();
      localStorage.setItem('ef_visitor_id', vid);
    }
    setVisitorId(vid);

    // Try to load previous conversation
    const savedTranscript = localStorage.getItem(`ef_chat_${siteId}_${vid}`);
    if (savedTranscript) {
      try {
        const parsed = JSON.parse(savedTranscript);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved chat", e);
      }
    }

    const savedLead = localStorage.getItem(`ef_lead_${siteId}_${vid}`);
    if (savedLead) {
      try {
        setLeadData(JSON.parse(savedLead));
      } catch (e) {}
    }

    setIsLoaded(true);

    // Initial delay for engagement if not open
    const timer = setTimeout(() => {
      if (!isOpen) setShowNotification(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [siteId, isOpen]);

  // Persist messages when they change
  useEffect(() => {
    if (isLoaded && visitorId) {
      localStorage.setItem(`ef_chat_${siteId}_${visitorId}`, JSON.stringify(messages));
    }
  }, [messages, isLoaded, visitorId, siteId]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const addMessage = (role: Role, content: string, extra?: Partial<Message>) => {
    const newMessage: Message = { id: uuidv4(), role, content, ...extra };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    addMessage('user', text);
    setInputValue('');
    setIsTyping(true);
    setShowNotification(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat([{ id: 'tmp', role: 'user', content: text }]).map(m => ({ role: m.role, content: m.content })),
          siteId,
          visitorId,
          currentLeadStep,
          leadData
        }),
      });

      if (!response.ok) throw new Error("API failed");

      const data = await response.json();
      
      setIsTyping(false);
      
      if (data.reply) {
        addMessage('bot', data.reply, {
          type: data.nextLeadStep && data.options ? 'quick-replies' : 'text',
          options: data.options
        });
      } else {
        throw new Error("Empty reply");
      }
      
      if (data.nextLeadStep) setCurrentLeadStep(data.nextLeadStep);
      if (data.updatedLeadData) {
        const newLeadData = { ...leadData, ...data.updatedLeadData };
        setLeadData(newLeadData);
        localStorage.setItem(`ef_lead_${siteId}_${visitorId}`, JSON.stringify(newLeadData));
      }

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      // Fallback guided response
      addMessage('bot', "I can still help with common property requests. What would you like to do next?", {
        type: 'quick-replies',
        options: QUICK_REPLIES
      });
    }
  };

  const resetChat = () => {
    if (window.confirm("Start a new conversation?")) {
      setMessages(INITIAL_MESSAGES);
      setCurrentLeadStep('none');
      setLeadData({});
      localStorage.removeItem(`ef_chat_${siteId}_${visitorId}`);
      localStorage.removeItem(`ef_lead_${siteId}_${visitorId}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans">
      {/* Floating Launcher with Notification */}
      <AnimatePresence>
        {!isOpen && (
          <div className="flex flex-col items-end gap-4">
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white p-4 rounded-[24px] shadow-2xl border border-slate-100 max-w-[240px] relative group cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                <p className="text-xs font-bold text-slate-900 leading-relaxed">
                  Hi! I&apos;m here to help you find your next property. 👋
                </p>
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100" />
              </motion.div>
            )}
            
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 transition-all group relative border-2 border-white/10"
            >
              <MessageSquare size={28} strokeWidth={2.5} className="group-hover:rotate-6 transition-transform" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="w-[calc(100vw-32px)] sm:w-[400px] h-[calc(100vh-80px)] sm:h-[640px] max-h-[85vh] bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-slate-900 text-white flex items-center justify-between relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/40 border border-white/10">
                  <Sparkles size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-black text-[13px] sm:text-[15px] tracking-tight uppercase">Estate Assistant</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={resetChat}
                  title="Reset conversation"
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all"
                >
                  <RotateCcw size={16} className="text-slate-400" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all"
                >
                  <ChevronDown size={20} className="text-slate-400 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 sm:space-y-8 bg-[#F8FAFC]/50 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[90%] sm:max-w-[85%]",
                    msg.role === 'bot' ? "items-start" : "ml-auto items-end"
                  )}
                >
                  <div className={cn(
                    "p-4 sm:p-5 rounded-[24px] sm:rounded-[28px] text-[13px] sm:text-[14px] leading-relaxed shadow-sm prose prose-sm max-w-none",
                    msg.role === 'bot' 
                      ? "bg-white text-slate-800 border border-slate-100 rounded-tl-none font-medium prose-p:my-1 prose-ul:my-1 prose-li:my-0.5" 
                      : "bg-blue-600 text-white rounded-tr-none font-bold shadow-blue-100 prose-p:my-1 prose-invert prose-p:text-white"
                  )}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  
                  {msg.type === 'quick-replies' && msg.options && (
                    <div className="flex flex-wrap gap-2 mt-4 sm:mt-5">
                      {msg.options.map((opt, i) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={i}
                          onClick={() => handleSend(opt)}
                          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border-2 border-slate-100 rounded-full text-[10px] sm:text-xs font-black text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start max-w-[85%]"
                >
                  <div className="bg-white p-4 sm:p-5 rounded-[24px] sm:rounded-[28px] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-600/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600/30 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-100 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative flex items-center gap-3"
              >
                <div className="relative flex-1">
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    autoFocus={!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-[20px] sm:rounded-[22px] py-3 sm:py-4 pl-5 sm:pl-6 pr-12 sm:pr-14 text-sm font-bold tracking-tight outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-inner"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-30 disabled:grayscale active:scale-90 shadow-lg shadow-blue-100"
                  >
                    <Send size={16} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </button>
                </div>
              </form>
              <div className="hidden sm:flex items-center justify-center gap-2 mt-6 opacity-30 grayscale hover:opacity-60 transition-opacity">
                <Sparkles size={10} className="text-blue-600" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  EstateFlow AI Assistant
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
