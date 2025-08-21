'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      user === process.env.NEXT_PUBLIC_ADMIN_USER &&
      pass === process.env.NEXT_PUBLIC_ADMIN_PASS
    ) {
      document.cookie = `auth_token=ok; path=/`
      router.push('/admin')
    } else {
      setError('Ungültige Anmeldedaten')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-full mb-2"
        placeholder="Benutzername"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 w-full mb-2"
        placeholder="Passwort"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  )
}
