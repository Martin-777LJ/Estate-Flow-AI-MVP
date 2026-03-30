# EstateFlow AI — Real Estate Lead Capture

EstateFlow AI is a premium SaaS-lite solution designed to help real estate agencies capture more leads through an AI-powered website chat assistant.

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file in the root directory and add the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Gemini AI (Project uses GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY)
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

**Note:** For Vercel deployment, ensure these variables are added to the Project Settings > Environment Variables. The build will fail if `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not provided, as they are required for Supabase client initialization.


### 2. Database Schema
Run the SQL content from `supabase/migrations/20260328000000_initial_schema.sql` in your Supabase SQL Editor. This will:
- Create the necessary tables (`sites`, `knowledge_base`, `leads`, `conversations`).
- Set up Row Level Security (RLS) policies.
- Seed the database with the **PrimeNest Realty** demo business data.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Project
```bash
npm run dev
```

## 🛠 Features

- **24/7 AI Assistant:** Powered by Google Gemini 1.5 Flash.
- **Conversational Lead Capture:** Automatically identifies user intent and collects contact details.
- **Knowledge Base Integration:** AI answers questions based on business-specific FAQs.
- **Admin Dashboard:** Manage captured leads and view live conversation transcripts.
- **Responsive Design:** Polished UI built with Tailwind CSS and Framer Motion.

## 📁 Key Files

- **AI Logic:** `src/app/api/chat/route.ts`
- **Chat Widget:** `src/components/widget/ChatWidget.tsx`
- **Dashboard Layout:** `src/components/dashboard/DashboardLayout.tsx`
- **Demo Config:** `src/lib/config.ts`

## 🧪 Testing the Demo
1. Go to the landing page (`/`).
2. Click the chat icon in the bottom right.
3. Chat with **PrimeNest Assistant**.
4. Show interest in buying or renting to trigger the lead capture flow.
5. Log in to the dashboard (`/dashboard`) to see your captured lead and the transcript.

---
Built with **EstateFlow AI** — Premium Property Lead Capture.
