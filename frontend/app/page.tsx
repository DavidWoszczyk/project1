
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-white mb-6">
        AI Backend Pro
      </h1>

      <p className="text-gray-700 mb-8">
        AI-powered backend with authentication and user history
      </p>

      <div className="space-x-4">
        <a
          href="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </a>

        <a
          href="/login"
          className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-100"
        >
          Login
        </a>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        If you already have an account, login above.
      </p>
    </div>
  )
}