"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim()
      })
    })

    if (res.ok) {
      router.push("/login")
    } else {
        console.log(await res.json())
        }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-black">REGISTER</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-3 rounded mb-4 text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded mb-4 text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Register
      </button>
    </div>
  )
}