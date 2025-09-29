'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const search = useSearchParams()
  const redirectedFrom = search.get('redirectedFrom') || '/admin'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return setError(error.message)
    router.replace(redirectedFrom)
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-16 space-y-3">
      <h1 className="text-xl font-semibold">Admin Login</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        className="border p-2 w-full"
        placeholder="E-Mail"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Passwort"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
    </form>
  )
}
