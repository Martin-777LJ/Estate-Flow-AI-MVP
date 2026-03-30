'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Trash2,
  Edit2,
  HelpCircle,
  MessageSquare,
  Loader2,
  X
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

export default function KnowledgePage() {
  const supabase = createClient();
  const [kbEntries, setKbEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsMobileOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newEntry, setNewEntry] = useState({ question: '', answer: '', category: 'General' });

  const fetchEntries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setKbEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { error } = await supabase
      .from('knowledge_base')
      .insert([{
        ...newEntry,
        site_id: SITE_CONFIG.demoSiteId
      }]);

    if (!error) {
      setNewEntry({ question: '', answer: '', category: 'General' });
      setIsMobileOpen(false);
      fetchEntries();
    } else {
      alert('Error saving entry: ' + error.message);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    const { error } = await supabase
      .from('knowledge_base')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchEntries();
    }
  };

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">Loading Knowledge Base...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">Knowledge Base</h1>
          <p className="text-slate-500 text-sm mt-1 font-bold uppercase tracking-tight text-slate-400">AI Training Data</p>
        </div>
        
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus size={18} strokeWidth={3} />
          Add Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
            <HelpCircle size={28} />
          </div>
          <div className="text-3xl font-black text-slate-900">{kbEntries.length}</div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Total FAQ Entries</div>
        </div>
        
        <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
            <MessageSquare size={28} />
          </div>
          <div className="text-3xl font-black text-slate-900">98%</div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">AI Accuracy</div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 shadow-sm">
            <BookOpen size={28} />
          </div>
          <div className="text-3xl font-black text-slate-900">Live</div>
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Sync Status</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/60 rounded-[48px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search knowledge base..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 shadow-inner"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {kbEntries.length > 0 ? (
            kbEntries.map((entry) => (
              <div key={entry.id} className="p-10 hover:bg-slate-50/50 transition-colors group relative">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        {entry.category || 'General'}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight">
                      {entry.question}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-4xl italic">
                      &quot;{entry.answer}&quot;
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(entry.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-10 py-32 text-center">
              <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-inner">
                <BookOpen size={48} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Empty Knowledge Base</h3>
              <p className="text-slate-400 font-bold text-sm max-w-sm mx-auto mb-10 uppercase tracking-tight">
                Add property details and FAQs to train your AI.
              </p>
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                <Plus size={18} strokeWidth={3} />
                Create First Entry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">New Knowledge Entry</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Train your AI Assistant</p>
              </div>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>
            
            <form onSubmit={handleAddEntry} className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Question / Trigger</label>
                <input 
                  required
                  type="text" 
                  value={newEntry.question}
                  onChange={(e) => setNewEntry({ ...newEntry, question: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-5 px-8 text-sm font-bold outline-none transition-all shadow-inner"
                  placeholder="e.g. What areas do you cover?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">AI Answer</label>
                <textarea 
                  required
                  rows={4}
                  value={newEntry.answer}
                  onChange={(e) => setNewEntry({ ...newEntry, answer: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-5 px-8 text-sm font-bold outline-none transition-all resize-none shadow-inner"
                  placeholder="Enter the concise answer the AI should provide..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-5 px-8 text-sm font-bold outline-none transition-all shadow-inner appearance-none"
                  >
                    <option value="General">General</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Service Area">Service Area</option>
                    <option value="Rentals">Rentals</option>
                    <option value="Process">Process</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-5 bg-blue-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={18} strokeWidth={3} />}
                  {isSaving ? 'Saving...' : 'Add to Knowledge Base'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
