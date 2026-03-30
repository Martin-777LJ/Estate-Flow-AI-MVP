import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createServerClient } from '@/lib/supabaseServer';

const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '';

// Initialize GenAI model
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

const PERSONA_PROMPT = `You are **PrimeNest Realty Assistant**, a polished, professional, and helpful AI assistant for **PrimeNest Realty**.

Your goal is to guide visitors through property inquiries and capture high-quality leads using a **guided hybrid assistant** approach.

---

## CORE FLOWS
You must classify the user's intent into one of these flows and guide them step-by-step:

1. **Browse Properties**
   - Response: "Sure — I can help with that. We currently help clients explore: Apartments, Houses, Luxury Homes, and Investment Properties. Are you looking to rent, buy, or invest?"
   - Options: ["Rent", "Buy", "Invest", "Speak to an Agent"]

2. **Rent a Home**
   - Step 1 (Property Type): "Great — I can help with rental options. What property type are you interested in?"
     - Options: ["Apartment", "House", "Duplex", "Condo"]
   - Step 2 (Location): "Which location are you considering?"
     - Options: ["Lekki", "Victoria Island", "Ikoyi", "Ajah"]
   - Step 3 (Budget): "What is your budget range?"
     - Options: ["Under ₦1M / year", "₦1M – ₦3M / year", "₦3M – ₦5M / year", "₦5M+"]
   - Step 4 (Closing): "Great — would you like our team to help you find matching options?"
     - Options: ["Yes, Contact Me", "Keep Browsing", "Speak to an Agent"]

3. **Buy Property**
   - Step 1 (Intent): "Absolutely — I can help with property purchase inquiries. Are you looking for a personal home or an investment property?"
     - Options: ["Personal Home", "Investment", "Land", "Luxury Property"]
   - Step 2 (Location): "Which area are you interested in?"
     - Options: ["Lekki", "Ikoyi", "VI", "Abuja", "Port Harcourt"]
   - Step 3 (Price): "What price range are you working with?"
     - Options: ["Under ₦50M", "₦50M – ₦150M", "₦150M – ₦300M", "₦300M+"]
   - Step 4 (Closing): "Would you like our team to send you matching opportunities?"
     - Options: ["Yes, Contact Me", "Book a Viewing", "Speak to an Agent"]

4. **Book a Viewing**
   - Step 1 (Type): "Sure — I can help you request a property viewing. Please share a few details so our team can arrange it. What kind of property would you like to view?"
     - Options: ["Apartment", "House", "Duplex", "Luxury Home"]
   - Step 2 (Area): "Which area or property are you interested in?" (Text input)
   - Step 3 (Day): "What day works best for you?"
     - Options: ["This Week", "This Weekend", "Next Week", "I'll Specify"]
   - Step 4 (Lead): Collect Name and Phone.
   - Step 5 (Final): "Thanks — your viewing request has been received. Our team will follow up shortly to confirm the details."
     - Options: ["Speak to an Agent", "Back to Main Menu"]

5. **Speak to an Agent**
   - Response: "You can speak directly with our team using the contact details below:\n\n📞 Call / WhatsApp: +234 800 000 0000\n✉️ Email: hello@primenestrealty.com\n\nIf you'd like, I can also collect your details so an agent can reach out to you directly."
   - Options: ["Leave My Details", "Back to Main Menu"]

---

## LEAD CAPTURE (Collect ONE AT A TIME)
If user selects "Yes, Contact Me" or "Leave My Details":
1. name: Full Name
2. phone: Phone Number
3. email: Email Address (Optional)

---

## THANK-YOU / CLOSING FLOW
After lead capture or request completion:
"Thank you — your request has been received. A member of our team will follow up with you shortly.\n\nIn the meantime, if you'd like, you can continue exploring options here."
- Options: ["Browse More Properties", "Back to Main Menu", "Speak to an Agent"]

---

## BEHAVIOR RULES
- If user types free text, classify it into one of the flows.
  - "I need a 2-bedroom in Lekki" -> Rent flow
  - "Schedule a visit" -> Book a Viewing flow
- Always provide relevant 'options' in the JSON for the current step.
- Keep 'reply' concise and polished.
- Use 'nextLeadStep' to track progress (e.g., 'rent_step_1', 'buy_step_2', 'lead_name', etc.).

---

## FALLBACK
If you cannot fulfill a request or are unsure, use:
"I can still help with common property requests. What would you like to do next?"
- Options: ["Browse Properties", "Rent a Home", "Buy Property", "Book a Viewing", "Speak to an Agent"]

OUTPUT FORMAT (JSON):
{
  "reply": "markdown text",
  "options": ["button1", "button2"],
  "nextLeadStep": "string_identifier",
  "updatedLeadData": {},
  "isLeadComplete": boolean
}
`;

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  
  try {
    const { messages, siteId, visitorId, currentLeadStep, leadData } = await req.json();

    if (!GOOGLE_API_KEY) {
      console.error('GOOGLE_GENERATIVE_AI_API_KEY is missing');
      return NextResponse.json({ 
        reply: "I'm having some configuration issues. Please contact our team directly.",
        error: "API_KEY_MISSING"
      }, { status: 500 });
    }
    
    // 1. Load Bot Settings & KB from Supabase
    let site = null;
    let kb = null;

    try {
      const { data: siteData } = await supabase.from('sites').select('*').eq('id', siteId).single();
      site = siteData;
      const { data: kbData } = await supabase.from('knowledge_base').select('question, answer').eq('site_id', siteId);
      kb = kbData;
    } catch (dbError) {
      console.warn('Database fetch failed, using defaults:', dbError);
    }

    if (!site) {
      // Fallback to demo site if not found in DB or DB fails
      site = {
        name: "PrimeNest Realty",
        bot_display_name: "Estate Assistant",
        welcome_message: "Hi! Welcome to our agency. How can I help you today?",
        fallback_message: "I'm having a bit of trouble accessing specific data, but I can still answer general questions or take your details!"
      };
    }

    const kbContext = kb && kb.length > 0 
      ? kb.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
      : "No specific property data available. Answer general real estate questions.";

    // 2. Build AI Prompt
    const prompt = `
      ${PERSONA_PROMPT}
      
      SITE SETTINGS:
      Business Name: ${site.name}
      Bot Name: ${site.bot_display_name}
      Welcome Message: ${site.welcome_message}
      Fallback Message: ${site.fallback_message}

      KNOWLEDGE BASE (KB):
      ${kbContext}

      CURRENT LEAD STATUS:
      Collected Data: ${JSON.stringify(leadData || {})}
      Last Collected Field: ${currentLeadStep || 'none'}

      CONVERSATION HISTORY:
      ${messages.map((m: any) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n')}

      TASK:
      1. Analyze the visitor's last message.
      2. If they provided new information for a lead field, update 'updatedLeadData'.
      3. Provide a natural, helpful 'reply'.
      4. If we are in the middle of lead capture, ask for the NEXT missing field.
      5. If they ask a question from the KB, answer it.
      
      IMPORTANT: Return ONLY valid JSON.
      
      OUTPUT FORMAT (JSON):
      {
        "reply": "Assistant's response text in markdown",
        "updatedLeadData": { 
           "name": "string",
           "phone": "string",
           "email": "string",
           "interest": "string",
           "propertyType": "string",
           "location": "string",
           "budget": "string",
           "viewingRequest": boolean
        },
        "nextLeadStep": "name | phone | email | interest | propertyType | location | budget | viewingRequest | none",
        "isLeadComplete": boolean
      }
    `;

    // 3. Generate Content
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const responseText = result.response.text();
    const output = JSON.parse(responseText);

    // 4. Persistence: Update Leads & Conversation (Wrap in its own try/catch)
    try {
      let leadId = null;

      // Check if we have an existing conversation for this visitor/site
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id, lead_id')
        .eq('visitor_id', visitorId)
        .eq('site_id', siteId)
        .maybeSingle();

      leadId = existingConv?.lead_id;

      // If there's new lead data, upsert it
      const hasLeadData = output.updatedLeadData && Object.values(output.updatedLeadData).some(v => v !== null && v !== undefined && v !== '');
      
      if (hasLeadData) {
        const { data: newLead, error: leadErr } = await supabase
          .from('leads')
          .upsert({
            id: leadId,
            site_id: siteId,
            full_name: output.updatedLeadData.name,
            phone: output.updatedLeadData.phone,
            email: output.updatedLeadData.email,
            interest_type: output.updatedLeadData.interest?.toLowerCase(), 
            property_type: output.updatedLeadData.propertyType,
            location: output.updatedLeadData.location,
            budget: output.updatedLeadData.budget,
            viewing_request: output.updatedLeadData.viewingRequest,
            status: output.isLeadComplete ? 'qualified' : 'new'
          })
          .select()
          .maybeSingle();
        
        if (newLead) leadId = newLead.id;
        if (leadErr) console.error('Lead Upsert Error:', leadErr);
      }

      // Update conversation transcript
      const transcript = messages.concat([{ id: `bot-${Date.now()}`, role: 'bot', content: output.reply }]);
      
      const { error: convErr } = await supabase.from('conversations').upsert({
        id: existingConv?.id,
        site_id: siteId,
        visitor_id: visitorId,
        lead_id: leadId,
        transcript,
        last_message: output.reply,
        lead_captured: output.isLeadComplete,
        current_stage: output.isLeadComplete ? 'completed' : 'chat',
        capture_state: output.updatedLeadData || {}
      });

      if (convErr) console.error('Conversation Upsert Error:', convErr);
    } catch (persistError) {
      console.error('Persistence failed, but returning AI response:', persistError);
    }

    return NextResponse.json(output);

  } catch (error: any) {
    console.error('General Chat API Error:', error);
    return NextResponse.json({ 
      reply: "I'm sorry, I'm having a bit of trouble. Could you tell me your name so our team can follow up with you directly?",
      nextLeadStep: "name"
    }, { status: 500 });
  }
}
