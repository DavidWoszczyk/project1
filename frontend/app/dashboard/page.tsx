"use client"

import { useState } from "react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("chat")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("summarize")}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Summarize
        </button>
      </div>

      {activeTab === "chat" && <div>Chat component here</div>}
      {activeTab === "summarize" && <div>Summarize component here</div>}

    </div>
  )
}