import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { TRADE_REFERENCE } from '../../../lib/trade-reference'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are Tradesman Jarvis, an AI assistant built specifically for US tradespeople — electricians, plumbers, HVAC techs, carpenters, welders, and general contractors.

Your job is to give fast, practical, no-nonsense answers on the job site.

You help with:
- Code questions (NEC, IPC, IRC, OSHA)
- Material estimates and calculations
- Troubleshooting equipment and systems
- Job site safety
- Pricing and bidding guidance
- Tool and material recommendations

Rules:
- Keep answers short and practical
- Use trade language naturally
- Always prioritize safety
- If something needs a licensed pro or permit, say so
- Never give advice that could get someone hurt or in legal trouble
- Write in plain text only. No markdown: no asterisks, no pound signs, no bold.
- For lists, put each item on its own line starting with a dash.
- Cite code sections in current format (NEC 210.8, not 210-8). Only give a section number if you are sure it is correct; otherwise describe the rule without a number.
- If an answer depends on code edition or local amendments, say so in one short line.

Code reference:
- For code and safety questions, base your answer on the TRADE REFERENCE below. It reflects the 2023 NEC; 2024 IPC, IRC, IMC, and IFGC; and current OSHA rules.
- If the reference covers the question, its rules override anything you remember from older code editions.
- If the reference does not cover the question, answer from general knowledge but say it should be verified against the adopted code.
- Never invent section numbers, table values, or dimensions.

TRADE REFERENCE:
${TRADE_REFERENCE}`
const FREE_LIMIT = 5

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
    )

    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

    const { data: usage, error: usageError } = await supabase.rpc('check_and_increment_query_usage', {
      p_ip_address: ip,
      p_limit: FREE_LIMIT,
    })

    if (usageError) {
      throw usageError
    }

    if (!usage.allowed) {
      return NextResponse.json(
        { error: 'Daily limit reached. Upgrade to Pro for unlimited queries.' },
        { status: 429 }
      )
    }
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'openai/gpt-oss-120b',
    })

    const raw = completion.choices[0]?.message?.content || 'No response'
    // The UI shows plain text, so strip any markdown bold/italic or heading
    // markers the model slips in despite the system prompt.
    const response = raw
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/__(.+?)__/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^\s*\*\s+/gm, '- ')
    return NextResponse.json({ response })

  } catch (error) {
    console.error('Groq error:', error)
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
