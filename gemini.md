# EstateFlow AI — Build Specification

## Project Overview
Build a production-ready SaaS-lite web app called **EstateFlow AI**.

EstateFlow AI is a **done-for-you AI chatbot + lead capture system for real estate businesses**.

Its purpose is to help real estate companies:
- answer customer questions instantly
- capture and qualify property leads
- reduce missed inquiries
- store and manage conversations
- provide a simple admin dashboard

This is not a demo toy. Build it as a clean, real-world MVP that can be used with actual clients.

---

# Core Product Goal
A real estate business installs a chat widget on their website.

Visitors can:
- ask property-related questions
- get answers from the AI assistant
- request inspections / viewings
- submit interest in a property
- leave contact information

The business owner/admin can:
- log in
- view captured leads
- view chat history
- manage FAQs / knowledge base
- edit bot settings
- copy an install script

---

# Tech Stack
Use this stack unless a strong reason exists not to:

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend
- Next.js API routes or server actions

## Database / Auth
- Supabase
- Supabase Auth

## AI Layer
- Gemini API integration

## Deployment
- Vercel (frontend)
- Supabase backend

---

# Product Structure

## 1. Public Marketing Site
Pages:
- `/`
- `/demo` (optional)
- `/contact` (optional)

## 2. Admin App
Pages:
- `/login`
- `/dashboard`
- `/dashboard/leads`
- `/dashboard/conversations`
- `/dashboard/knowledge`
- `/dashboard/settings`
- `/dashboard/install`

## 3. Embedded Widget
- embeddable website chat widget
- can be loaded via script snippet

---

# User Roles

## Admin
The paying business user.

Can:
- log in
- manage bot data
- view leads
- view conversations
- update settings

No need for multiple roles in V1.

---

# Core V1 Features

## A. Marketing Site
Build a polished landing page for EstateFlow AI.

### Landing page sections:
1. Hero
2. Problem / solution
3. Feature highlights
4. How it works
5. Demo CTA
6. Pricing teaser
7. Final CTA

### Hero copy concept:
"Turn website visitors into property leads — automatically."

Include:
- CTA button: "Book a Demo"
- CTA button: "See How It Works"

---

## B. Authentication
Simple admin login.

Requirements:
- email/password auth
- protected dashboard routes
- redirect unauthenticated users to login

---

## C. Dashboard Overview
Create a clean dashboard home.

### Display:
- total leads
- total conversations
- leads this week
- latest leads
- recent chats

Use clean KPI cards and tables.

---

## D. Leads Management
Create `/dashboard/leads`.

### Features:
- table of captured leads
- searchable list
- lead detail view or slide-over
- status field

### Lead fields:
- id
- full_name
- phone
- email
- inquiry_type
- preferred_location
- budget_range
- preferred_property_type
- preferred_viewing_date
- notes
- source
- status
- created_at

### Lead status options:
- new
- contacted
- qualified
- closed
- lost

---

## E. Conversations Page
Create `/dashboard/conversations`.

### Features:
- list of chat sessions
- open session to view messages
- show if lead was captured
- show timestamp

### Conversation fields:
- id
- visitor_session_id
- lead_id (nullable)
- transcript
- created_at

Transcript can be stored as JSON.

---

## F. Knowledge Base / FAQ Management
Create `/dashboard/knowledge`.

This powers chatbot responses.

### Features:
- add FAQ entry
- edit FAQ entry
- delete FAQ entry
- search FAQs

### FAQ fields:
- id
- question
- answer
- category
- created_at

### Seed with real-estate relevant FAQs:
Examples:
- What locations do you cover?
- Do you have 2-bedroom apartments?
- What is the price range?
- Can I book a property inspection?
- Do you handle rentals and sales?
- What documents are required?

---

## G. Bot Settings Page
Create `/dashboard/settings`.

### Editable settings:
- business name
- bot display name
- welcome message
- fallback message
- support phone
- support email
- brand color (optional simple string)
- company logo URL (optional)
- lead capture toggle

### Example default values:
- business_name: "PrimeNest Realty"
- bot_name: "EstateFlow Assistant"
- welcome_message: "Hi 👋 Looking for a property? I can help you find options and book a viewing."
- fallback_message: "I can help with that. Can I get your details so the team can reach out?"

---

## H. Install Page
Create `/dashboard/install`.

This page should give the business owner a simple embed snippet.

### Example:
```html
<script src="https://yourdomain.com/widget.js" data-bot-id="demo-bot"></script>
