'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Save, 
  MessageSquare, 
  Palette, 
  Bell, 
  Globe,
  Sparkles,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/config';

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [siteData, setSiteData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('bot');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      // For MVP, we'll fetch the first site or a specific demo site
      const { data } = await supabase.from('sites').select('*').limit(1).single();
      
      if (data) {
        setSiteData(data);
      } else {
        // Use Demo defaults for the "Showroom" effect
        setSiteData({
          id: SITE_CONFIG.demoSiteId,
          name: SITE_CONFIG.demoBusinessName,
          bot_display_name: SITE_CONFIG.demoBotName,
          welcome_message: 'Hi! Welcome to PrimeNest Realty. Looking for a new home or an investment?',
          fallback_message: 'I specialize in PrimeNest listings. Let me get your details so an agent can help!',
          lead_capture_enabled: true
        });
      }
      setLoading(false);
    };

    fetchSettings();
  }, [supabase]);

  const handleSave = async () => {
    if (!siteData) return;
    setSaving(true);
    const { error } = await supabase.from('sites').update(siteData).eq('id', siteData.id);
    if (!error) {
      alert('Settings saved successfully!');
    }
    setSaving(false);
  };

  const updateField = (field: string, value: any) => {
    setSiteData((prev: any) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'bot', label: 'Bot Settings', icon: MessageSquare },
    { id: 'general', label: 'Agency Profile', icon: Globe },
    { id: 'branding', label: 'Branding', icon: Palette },
  ];

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 p-8 lg:p-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase">Settings</h1>
          <p className="text-slate-500 text-sm mt-1 font-bold uppercase tracking-tight text-slate-400">Configure your assistant</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[13px] font-black transition-all uppercase tracking-widest",
                activeTab === tab.id 
                  ? "bg-white text-blue-600 shadow-md border border-slate-100" 
                  : "text-slate-400 hover:bg-white/50"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-10 space-y-8">
            {activeTab === 'bot' && (
              <>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Bot Display Name</label>
                    <input 
                      type="text" 
                      value={siteData?.bot_display_name || ''}
                      onChange={(e) => updateField('bot_display_name', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                    <input 
                      type="text" 
                      value={siteData?.name || ''}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Welcome Message</label>
                  <textarea 
                    rows={3}
                    value={siteData?.welcome_message || ''}
                    onChange={(e) => updateField('welcome_message', e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fallback Message (If AI is unsure)</label>
                  <textarea 
                    rows={2}
                    value={siteData?.fallback_message || ''}
                    onChange={(e) => updateField('fallback_message', e.target.value)}
                    className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                    <input 
                      type="email" 
                      value={siteData?.support_email || ''}
                      onChange={(e) => updateField('support_email', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none"
                      placeholder="hello@agency.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Phone</label>
                    <input 
                      type="text" 
                      value={siteData?.support_phone || ''}
                      onChange={(e) => updateField('support_phone', e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-600/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="p-8 bg-blue-50/50 rounded-[32px] border border-blue-100 flex items-start gap-6">

                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Lead Capture Flow</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 max-w-md">Automatically trigger the qualification flow when property interest is detected.</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={siteData?.lead_capture_enabled} 
                        onChange={(e) => updateField('lead_capture_enabled', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-4 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                        {siteData?.lead_capture_enabled ? 'Active' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'bot' && (
              <div className="py-20 text-center">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Available in the next update</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
