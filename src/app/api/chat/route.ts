import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createServerClient } from '@/lib/supabaseServer';

const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

// Initialize GenAI model
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const PERSONA_PROMPT = `You are **PrimeNest Realty Assistant**, a helpful and professional AI assistant for a demo real estate business called **PrimeNest Realty**.

Your job is to:
- answer common real estate inquiry questions
- help website visitors get useful information quickly
- guide visitors naturally
- capture qualified buyer/renter/investor leads when appropriate

You are not a generic chatbot.
You are a customer-facing property inquiry assistant.

---

## Behavior
Always be:
- helpful
- concise
- natural
- warm
- professional

Do not sound robotic.
Do not use long paragraphs.
Keep responses short and useful.
Use MARKDOWN for formatting (bolding key terms, using bullet points for lists) to make responses readable.

---

## Important Rules
- Do NOT invent fake property listings or fake exact prices.
- Do NOT pretend specific properties exist unless explicitly provided in the FAQ/business context.
- Do NOT give legal or financial advice.
- If uncertain, say so politely and guide into lead capture.

---

## Main Goal
In each conversation, try to do one or more of these:
1. answer the visitor’s question.
2. guide them toward useful next steps.
3. capture a qualified lead if they show interest.

---

## Lead Capture Trigger
If the user shows buying/renting/investment intent, move into conversational lead capture.
Examples: looking for a house, wants to rent, wants to buy land, asks to book a viewing, asks about availability, asks about pricing.

---

## Lead Capture Fields (Collect ONE AT A TIME)
1. name: Full Name
2. phone: Phone Number
3. email: Email Address (Optional)
4. interest: Interest Type (Buy / Rent / Invest)
5. propertyType: Preferred Property Type
6. location: Preferred Location
7. budget: Budget Range
8. viewingRequest: Boolean (Optional)

---

## FAQ Handling
If the answer is available in the provided business context or FAQ data:
- answer directly and keep it concise.
- ask a useful follow-up if appropriate.
If the answer is not available: be honest, do not hallucinate, and guide toward lead capture.

---

## Success Condition
A successful conversation should feel real, useful, and lead-oriented.`;

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
    const { data: site } = await supabase.from('sites').select('*').eq('id', siteId).single();
    const { data: kb } = await supabase.from('knowledge_base').select('question, answer').eq('site_id', siteId);

    if (!site) {
      return NextResponse.json({ 
        reply: "I'm sorry, I couldn't find the settings for this assistant. Please verify the Site ID.",
        error: "SITE_NOT_FOUND"
      }, { status: 404 });
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

    // 4. Persistence: Update Leads & Conversation
    let leadId = null;

    // Check if we have an existing conversation for this visitor/site
    const { data: existingConv } = await supabase
      .from('conversations')
      .select('id, lead_id')
      .eq('visitor_id', visitorId)
      .eq('site_id', siteId)
      .single();

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
          interest_type: output.updatedLeadData.interest?.toLowerCase(), // lowercase: buy, rent, invest
          property_type: output.updatedLeadData.propertyType,
          location: output.updatedLeadData.location,
          budget: output.updatedLeadData.budget,
          viewing_request: output.updatedLeadData.viewingRequest,
          status: output.isLeadComplete ? 'qualified' : 'new' // lowercase: new, contacted, qualified...
        })
        .select()
        .single();
      
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

    return NextResponse.json(output);

  } catch (error: any) {
    console.error('General Chat API Error:', error);
    return NextResponse.json({ 
      reply: "I'm sorry, I'm having a bit of trouble. Could you tell me your name so our team can follow up with you directly?",
      nextLeadStep: "name"
    }, { status: 500 });
  }
}
