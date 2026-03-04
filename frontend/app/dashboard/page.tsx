"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Chat from "@/components/Chat"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat")
  const router = useRouter()

  useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
          router.push("/login")
          }
      },[])
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex space-x-4 mb-6">
        <button
  onClick={() => setActiveTab("chat")}
  className={`px-4 py-2 rounded ${
    activeTab === "chat"
      ? "bg-blue-600 text-white"
      : "bg-gray-200"
  }`}
>
  Chat
</button>

        <button
  onClick={() => setActiveTab("summarize")}
  className={`px-4 py-2 rounded ${
    activeTab === "Summarize"
      ? "bg-blue-600 text-white"
      : "bg-gray-200"
  }`}
>
  Summarize
</button>
      </div>

      {activeTab === "chat" && <Chat />}

    </div>
  )
}