"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Chat from "@/components/Chat"
import Summarize from "@/components/Summarize"
import History from "@/components/History"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("chat")
  const [authorized, setAuthorized] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem("token")
          router.push("/login")
        } else {
          setAuthorized(true)
        }
      })
      .catch(() => {
        localStorage.removeItem("token")
        router.push("/login")
      })
      .finally(() => {
        setCheckingAuth(false)
      })
  }, [])

  if (checkingAuth) {
    return <div className="p-10">Checking session...</div>
  }

  if (!authorized) return null

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded ${
            activeTab === "chat"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("summarize")}
          className={`px-4 py-2 rounded ${
            activeTab === "summarize"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Summarize
        </button>
      </div>

      {activeTab === "chat" && <Chat />}
      {activeTab === "summarize" && <Summarize />}

      <History />
    </div>
  )
}