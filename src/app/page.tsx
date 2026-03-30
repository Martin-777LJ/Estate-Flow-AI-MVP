'use client';

import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Clock, 
  CheckCircle2, 
  LayoutDashboard, 
  Calendar,
  Sparkles,
  ChevronRight
  } from 'lucide-react';
  import { motion } from 'framer-motion';
  import Link from 'next/link';
import { cn } from '@/lib/utils';

import { SITE_CONFIG } from '@/lib/config';
import ChatWidget from '@/components/widget/ChatWidget';

const LandingPage = () => {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-estateflow-chat'));
  };

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
              <span className="text-xl font-black tracking-tight text-slate-900 uppercase">{SITE_CONFIG.brandName}</span>
            </div>
            <div className="hidden md:flex items-center gap-10 text-[13px] font-black text-slate-500 uppercase tracking-widest">
              <a href="#benefits" className="hover:text-blue-600 transition-colors">The Offer</a>
              <button onClick={openChat} className="hover:text-blue-600 transition-colors uppercase">Live Bot Demo</button>
              <Link href="/login" className="hover:text-blue-600 transition-colors">Dashboard Preview</Link>
              <Link href="/login">
                <button className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95">
                  Book a Setup Call
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
              <span>Next-Gen Real Estate AI</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-8xl font-[1000] tracking-[-0.04em] text-slate-900 mb-10 leading-[0.95]">
              Stop Missing <span className="text-blue-600">Property Leads</span> While You Sleep
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl lg:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium tracking-tight">
              {SITE_CONFIG.brandName} provides 24/7 AI agents that answer listings inquiries, qualify buyers, and book viewings directly on your website.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[22px] font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-[0.98]">
                  View Demo Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                </button>
              </Link>
              <button 
                onClick={openChat}
                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border-2 border-slate-100 rounded-[22px] font-black text-lg hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Try Demo Bot
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
                  <div className="col-span-9 grid grid-cols-3 gap-6 opacity-40">
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
              
              {/* Overlay Label */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Link href="/login" className="bg-slate-900/90 backdrop-blur-md text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl flex items-center gap-4 group">
                  <LayoutDashboard size={24} />
                  Enter Demo Dashboard
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Minimal & Strong */}
      <section id="benefits" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">Scale Your <span className="text-blue-600">Agency</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Everything you need to capture, qualify, and close leads on autopilot.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "24/7 Response", icon: <Clock className="w-7 h-7" />, color: "bg-blue-600", desc: "Keep visitors engaged with instant, intelligent responses at any hour." },
              { title: "Lead Qualification", icon: <CheckCircle2 className="w-7 h-7" />, color: "bg-emerald-600", desc: "AI identifies serious prospects based on property interest and budget." },
              { title: "Instant Bookings", icon: <Calendar className="w-7 h-7" />, color: "bg-amber-500", desc: "Let prospects request viewings directly through the chat interface." },
              { title: "CRM Dashboard", icon: <LayoutDashboard className="w-7 h-7" />, color: "bg-slate-900", desc: "Manage all AI-captured leads and conversation transcripts in one place." }
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

      {/* Demo Section */}
      <section id="demo" className="py-32 overflow-hidden bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Interactive Demo</span>
              </div>
              <h2 className="text-4xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-[0.95]">Experience <br />The AI In <br /><span className="text-blue-500">Action</span></h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed mb-12">
                We&apos;ve set up a demo for <strong>{SITE_CONFIG.demoBusinessName}</strong>. Open the chat widget in the corner to see how it handles listings, answers FAQs, and captures your details as a lead.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/80 font-bold">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <CheckCircle2 size={14} />
                  </div>
                  Real-time listing inquiries
                </div>
                <div className="flex items-center gap-4 text-white/80 font-bold">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <CheckCircle2 size={14} />
                  </div>
                  Automated lead qualification
                </div>
                <div className="flex items-center gap-4 text-white/80 font-bold">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <CheckCircle2 size={14} />
                  </div>
                  Seamless CRM synchronization
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[120px]" />
              <div className="relative bg-white/5 border border-white/10 p-10 rounded-[60px] backdrop-blur-xl">
                <div className="bg-slate-900 rounded-[40px] p-8 border border-white/5 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white/10 text-white/60 p-4 rounded-2xl rounded-tl-none text-xs font-medium w-3/4">
                        Do you have any condos under $500k in North Beach?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none text-xs font-bold w-3/4 shadow-xl shadow-blue-900/20">
                        I found 3 listings matching your criteria! Would you like me to send you the details or book a viewing for this Saturday?
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Chatting with {SITE_CONFIG.demoBotName}</p>
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
          <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Ready to <br />Transform Your <span className="text-blue-600">Business?</span></h2>
          <p className="text-xl text-slate-500 mb-14 font-medium max-w-2xl mx-auto">Don&apos;t build it yourself. Let our experts deploy a custom-trained AI agent on your website today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-[24px] font-black text-xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-200 active:scale-95">
                Book a Setup Call
              </button>
            </Link>
            <button 
              onClick={openChat}
              className="w-full sm:w-auto px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[24px] font-black text-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              Try Live Demo
            </button>
          </div>
          <p className="text-slate-400 mt-10 text-sm font-bold uppercase tracking-[0.2em]">Full custom setup in 48 hours</p>
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
              <span className="text-lg font-black tracking-tight uppercase">{SITE_CONFIG.brandName}</span>
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

      <ChatWidget siteId={SITE_CONFIG.demoSiteId} />
    </div>
  );
};

export default LandingPage;
