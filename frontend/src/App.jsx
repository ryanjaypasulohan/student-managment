import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Get API URL from environment variable or fallback to localhost for development
  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setGreeting('')

    try {
      const response = await fetch(`${API_URL}/api/greet`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Request failed: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      setGreeting(data.greeting || '')
    } catch (error) {
      console.error('API Error:', error)
      setErrorMessage(error.message || 'Failed to connect to API')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '48px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Laravel + React Greeting</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '8px 16px' }}>
          {isLoading ? 'Sending...' : 'Greet'}
        </button>
      </form>

      {greeting && (
        <p style={{ marginTop: 16, fontSize: 18 }}>
          <strong>Response:</strong> {greeting}
        </p>
      )}

      {errorMessage && (
        <p style={{ marginTop: 16, color: 'crimson' }}>
          <strong>Error:</strong> {errorMessage}
        </p>
      )}

      <div style={{ marginTop: 24, color: '#666', fontSize: '14px' }}>
        <p><strong>API URL:</strong> {API_URL}</p>
        <p><strong>Status:</strong> {isLoading ? 'Connecting...' : 'Ready'}</p>
      </div>
    </div>
  )
}

export default App
