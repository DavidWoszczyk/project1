"use client"

import { useEffect, useState } from "react"

export default function History() {
  const [history, setHistory] = useState<any[]>([])

 useEffect(() => {
  const loadHistory = () => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch("http://localhost:8000/ai/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setHistory(data))
  }

  loadHistory()

  window.addEventListener("historyUpdated", loadHistory)

  return () => {
    window.removeEventListener("historyUpdated", loadHistory)
  }
}, [])

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-black">Your History</h3>

      {history.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 mb-3 bg-gray-50"
        >
          <p className="font-semibold text-black">
            {item.input_text}
          </p>
          <p className="text-gray-800 mt-2">
            {item.output_text}
          </p>
        </div>
      ))}
    </div>
  )
}