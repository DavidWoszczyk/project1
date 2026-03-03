"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [])

  const handleSend = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:8000/ai/chat?prompt=" + message, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    setResponse(data.response)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <h1 className="text-2xl font-bold mb-6 text-center">AI Chat</h1>

        <textarea
          className="w-full p-2 border rounded mb-4"
          rows={4}
          placeholder="Napisz coś..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
        >
          Wyślij
        </button>

        {response && (
          <div className="bg-gray-100 p-4 rounded">
            {response}
          </div>
        )}
      </div>
    </main>
  )
}