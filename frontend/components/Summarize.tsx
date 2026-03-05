"use client"

import { useState } from "react"

export default function Summarize() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    setLoading(true)

    const res = await fetch("http://localhost:8000/ai/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ input_text: text })
    })

    const data = await res.json()
    setResult(data.output_text)
    setLoading(false)
    window.dispatchEvent(new Event("historyUpdated"))
  }

  return (
    <div>
      <textarea
        className="w-full border rounded-lg p-3 mb-4 text-black"
        rows={6}
        placeholder="Paste text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {result && (
        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
          <p className="text-black whitespace-pre-line">{result}</p>
        </div>
      )}
    </div>
  )
}