'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Save, 
  MessageSquare, 
  Palette, 
  Bell, 
  Shield, 
  Globe,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'bot', label: 'Bot Settings', icon: MessageSquare },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure your bot behavior and agency profile.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                    : "text-slate-500 hover:bg-white/50"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Settings</h2>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
                <Save size={16} />
                Save Changes
              </button>
            </div>

            <div className="p-8 space-y-8">
              {activeTab === 'bot' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Bot Display Name</label>
                      <input 
                        type="text" 
                        defaultValue="EstateFlow Assistant"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Business Name</label>
                      <input 
                        type="text" 
                        defaultValue="Prime Realty Group"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Welcome Message</label>
                    <textarea 
                      rows={3}
                      defaultValue="Hi there! 👋 I'm your AI assistant. I can help you find your dream property or answer questions about our listings. How can I help you today?"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Fallback Message</label>
                    <p className="text-[10px] text-slate-400 mb-2 font-medium">Shown when the AI doesn't know the answer.</p>
                    <textarea 
                      rows={2}
                      defaultValue="I'm not sure about that specific detail, but I've notified our team and they will get back to you shortly!"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600/20 outline-none resize-none"
                    />
                  </div>

                  <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-900 mb-1">Lead Capture Flow</h4>
                      <p className="text-xs text-blue-700 leading-relaxed mb-4">Automatically ask for name, email, and property preferences when a user shows high interest.</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-xs font-bold text-blue-900 uppercase tracking-wider">Enabled</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab !== 'bot' && (
                <div className="py-20 text-center">
                  <p className="text-slate-400 text-sm font-medium">Settings for {activeTab} will be available in the next update.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
