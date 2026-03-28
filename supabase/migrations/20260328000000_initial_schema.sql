-- Initial Schema for EstateFlow AI

-- 1. Sites Table (Agency / Account settings)
CREATE TABLE public.sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  domain TEXT,
  bot_display_name TEXT DEFAULT 'Estate Assistant',
  welcome_message TEXT DEFAULT 'Hi there! 👋 I''m your AI estate assistant. I can help you find your dream property or answer questions about our listings. How can I help you today?',
  fallback_message TEXT DEFAULT 'I may not have that exact detail here, but I can help get your inquiry through to the team. Can I get a few details?',
  brand_color TEXT DEFAULT '#2563eb',
  lead_capture_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Knowledge Base Table (FAQs)
CREATE TABLE public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Leads Table (Captured prospects)
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  interest_type TEXT, -- Buy, Rent, Invest
  property_type TEXT, -- Condo, House, etc.
  location TEXT,
  budget TEXT,
  viewing_request BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'New', -- New, Contacted, Qualified, Closed, Lost
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Conversations Table (Transcript history)
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL, -- UUID or session-based ID
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  transcript JSONB DEFAULT '[]'::jsonb,
  last_message TEXT,
  lead_captured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) - Simple starters
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Allow public access for widget reading settings (Limited columns)
CREATE POLICY "Public Read Sites" ON public.sites FOR SELECT USING (true);
CREATE POLICY "Public Read KB" ON public.knowledge_base FOR SELECT USING (true);

-- Allow widget to insert leads and conversations
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Conversations" ON public.conversations FOR UPDATE USING (true);

-- Admin policies (Must be authenticated and own the site)
-- (Simplifying for MVP, normally would check site_id ownership)
CREATE POLICY "Admin All Sites" ON public.sites ALL USING (auth.uid() = user_id);
