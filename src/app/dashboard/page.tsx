'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2,
  Calendar,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';

import { DEMO_STATS, DEMO_LEADS } from '@/lib/demo-data';

export default function DashboardPage() {
  const supabase = createClient();
  const [stats, setStats] = useState({ leads: 0, chats: 0, qualified: 0, conversions: '0%' });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Fetch real counts
      const { count: leadCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { count: chatCount } = await supabase.from('conversations').select('*', { count: 'exact', head: true });
      const { count: qualifiedCount } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'qualified');
      
      // Fetch latest leads
      const { data: latestLeads } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5);

      // Merge with demo data for the "Showroom" effect
      setStats({
        leads: (leadCount || 0) + DEMO_STATS.leads,
        chats: (chatCount || 0) + DEMO_STATS.chats,
        qualified: (qualifiedCount || 0) + DEMO_STATS.qualified,
        conversions: DEMO_STATS.conversions
      });

      setRecentLeads((latestLeads || []).concat(DEMO_LEADS).slice(0, 5));
      setLoading(false);
    };

    fetchDashboardData();
  }, [supabase]);

  const statCards = [
    { label: 'Total Leads', value: stats.leads, icon: Users, color: 'blue' },
    { label: 'AI Conversations', value: stats.chats, icon: MessageSquare, color: 'indigo' },
    { label: 'Qualified Leads', value: stats.qualified, icon: CheckCircle2, color: 'emerald' },
    { label: 'Conversion Rate', value: stats.conversions, icon: TrendingUp, color: 'amber' },
  ];

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-20 p-8 lg:p-12">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">Overview</h1>
        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-tight text-slate-400">Performance Snapshot</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-6",
                stat.color === 'blue' ? "bg-blue-600 text-white shadow-blue-100" :
                stat.color === 'indigo' ? "bg-indigo-600 text-white shadow-indigo-100" :
                stat.color === 'emerald' ? "bg-emerald-600 text-white shadow-emerald-100" :
                "bg-amber-500 text-white shadow-amber-100"
              )}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUpRight size={10} strokeWidth={3} />
                  Live
                </span>
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 mb-1">{stat.value}</p>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Inquiries</h2>
              <p className="text-xs text-slate-400 font-bold uppercase mt-1 tracking-widest">Latest website activity</p>
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lead</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interest</th>
                  <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentLeads.map((lead, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[14px] bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400 border border-slate-200 group-hover:bg-white group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
                          {lead.full_name?.[0] || 'L'}
                        </div>
                        <div>
                          <p className="text-[13px] font-black text-slate-900">{lead.full_name || 'Anonymous'}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{lead.email || 'Email missing'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-[11px] text-slate-500 font-black uppercase tracking-tight">{lead.property_type || 'General Inquiry'}</td>
                    <td className="px-10 py-6 text-right">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]",
                        lead.status === 'Qualified' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                      )}>
                        {lead.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-20 text-center text-[10px] font-black uppercase text-slate-300 tracking-widest">No recent leads yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[48px] shadow-2xl p-10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-10 relative z-10">Live Feed</h2>
          <div className="space-y-10 relative z-10 flex-1">
            {[
              { text: 'Bot answering property availability', time: 'Just now', icon: MessageSquare, color: 'blue' },
              { text: 'New lead qualified: "Marcus A."', time: '12m ago', icon: CheckCircle2, color: 'emerald' },
              { text: 'FAQ updated: "Deposit Policy"', time: '45m ago', icon: TrendingUp, color: 'amber' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="relative flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 z-10 shadow-lg group-hover:scale-110 transition-all duration-500",
                    item.color === 'blue' ? "bg-blue-600" :
                    item.color === 'emerald' ? "bg-emerald-600" : "bg-amber-500"
                  )}>
                    <item.icon size={20} strokeWidth={2.5} />
                  </div>
                  {i < 2 && <div className="absolute top-12 w-0.5 h-[calc(100%+40px)] bg-white/5" />}
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-200 leading-snug mb-1">{item.text}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.3em] transition-all">
            Launch Agent View
          </button>
        </div>
      </div>
    </div>
  );
}
