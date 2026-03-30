# EstateFlow - Project Status & Roadmap

## 🚀 Overview
EstateFlow is a production-ready AI-driven real estate assistant platform. It allows real estate agencies to embed an intelligent chat widget on their websites to answer property-related questions from a knowledge base and capture qualified leads into a dashboard.

## 🏗️ Current State
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Backend:** Supabase (PostgreSQL, Auth, RLS).
- **AI Engine:** Google Gemini 1.5 Flash via `@google/generative-ai`.
- **Key Features:**
  - AI Chat API with Knowledge Base (KB) integration.
  - Persona-driven lead capture flow.
  - Supabase schema for Sites, KB, Leads, and Conversations.
  - Demo mode for "PrimeNest Realty".
  - **NEW:** Robust Dashboard Sidebar & Layout.
  - **NEW:** Functional Leads Dashboard.
  - **NEW:** Functional Knowledge Base Management UI.
  - **NEW:** Functional Conversations Transcript List.

## 🛠️ Known Issues & Fixes
- [x] **Chat Logic Error:** Gemini API `fetch failed`. (Improved error handling, fixed `siteId` mismatch, added fallback responses).
- [x] **Schema-Code Mismatch:** `leads` table uses `full_name`, but AI output uses `name`. (Fixed in `route.ts`).
- [x] **Sidebar/Navigation:** Fixed duplicate desktop navigation by removing redundant wrappers.
- [x] **Demo Mode Persistence:** Enabled full database persistence for the PrimeNest Realty demo via a fixed UUID.
- [ ] **RLS Policies:** Current policies are too permissive (`Public Insert` with no restrictions).

## 📅 Roadmap & Improvements

### Phase 1: Stability & Core (Completed/Ongoing)
- [x] **Sync Schema & Code:** Align database column names with AI output and frontend logic.
- [x] **Robust Error Handling:** Improve API resilience and user-facing error messages.
- [x] **Dashboard Structure:** Implemented proper sidebar and page layouts.
- [ ] **Persistence for Demo:** Enable session-based persistence for the demo site.

### Phase 2: Professional Polish
- [ ] **KB CRUD Logic:** Implement the backend actions for Add/Edit/Delete KB entries.
- [ ] **Lead Details View:** Expand lead rows to show full conversation context.
- [ ] **Widget Customization:** UI to change brand colors, bot name, and welcome message.
- [ ] **Streaming Responses:** Implement AI response streaming for a better UX.

### Phase 3: Advanced Features
- [ ] **Image Support:** Allow users to upload property photos for AI analysis.
- [ ] **Appointment Scheduling:** Integration with Calendly/Google Calendar.
- [ ] **Multi-site Support:** Better multi-tenant isolation in the dashboard.
- [ ] **Email Notifications:** Alert agents when a high-quality lead is captured.

## 📜 Guiding Rules & Hypothesis
- **Hypothesis:** A persona-driven, conversational lead capture flow converts better than static forms.
- **Rule 1:** Never hallucinate property data. If it's not in the KB, capture a lead for human follow-up.
- **Rule 2:** Privacy first. PII must be handled securely and only accessible to the authorized agency.
- **Rule 3:** The widget must be lightweight and fast to load on external sites.
