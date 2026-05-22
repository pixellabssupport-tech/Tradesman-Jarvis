'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'jarvis'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'jarvis',
      content: "What do you need on the job site today?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })

      const data = await res.json()
      const jarvisMessage: Message = {
        role: 'jarvis',
        content: data.response || data.error || 'No response'
      }
      setMessages(prev => [...prev, jarvisMessage])
    } catch {
      setMessages(prev => [...prev, {
        role: 'jarvis',
        content: 'Connection error. Check your signal and try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const startVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Voice not supported on this browser. Type your question.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      sendMessage(transcript)
    }

    recognition.onerror = () => {
      setListening(false)
      alert('Could not hear you. Try again.')
    }

    recognition.start()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      backgroundColor: '#0a0a0a',
      color: '#ffffff'
    }}>

      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#FF6B00',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>J</div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Tradesman Jarvis</div>
          <div style={{ fontSize: '12px', color: '#FF6B00' }}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: msg.role === 'user' ? '#FF6B00' : '#1a1a1a',
              color: '#ffffff',
              fontSize: '15px',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              backgroundColor: '#1a1a1a',
              color: '#FF6B00'
            }}>
              Jarvis is thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #222',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end'
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage(input)
            }
          }}
          placeholder="Ask Jarvis anything..."
          rows={1}
          style={{
            flex: 1,
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #333',
            borderRadius: '24px',
            padding: '14px 18px',
            fontSize: '16px',
            resize: 'none',
            outline: 'none',
            minHeight: '56px'
          }}
        />

        {/* Voice Button */}
        <button
          onClick={startVoice}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: listening ? '#FF6B00' : '#1a1a1a',
            border: '2px solid #FF6B00',
            color: '#FF6B00',
            fontSize: '24px',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          🎤
        </button>

        {/* Send Button */}
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: input.trim() ? '#FF6B00' : '#333',
            border: 'none',
            color: '#ffffff',
            fontSize: '24px',
            cursor: input.trim() ? 'pointer' : 'default',
            flexShrink: 0
          }}
        >
          ➤
        </button>
      </div>
    </div>
  )
      }
