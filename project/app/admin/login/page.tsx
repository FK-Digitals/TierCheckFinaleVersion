'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      return
    }
    // Supabase-Session ist jetzt gesetzt -> Middleware lässt /admin durch
    router.replace('/admin')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        className="border p-2 w-full"
        placeholder="E-Mail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Passwort"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
    </form>
  )
}
