"use client"

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">AI SaaS</h1>

        <div className="space-x-4">
          <a href="/chat" className="hover:text-blue-600">
            Chat
          </a>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}