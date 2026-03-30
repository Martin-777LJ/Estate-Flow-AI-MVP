-- =========================================================
-- ESTATEFLOW AI - SUPABASE SCHEMA (UPGRADED V1)
-- Brand-facing demo website + chatbot lead capture backend
-- =========================================================

-- Extensions
create extension if not exists pgcrypto;

-- =========================================================
-- 1) SITES
-- Represents a demo business / future client business
-- =========================================================
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  domain text,
  bot_display_name text default 'Estate Assistant',
  welcome_message text default 'Hi there 👋 I''m your AI estate assistant. I can help answer questions and guide you toward the right property. How can I help today?',
  fallback_message text default 'I may not have that exact detail here, but I can help get your inquiry through to the team. Can I get a few details?',
  brand_color text default '#2563eb',
  support_phone text,
  support_email text,
  lead_capture_enabled boolean default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- =========================================================
-- 2) KNOWLEDGE BASE / FAQ
-- =========================================================
create table if not exists public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  question text not null,
  answer text not null,
  category text default 'General',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- =========================================================
-- 3) LEADS
-- Core captured lead data from chatbot
-- =========================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  interest_type text check (interest_type in ('buy', 'rent', 'invest') or interest_type is null),
  property_type text,
  location text,
  budget text,
  preferred_viewing_date text,
  viewing_request boolean default false,
  notes text,
  source text default 'chat_widget',
  status text default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'lost')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- =========================================================
-- 4) CONVERSATIONS
-- Stores chatbot session transcripts and lead capture progress
-- =========================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.sites(id) on delete cascade,
  visitor_id text not null,
  lead_id uuid references public.leads(id) on delete set null,
  transcript jsonb not null default '[]'::jsonb,
  last_message text,
  lead_captured boolean default false,
  current_stage text default 'chat',
  capture_state jsonb default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- =========================================================
-- 5) INDEXES
-- Helps dashboard and chat performance
-- =========================================================
create index if not exists idx_sites_user_id on public.sites(user_id);
create index if not exists idx_kb_site_id on public.knowledge_base(site_id);
create index if not exists idx_leads_site_id on public.leads(site_id);
create index if not exists idx_leads_created_at on public.leads(created_at desc);
create index if not exists idx_conversations_site_id on public.conversations(site_id);
create index if not exists idx_conversations_visitor_id on public.conversations(visitor_id);
create index if not exists idx_conversations_created_at on public.conversations(created_at desc);

-- =========================================================
-- 6) UPDATED_AT TRIGGER
-- Auto-updates updated_at on row changes
-- =========================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_sites_updated_at on public.sites;
create trigger trg_sites_updated_at
before update on public.sites
for each row
execute function public.set_updated_at();

drop trigger if exists trg_kb_updated_at on public.knowledge_base;
create trigger trg_kb_updated_at
before update on public.knowledge_base
for each row
execute function public.set_updated_at();

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

drop trigger if exists trg_conversations_updated_at on public.conversations;
create trigger trg_conversations_updated_at
before update on public.conversations
for each row
execute function public.set_updated_at();

-- =========================================================
-- 7) ROW LEVEL SECURITY
-- =========================================================
alter table public.sites enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.leads enable row level security;
alter table public.conversations enable row level security;

-- ---------------------------------------------------------
-- PUBLIC READ POLICIES (for demo widget use)
-- ---------------------------------------------------------

drop policy if exists "Public read sites" on public.sites;
create policy "Public read sites"
on public.sites
for select
using (true);

drop policy if exists "Public read knowledge base" on public.knowledge_base;
create policy "Public read knowledge base"
on public.knowledge_base
for select
using (true);

-- ---------------------------------------------------------
-- PUBLIC INSERT POLICIES (for chatbot widget)
-- NOTE:
-- For V1 demo, these allow widget inserts.
-- In a stricter production version, route all writes through server-side API.
-- ---------------------------------------------------------

drop policy if exists "Public insert leads" on public.leads;
create policy "Public insert leads"
on public.leads
for insert
with check (true);

drop policy if exists "Public insert conversations" on public.conversations;
create policy "Public insert conversations"
on public.conversations
for insert
with check (true);

drop policy if exists "Public update conversations" on public.conversations;
create policy "Public update conversations"
on public.conversations
for update
using (true)
with check (true);

-- ---------------------------------------------------------
-- AUTHENTICATED ADMIN POLICIES
-- Owner can manage their own site data
-- ---------------------------------------------------------

drop policy if exists "Admin manage own sites" on public.sites;
create policy "Admin manage own sites"
on public.sites
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Admin manage own knowledge base" on public.knowledge_base;
create policy "Admin manage own knowledge base"
on public.knowledge_base
for all
using (
  exists (
    select 1 from public.sites s
    where s.id = knowledge_base.site_id
    and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.sites s
    where s.id = knowledge_base.site_id
    and s.user_id = auth.uid()
  )
);

drop policy if exists "Admin manage own leads" on public.leads;
create policy "Admin manage own leads"
on public.leads
for all
using (
  exists (
    select 1 from public.sites s
    where s.id = leads.site_id
    and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.sites s
    where s.id = leads.site_id
    and s.user_id = auth.uid()
  )
);

drop policy if exists "Admin manage own conversations" on public.conversations;
create policy "Admin manage own conversations"
on public.conversations
for all
using (
  exists (
    select 1 from public.sites s
    where s.id = conversations.site_id
    and s.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.sites s
    where s.id = conversations.site_id
    and s.user_id = auth.uid()
  )
);

-- =========================================================
-- 8) DEMO SITE SEED
-- =========================================================

insert into public.sites (
  id,
  name,
  domain,
  bot_display_name,
  welcome_message,
  fallback_message,
  brand_color,
  support_phone,
  support_email
)
values (
  'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
  'PrimeNest Realty',
  'demo.estateflow.ai',
  'PrimeNest Assistant',
  'Hi 👋 Welcome to PrimeNest Realty. Looking to rent, buy, or invest in property today?',
  'I may not have that exact detail here, but I can help get your inquiry through to the team. Can I get a few details?',
  '#2563eb',
  '+2348000000000',
  'hello@primenestrealty.com'
)
on conflict (id) do update set
  name = excluded.name,
  domain = excluded.domain,
  bot_display_name = excluded.bot_display_name,
  welcome_message = excluded.welcome_message,
  fallback_message = excluded.fallback_message,
  brand_color = excluded.brand_color,
  support_phone = excluded.support_phone,
  support_email = excluded.support_email,
  updated_at = timezone('utc', now());

-- =========================================================
-- 9) DEMO KNOWLEDGE BASE SEED
-- =========================================================

insert into public.knowledge_base (site_id, question, answer, category)
values
  (
    'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
    'What areas do you cover?',
    'We help clients with residential and investment property inquiries across key city locations and surrounding neighborhoods.',
    'Service Area'
  ),
  (
    'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
    'Do you offer rentals?',
    'Yes — we can help with rental inquiries, including apartments, houses, and other residential options.',
    'Rentals'
  ),
  (
    'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
    'How do I book a viewing?',
    'You can book a viewing by sharing the type of property you are interested in, your preferred location, and a suitable date.',
    'Process'
  ),
  (
    'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
    'Do you help buyers and investors?',
    'Yes — we assist home buyers, renters, and investors depending on their property goals.',
    'Services'
  ),
  (
    'd3b07384-d9a8-44d4-9f44-8d966e3a9c78',
    'How does the inquiry process work?',
    'Once you share your property needs, our team can help narrow suitable options and follow up with the next steps.',
    'Process'
  )
on conflict do nothing;
