import { useSupabase } from '@/app/components/Providers'
import { useEffect, useState } from 'react'

export function useUser() {
  const { supabase, user } = useSupabase()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user])

  return { user, loading, supabase }
}