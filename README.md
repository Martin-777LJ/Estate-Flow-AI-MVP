# EstateFlow AI — Real Estate Lead Capture

EstateFlow AI is a premium SaaS-lite solution designed to help real estate agencies capture more leads through an AI-powered website chat assistant.

## Features
- **High-Conversion Landing Page:** Modern marketing site designed to sell the value proposition.
- **Embedded Chat Widget:** A polished, floating chatbot that uses the **Gemini 1.5 Flash** model for FAQ handling and conversational lead capture.
- **Admin Dashboard:** Comprehensive control panel for managing leads, conversations, and training the bot's Knowledge Base.
- **AI Intelligence:** State-aware lead capture flow (Name, Phone, Property Preferences) that naturally qualifies prospects.
- **Persistence:** Full conversation and lead data stored in **Supabase**.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI/UX:** Tailwind CSS + Framer Motion + Lucide Icons
- **Backend:** Next.js Route Handlers
- **Database/Auth:** Supabase (PostgreSQL)
- **AI Engine:** Google Gemini Pro / Flash API

## Quick Start
1. **Clone & Install:**
   ```bash
   npm install
   ```
2. **Environment Setup:**
   Copy `.env.example` to `.env.local` and fill in your Supabase and Gemini API keys.
3. **Database Setup:**
   Run the SQL migration in `supabase/migrations/` on your Supabase project.
4. **Run Development:**
   ```bash
   npm run dev
   ```

## Installation (Client Site)
To install the widget on a client's website, paste the snippet from the **Install** page in the dashboard:
```html
<script 
  src="https://app.estateflow.ai/widget.js" 
  data-site-id="YOUR_SITE_ID" 
  async 
></script>
```

---
Built with **EstateFlow AI** — Premium Property Lead Capture.
