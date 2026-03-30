import { createServerClient } from '@/lib/supabaseServer';
import { format } from 'date-fns';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Badge
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const supabase = createServerClient();
  
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading leads: {error.message}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads</h1>
          <p className="text-slate-500 font-medium">Manage and follow up with your captured prospects.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search leads..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Lead</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Interest</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Property & Location</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Budget</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Captured</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads && leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                          {lead.full_name?.charAt(0) || <User size={18} />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{lead.full_name || 'Anonymous'}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            {lead.email && <span>{lead.email}</span>}
                            {lead.phone && <span>{lead.phone}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        lead.interest_type === 'buy' ? "bg-emerald-50 text-emerald-600" :
                        lead.interest_type === 'rent' ? "bg-blue-50 text-blue-600" :
                        lead.interest_type === 'invest' ? "bg-purple-50 text-purple-600" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {lead.interest_type || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-700">{lead.property_type || 'N/A'}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-0.5">
                        <MapPin size={12} />
                        {lead.location || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <DollarSign size={14} className="text-slate-400" />
                        {lead.budget || 'Not set'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          lead.status === 'qualified' ? "bg-emerald-500" :
                          lead.status === 'contacted' ? "bg-amber-500" :
                          lead.status === 'new' ? "bg-blue-500" :
                          lead.status === 'closed' ? "bg-slate-900" :
                          "bg-red-500" // lost
                        )} />
                        <span className="text-xs font-bold text-slate-700 capitalize">{lead.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">
                      {format(new Date(lead.created_at), 'MMM d, h:mm a')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400 hover:text-blue-600">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium">
                    No leads captured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
