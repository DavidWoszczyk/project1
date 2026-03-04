"use client"

import { useState } from "react"

export default function Chat() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    setLoading(true)

    const res = await fetch(
      "http://localhost:8000/ai/chat?prompt=" + message,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await res.json()
    setResponse(data.response)
    setLoading(false)
  }

  return (
    <div>
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={4}
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Thinking..." : "Send"}
      </button>

      {response && (
        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
          <p className="whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  )
}