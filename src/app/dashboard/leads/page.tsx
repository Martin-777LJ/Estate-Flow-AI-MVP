'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Home,
  ChevronLeft,
  ChevronRight,
  User,
  Plus,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

const leadsData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+1 234 567 8901', type: 'Buyer', location: 'Downtown', budget: '$500k - $700k', property: 'Condo', status: 'New', date: 'Oct 24, 2026' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+1 234 567 8902', type: 'Renter', location: 'Suburbs', budget: '$2k - $3k/mo', property: 'Apartment', status: 'Qualified', date: 'Oct 23, 2026' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+1 234 567 8903', type: 'Buyer', location: 'Beachfront', budget: '$1.2M+', property: 'Villa', status: 'Contacted', date: 'Oct 22, 2026' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '+1 234 567 8904', type: 'Buyer', location: 'Uptown', budget: '$800k - $1M', property: 'Townhouse', status: 'Closed', date: 'Oct 20, 2026' },
  { id: 5, name: 'Edward Norton', email: 'edward@example.com', phone: '+1 234 567 8905', type: 'Renter', location: 'Downtown', budget: '$4k+/mo', property: 'Penthouse', status: 'Lost', date: 'Oct 18, 2026' },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leadsData.filter(lead => 
    (statusFilter === 'All' || lead.status === statusFilter) &&
    (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || lead.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">Leads</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Manage and qualify your property inquiries from one place.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm">
              <Download size={16} />
              Export
            </button>
            <button className="flex-1 md:flex-none px-6 py-4 bg-blue-600 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100 active:scale-95">
              <Plus size={16} strokeWidth={3} />
              Add Lead
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
          <div className="w-full lg:flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by name, email, or requirements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 pl-14 pr-6 text-[13px] font-bold outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="w-full lg:w-auto flex gap-3">
            <div className="relative flex-1 lg:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-11 pr-10 text-[13px] font-bold text-slate-600 outline-none appearance-none cursor-pointer hover:bg-slate-100/50 transition-all"
              >
                <option>All Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Closed</option>
                <option>Lost</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modern Table Layout */}
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interest & Budget</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-black text-sm border border-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          {lead.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{lead.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold tracking-tight">
                              <Mail size={12} className="text-slate-300" /> {lead.email}
                            </span>
                            <span className="hidden sm:block text-slate-200">•</span>
                            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold tracking-tight">
                              <Phone size={12} className="text-slate-300" /> {lead.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-900 font-black uppercase tracking-tight">
                          <Home size={13} className="text-blue-600" strokeWidth={2.5} /> {lead.property} — {lead.type}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold">
                            <MapPin size={12} className="text-slate-400" /> {lead.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-lg border border-blue-100/50">
                            <DollarSign size={12} /> {lead.budget}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-sm",
                        lead.status === 'New' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        lead.status === 'Qualified' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        lead.status === 'Contacted' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        lead.status === 'Closed' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" :
                        "bg-red-50 text-red-600 border border-red-100"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full animate-pulse",
                          lead.status === 'New' ? "bg-amber-400" :
                          lead.status === 'Qualified' ? "bg-emerald-400" :
                          lead.status === 'Contacted' ? "bg-blue-400" :
                          lead.status === 'Closed' ? "bg-white" :
                          "bg-red-400"
                        )} />
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[11px] text-slate-500 font-black tracking-widest uppercase">{lead.date}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-blue-600 hover:shadow-md border border-transparent hover:border-slate-100 rounded-xl transition-all active:scale-90">
                          <Eye size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 hover:shadow-md border border-transparent hover:border-slate-100 rounded-xl transition-all active:scale-90">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">Showing {filteredLeads.length} of {leadsData.length} records</p>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-30" disabled>
                Previous
              </button>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(p => (
                  <button key={p} className={cn(
                    "w-8 h-8 rounded-lg text-[10px] font-black transition-all",
                    p === 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-white border border-slate-200 text-slate-400 hover:bg-slate-50"
                  )}>
                    {p}
                  </button>
                ))}
              </div>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
