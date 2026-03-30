'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { cn } from '@/lib/utils';
import { 
  Copy, 
  Check, 
  Code, 
  Terminal, 
  ShieldCheck,
  Zap
} from 'lucide-react';

import { SITE_CONFIG } from '@/lib/config';

export default function InstallPage() {
  const [copied, setCopied] = useState(false);
  const snippet = `<script 
  src="https://app.${SITE_CONFIG.brandName.toLowerCase()}.ai/widget.js" 
  data-site-id="${SITE_CONFIG.demoSiteId}" 
  async 
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-8 lg:p-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-[20px] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200">
          <Code size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Install {SITE_CONFIG.brandName} AI</h1>
        <p className="text-slate-500 text-lg mt-2 max-w-lg mx-auto">Copy and paste the snippet below into your website to start capturing leads instantly.</p>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl relative group">
        <div className="p-4 border-b border-white/10 flex items-center justify-between px-8 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">widget.html</span>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white text-xs font-bold"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Snippet'}
          </button>
        </div>
        <div className="p-10 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre bg-slate-900/50">
          <code className="text-blue-300">
            {`<script\n  `}
            <span className="text-emerald-400">src</span>
            {`=`}
            <span className="text-amber-200">{`"https://app.${SITE_CONFIG.brandName.toLowerCase()}.ai/widget.js"`}</span>
            {` \n  `}
            <span className="text-emerald-400">data-site-id</span>
            {`=`}
            <span className="text-amber-200">{`"${SITE_CONFIG.demoSiteId}"`}</span>
            {` \n  `}
            <span className="text-emerald-400">async</span>
            {` \n`}
            {`></script>`}
          </code>
        </div>
      </div>

      {/* Instructions Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 relative z-10">
            <Terminal size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Where to place it?</h3>
          <p className="text-slate-500 text-sm leading-relaxed relative z-10">
            Paste the code snippet immediately before the closing <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">&lt;/body&gt;</code> tag on every page of your website.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 relative z-10">
            <Zap size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Verify Installation</h3>
          <p className="text-slate-500 text-sm leading-relaxed relative z-10">
            Once installed, visit your website and look for the chat icon in the bottom right corner. It should appear instantly.
          </p>
        </div>
      </div>

      {/* Security / Info Section */}
      <div className="bg-slate-50 p-6 rounded-3xl flex items-center gap-4 border border-slate-200">
        <div className="shrink-0 text-emerald-600">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Secure & Lightweight</h4>
          <p className="text-xs text-slate-500 font-medium">Our widget is optimized for speed and won&apos;t affect your website&apos;s SEO or performance. It loads asynchronously to ensure a smooth user experience.</p>
        </div>
      </div>
    </div>
  );
}
