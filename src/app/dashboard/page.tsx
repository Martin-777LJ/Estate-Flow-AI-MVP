'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Users, 
  MessageSquare, 
  TrendUp, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  Calendar,
  ChevronRight
} from 'lucide-react';

const TrendUpIcon = () => (
  <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
    <ArrowUpRight size={12} />
    12%
  </div>
);

export default function DashboardPage() {
  const stats = [
    { label: 'Total Leads', value: '1,284', icon: Users, trend: '+12%', color: 'blue' },
    { label: 'Active Conversations', value: '42', icon: MessageSquare, trend: '+8%', color: 'indigo' },
    { label: 'Qualified Leads', value: '856', icon: CheckCircle2, trend: '+18%', color: 'emerald' },
    { label: 'Viewing Requests', value: '24', icon: Calendar, trend: '+5%', color: 'amber' },
  ];

  const recentLeads = [
    { name: 'Marcus Aurelius', email: 'marcus@example.com', property: 'Skyline Penthouse', status: 'Qualified', time: '2 mins ago' },
    { name: 'Elena Gilbert', email: 'elena@example.com', property: 'Riverside Loft', status: 'New', time: '15 mins ago' },
    { name: 'Stefan Salvatore', email: 'stefan@example.com', property: 'Gothic Mansion', status: 'Viewing Requested', time: '1 hour ago' },
    { name: 'Damon Salvatore', email: 'damon@example.com', property: 'Gothic Mansion', status: 'Contacted', time: '3 hours ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor your lead capture performance and activity.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm",
                  stat.color === 'blue' ? "bg-blue-50 text-blue-600 shadow-blue-100" :
                  stat.color === 'indigo' ? "bg-indigo-50 text-indigo-600 shadow-indigo-100" :
                  stat.color === 'emerald' ? "bg-emerald-50 text-emerald-600 shadow-emerald-100" :
                  "bg-amber-50 text-amber-600 shadow-amber-100"
                )}>
                  <stat.icon size={24} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight size={10} />
                    {stat.trend}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">vs last week</span>
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Leads Table */}
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Latest Leads</h2>
                <p className="text-sm text-slate-500">Your most recent property inquiries</p>
              </div>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline underline-offset-4">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Lead</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Property</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentLeads.map((lead, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 border border-slate-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
                            {lead.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 font-medium">{lead.property}</td>
                      <td className="px-8 py-5 text-right">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                          lead.status === 'Qualified' ? "bg-blue-50 text-blue-600" :
                          lead.status === 'New' ? "bg-amber-50 text-amber-600" :
                          lead.status === 'Viewing Requested' ? "bg-indigo-50 text-indigo-600" :
                          "bg-slate-50 text-slate-500"
                        )}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Live Activity</h2>
            <div className="space-y-8">
              {[
                { type: 'chat', text: 'New conversation started on Sunset Villa', time: 'Just now', icon: MessageSquare, color: 'blue' },
                { type: 'lead', text: 'Lead "John Doe" reached Qualified status', time: '12 mins ago', icon: CheckCircle2, color: 'emerald' },
                { type: 'viewing', text: 'Viewing requested for Downtown Loft', time: '45 mins ago', icon: Calendar, color: 'amber' },
                { type: 'chat', text: 'Bot handled FAQ: "Is pets allowed?"', time: '2 hours ago', icon: Clock, color: 'indigo' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="relative flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 z-10 shadow-lg transition-transform group-hover:scale-110",
                      item.color === 'blue' ? "bg-blue-600 shadow-blue-100" :
                      item.color === 'emerald' ? "bg-emerald-600 shadow-emerald-100" :
                      item.color === 'amber' ? "bg-amber-600 shadow-amber-100" :
                      "bg-indigo-600 shadow-indigo-100"
                    )}>
                      <item.icon size={18} />
                    </div>
                    {i < 3 && <div className="absolute top-10 w-px h-[calc(100%+32px)] bg-slate-100" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{item.text}</p>
                    <p className="text-xs text-slate-500 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
              View All Activity
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
