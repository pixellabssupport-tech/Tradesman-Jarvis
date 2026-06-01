import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

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

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'})

    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nTradesman` asks: ${message}`
    )

    const response = result.response.text()

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Gemini error:', error)
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    )
  }
}
