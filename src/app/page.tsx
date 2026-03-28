'use client';

import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Zap, 
  Clock, 
  CheckCircle2, 
  LayoutDashboard, 
  Search, 
  Smartphone, 
  BarChart3,
  Calendar,
  Sparkles,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] glass border-b border-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-[14px] flex items-center justify-center shadow-lg shadow-blue-200">
                <Sparkles className="text-white w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 uppercase">EstateFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-10 text-[13px] font-black text-slate-500 uppercase tracking-widest">
              <a href="#benefits" className="hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <Link href="/login">
                <button className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95">
                  Book a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,_#eff6ff_0%,_transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-black uppercase tracking-[0.2em] mb-10 border border-blue-100 shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-blue-700" />
              <span>The #1 AI for Real Estate</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-8xl font-[1000] tracking-[-0.04em] text-slate-900 mb-10 leading-[0.95]">
              Turn Website Visitors Into <span className="text-blue-600">Property Leads</span> — Automatically
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl lg:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium tracking-tight">
              EstateFlow AI helps real estate businesses answer inquiries instantly, qualify prospects, and capture more leads 24/7.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[22px] font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-[0.98]">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                </button>
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border-2 border-slate-100 rounded-[22px] font-black text-lg hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3 shadow-sm">
                <MousePointer2 className="w-5 h-5 text-blue-600" />
                Live Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Floating UI Mockup Polish */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-32 relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full" />
            <div className="rounded-[40px] border-[12px] border-slate-900/5 bg-slate-100 p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative">
              <div className="aspect-[16/10] bg-white rounded-[32px] shadow-inner flex flex-col border border-slate-200 overflow-hidden">
                <div className="h-14 border-b border-slate-100 flex items-center px-6 gap-3 bg-slate-50/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  </div>
                  <div className="w-40 h-6 bg-white border border-slate-100 rounded-lg mx-auto" />
                </div>
                <div className="flex-1 p-8 grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="h-8 bg-blue-50 rounded-xl" />
                    <div className="h-8 bg-slate-50 rounded-xl w-3/4" />
                    <div className="h-8 bg-slate-50 rounded-xl w-5/6" />
                  </div>
                  <div className="col-span-9 grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-3">
                        <div className="w-10 h-10 bg-white rounded-xl" />
                        <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
                        <div className="h-3 bg-slate-100 rounded-lg" />
                      </div>
                    ))}
                    <div className="col-span-3 h-40 bg-blue-50/30 rounded-[32px] border border-blue-100 border-dashed" />
                  </div>
                </div>
              </div>
              
              {/* Chat Widget Floating Mockup - Premium Polish */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-6 -bottom-6 md:-right-16 md:-bottom-8 w-80 bg-white rounded-[36px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 p-8 z-20"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Estate Assistant</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-[22px] rounded-tl-none text-[13px] font-medium text-slate-600 leading-relaxed shadow-sm">
                    Is the Downtown Loft still available?
                  </div>
                  <div className="bg-blue-600 p-4 rounded-[22px] rounded-tr-none text-[13px] font-bold text-white leading-relaxed shadow-lg shadow-blue-100">
                    Yes! It&apos;s currently available. Would you like to schedule a viewing?
                  </div>
                </div>
                <div className="h-14 bg-slate-50 rounded-2xl border border-slate-100 px-5 flex items-center text-xs font-bold text-slate-400">
                  Type your message...
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Minimal & Strong */}
      <section id="benefits" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">Scale Your <span className="text-blue-600">Lead Volume</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Everything you need to capture, qualify, and close leads on autopilot.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Reply Instantly", icon: <Clock className="w-7 h-7" />, color: "bg-blue-600", desc: "Keep visitors engaged with instant, intelligent responses." },
              { title: "Qualify Inquiries", icon: <CheckCircle2 className="w-7 h-7" />, color: "bg-emerald-600", desc: "AI identifies serious prospects based on their questions." },
              { title: "24/7 Availability", icon: <Zap className="w-7 h-7" />, color: "bg-amber-500", desc: "Never miss a lead, even when your team is offline." },
              { title: "Easy Install", icon: <Code className="w-7 h-7" />, color: "bg-slate-900", desc: "One line of code. No complex integration required." }
            ].map((benefit, i) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={i} 
                className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 group"
              >
                <div className={cn("w-16 h-16 rounded-[20px] flex items-center justify-center text-white mb-8 shadow-xl transition-all group-hover:scale-110", benefit.color)}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 text-[15px] font-medium leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Done For You - High Impact */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[60px] p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            
            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Effort Required</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-[1.05] tracking-tight">We Set It <br />Up For You</h2>
              <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-10">
                Don&apos;t worry about training AI or coding. Our experts handle the complete setup — from your Knowledge Base to the widget installation.
              </p>
              <ul className="space-y-5">
                {[
                  "We train the AI on your properties",
                  "We install the widget on your site",
                  "We optimize lead capture flows",
                  "You just handle the closing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 font-bold text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full relative z-10">
              <div className="aspect-square bg-white/5 rounded-[48px] border border-white/10 p-10 flex items-center justify-center relative backdrop-blur-sm">
                <div className="bg-white rounded-[40px] p-10 shadow-2xl w-full rotate-3 group hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <BarChart3 size={24} />
                    </div>
                    <p className="text-sm font-black text-slate-900 uppercase">Weekly Report</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Leads</span>
                      <span className="text-2xl font-black text-blue-600">+42</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Viewings Booked</span>
                      <span className="text-2xl font-black text-emerald-600">12</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-1/2 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Ready to Capture <br /><span className="text-blue-600">More Leads?</span></h2>
          <p className="text-xl text-slate-500 mb-14 font-medium max-w-2xl mx-auto">Join the future of real estate. Answer every question, capture every prospect, and scale your agency today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-[24px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-200 active:scale-95">
                Book a Demo Today
              </button>
            </Link>
          </div>
          <p className="text-slate-400 mt-10 text-sm font-bold uppercase tracking-[0.2em]">No credit card required • 15 min setup</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Sparkles size={16} />
              </div>
              <span className="text-lg font-black tracking-tight uppercase">EstateFlow</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">Capture more leads, answer every question, 24/7.</p>
          </div>
          <div className="flex gap-10 text-xs font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
