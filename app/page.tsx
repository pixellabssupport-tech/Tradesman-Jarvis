export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FF6B00' }}>
          Tradesman Jarvis
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Your AI assistant for the job site
        </p>
        <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: '#FF6B00' }} />
        <p className="text-gray-600 text-sm mt-8">
          Coming online...
        </p>
      </div>
    </main>
  )
}
