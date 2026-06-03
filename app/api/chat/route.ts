import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

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
- Never give advice that could get someone hurt or in legal trouble`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      )
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
    })

    const response = completion.choices[0]?.message?.content || 'No response'

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Groq error:', error)
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
