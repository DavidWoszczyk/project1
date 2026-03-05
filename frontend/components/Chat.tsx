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

    const res = await fetch("http://localhost:8000/ai/chat", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
              },
          body: JSON.stringify({
              input_text: message
              })
          })
      const data = await res.json()
      setResponse(data.output_text)

      setMessage("")
      setLoading(false)

     window.dispatchEvent(new Event("historyUpdated"))
}
  return (
    <div>
      <textarea
        className="w-full border rounded-lg p-3 mb-4 text-black"
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
          <p className="whitespace-pre-line text-gray-900">{response}</p>
        </div>
      )}
    </div>
  )
}