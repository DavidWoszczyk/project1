"use client"

import { useEffect, useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      return
    }

    fetch("http://localhost:8000/ai/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        setUser(data)
      })
      .catch(() => {
        localStorage.removeItem("token")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  if (loading) return null

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href={user ? "/dashboard": "/"}
        className="font-bold text-xl text-black">
          AI Backend Pro
        </a>

        <div className="space-x-4">
          {!user ? (
            <>
              <a href="/login" className="hover:text-blue-600">
                Login
              </a>
              <a href="/register" className="hover:text-blue-600">
                Register
              </a>
            </>
          ) : (
            <>
              <span className="text-gray-700">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}