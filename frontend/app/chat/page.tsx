"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const router = useRouter()
    const [loading, setLoading] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [])

  const handleSend = async () => {
  const token = localStorage.getItem("token")
  if (!token){
      console.log("No token")
      return
      }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      input_text: message
    })
  })
    console.log("Status:", res.status)
  const data = await res.json()
  console.log(data)
  setResponse(data.output_text)

  setMessage("")
  setLoading(false)

  window.dispatchEvent(new Event("historyUpdated"))
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 text-black">
      <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-6">AI Assistant</h2>

    <textarea
      className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
      placeholder="Ask something..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button
      onClick={handleSend}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    >
    {loading ? "Thinking..." : "Send"}
    </button>

    {response && (
      <div className="mt-6 bg-gray-50 border rounded-lg p-4">
        <p className="text-gray-800 whitespace-pre-line">{response}</p>
      </div>
    )}
  </div>
    </main>
  )
}