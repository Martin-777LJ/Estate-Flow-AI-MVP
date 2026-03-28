'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  Code, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Bell,
  Search,
  User,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Leads', href: '/dashboard/leads', icon: Users },
  { label: 'Conversations', href: '/dashboard/conversations', icon: MessageSquare },
  { label: 'Knowledge Base', href: '/dashboard/knowledge', icon: BookOpen },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Install', href: '/dashboard/install', icon: Code },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 selection:bg-blue-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col fixed h-full z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Sparkles size={22} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight block leading-tight uppercase">EstateFlow</span>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase leading-tight">Property AI</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group",
                  isActive 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-100/50" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                  {item.label}
                </div>
                {isActive && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100/50 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-blue-200 transition-colors" />
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Agency Status</p>
            <p className="text-[13px] font-bold text-slate-900 mb-3 relative z-10">Prime Realty Group</p>
            <div className="flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-black text-emerald-600 uppercase">AI Active</span>
            </div>
          </div>
          <button className="flex items-center gap-4 px-6 py-4 mt-4 rounded-2xl text-[13px] font-bold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all w-full text-left group">
            <LogOut size={18} className="text-slate-400 group-hover:text-red-600" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-[101] lg:hidden border-r border-slate-100 flex flex-col"
          >
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles size={22} />
                </div>
                <span className="text-xl font-black text-slate-900 uppercase">EstateFlow</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-[22px] text-sm font-bold transition-all",
                    pathname === item.href ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-500"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200">
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
          </div>
          
          <div className="hidden lg:flex items-center relative group w-[440px]">
            <Search className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 group-focus-within:scale-110 transition-all" size={16} />
            <input 
              type="text" 
              placeholder="Search leads, conversations, or settings..." 
              className="w-full bg-slate-100/60 border-2 border-transparent focus:bg-white focus:border-blue-600/10 focus:shadow-[0_0_20px_rgba(37,99,235,0.06)] rounded-2xl py-3 pl-12 pr-6 text-xs font-bold tracking-tight outline-none transition-all placeholder:text-slate-400 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 lg:gap-5">
            <button className="w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 rounded-2xl text-slate-500 hover:text-blue-600 relative transition-all group active:scale-90">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20" />
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2 pr-2 py-1.5 rounded-[18px] hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all active:scale-95 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-100 group-hover:rotate-6 group-hover:scale-105 transition-all">
                AU
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-black text-slate-900 leading-tight">Admin User</p>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Master Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content with smoother animation */}
        <main className="flex-1 p-6 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
