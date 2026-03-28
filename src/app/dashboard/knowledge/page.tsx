'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  BookOpen, 
  HelpCircle,
  Tag,
  ChevronRight
} from 'lucide-react';

const initialFaqs = [
  { id: '1', question: 'What are the typical deposit requirements?', answer: 'Most properties require a deposit equivalent to 2 months rent, plus the first month upfront. Some luxury properties may require 3 months.', category: 'Financial' },
  { id: '2', question: 'Are pets allowed in all properties?', answer: 'Pet policies vary by building. Most apartments allow small pets under 10kg with a pet deposit, while some condos have a strict no-pet policy.', category: 'Policies' },
  { id: '3', question: 'How long does the application process take?', answer: 'Once all documents are submitted, the approval process typically takes 24-48 business hours.', category: 'Process' },
];

export default function KnowledgeBasePage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Knowledge Base</h1>
            <p className="text-slate-500 text-sm mt-1">Train your AI by adding common questions and answers.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
            <Plus size={18} />
            Add New FAQ
          </button>
        </div>

        {/* Search & Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search FAQs by question or category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-100 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Training Items</p>
              <p className="text-3xl font-extrabold">{faqs.length}</p>
            </div>
            <BookOpen size={48} className="text-white/20 absolute -right-4 -bottom-4 rotate-12" />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                      <Tag size={10} /> {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <HelpCircle className="text-slate-300 shrink-0 mt-1" size={18} />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[48px] border border-slate-100 border-dashed">
              <BookOpen size={48} className="text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No FAQs found matching your search.</p>
              <button onClick={() => setSearchTerm('')} className="text-blue-600 text-sm font-bold mt-2 hover:underline">Clear search</button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
