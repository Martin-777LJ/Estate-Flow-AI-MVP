import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createServerClient } from '@/lib/supabaseServer';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const PERSONA_PROMPT = `You are EstateFlow AI Assistant, a helpful, professional, and concise property assistant.

Your job is to:
- answer common real estate questions from the Knowledge Base (KB)
- capture qualified leads (buyer/renter/investor)
- guide users toward booking a viewing

CORE BEHAVIOR:
- Helpful, clear, warm, concise, professional.
- Natural sounding, not robotic.
- Answer questions if the answer is in the KB.
- If uncertain or the user is interested, collect lead details ONE AT A TIME.
- DO NOT invent property listings, prices, or facts.
- DO NOT give legal or financial advice.

LEAD CAPTURE FLOW (ONLY collect what is missing):
1. Full name
2. Phone number
3. Email (optional)
4. Interest (Buy/Rent/Invest)
5. Property type
6. Preferred location
7. Budget range
8. Viewing request (optional)`;

export async function POST(req: NextRequest) {
  const supabase = createServerClient();
  
  try {
    const { messages, siteId, visitorId, currentLeadStep, leadData } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    // 1. Load Bot Settings & KB
    const { data: site } = await supabase.from('sites').select('*').eq('id', siteId).single();
    const { data: kb } = await supabase.from('knowledge_base').select('question, answer').eq('site_id', siteId);

    const kbContext = kb?.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') || "No KB data available.";

    // 2. Build AI Prompt
    const prompt = `
      ${PERSONA_PROMPT}
      
      SITE SETTINGS:
      Business Name: ${site?.name || 'EstateFlow Agency'}
      Bot Name: ${site?.bot_display_name || 'Estate Assistant'}
      Welcome: ${site?.welcome_message}
      Fallback: ${site?.fallback_message}

      KNOWLEDGE BASE (KB):
      ${kbContext}

      CURRENT LEAD STATUS:
      Current Data: ${JSON.stringify(leadData || {})}
      Current Missing Field: ${currentLeadStep || 'None'}

      CONVERSATION HISTORY:
      ${messages.map((m: any) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n')}

      INSTRUCTIONS:
      - If the visitor's last message contains lead data (e.g. they gave their name), update leadData.
      - If the visitor's message is answered in the KB, answer it concisely.
      - If you need to capture the NEXT lead field, ask for it naturally.
      - If all lead data is captured, confirm and thank them.
      
      OUTPUT FORMAT (JSON):
      {
        "reply": "Assistant's response text",
        "updatedLeadData": { ...all captured fields so far... },
        "nextLeadStep": "field_name", 
        "isLeadComplete": boolean
      }
    `;

    // 3. Generate Content
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const output = JSON.parse(result.response.text());

    // 4. Persistence: Update Conversation Transcript
    const transcript = messages.concat([{ id: 'bot-reply', role: 'bot', content: output.reply }]);
    
    // Upsert conversation
    const { data: existingConv } = await supabase
      .from('conversations')
      .select('id, lead_id')
      .eq('visitor_id', visitorId)
      .eq('site_id', siteId)
      .single();

    let leadId = existingConv?.lead_id;

    // 5. If lead is newly collected or updated, save it
    if (Object.keys(output.updatedLeadData || {}).length > 0) {
      const { data: newLead, error: leadErr } = await supabase
        .from('leads')
        .upsert({
          id: leadId,
          site_id: siteId,
          full_name: output.updatedLeadData.name,
          phone: output.updatedLeadData.phone,
          email: output.updatedLeadData.email,
          interest_type: output.updatedLeadData.interest,
          property_type: output.updatedLeadData.propertyType,
          location: output.updatedLeadData.location,
          budget: output.updatedLeadData.budget,
          status: output.isLeadComplete ? 'Qualified' : 'New'
        })
        .select()
        .single();
      
      if (newLead) leadId = newLead.id;
    }

    await supabase.from('conversations').upsert({
      id: existingConv?.id,
      site_id: siteId,
      visitor_id: visitorId,
      lead_id: leadId,
      transcript,
      last_message: output.reply,
      lead_captured: output.isLeadComplete
    });

    return NextResponse.json(output);

  } catch (error) {
    console.error('Chat Logic Error:', error);
    return NextResponse.json({ 
      reply: "I'm sorry, I'm having a bit of trouble. Could you tell me your name so our team can follow up with you directly?",
      nextLeadStep: "name"
    });
  }
}
