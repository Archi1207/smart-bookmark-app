import { useEffect, useState } from 'react'
import { useSupabase } from '@/app/components/Providers'
import { Bookmark } from '@/app/lib/types'
import toast from 'react-hot-toast'

export function useBookmarks() {
  const { supabase, user } = useSupabase()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setBookmarks([])
      setLoading(false)
      return
    }

    // Fetch initial bookmarks
    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        toast.error(error.message || 'Failed to load bookmarks')
        setLoading(false)
        return
      }

      setBookmarks(data || [])
      setLoading(false)
    }

    fetchBookmarks()

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('bookmarks_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
            toast.success('New bookmark added!')
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => 
              prev.filter((b) => b.id !== payload.old.id)
            )
            toast.success('Bookmark deleted')
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, supabase])

  const addBookmark = async (title: string, url: string) => {
    if (!user) {
      toast.error('Please login first')
      return false
    }

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        user_id: user.id,
      })
      .select('*')
      .single()

    if (error) {
      toast.error(error.message || 'Failed to add bookmark')
      return false
    }

    setBookmarks((prev) => [data as Bookmark, ...prev])
    // Remove duplicates by id
    setBookmarks((prev) => {
      const seen = new Set()
      return [data as Bookmark, ...prev].filter(b => {
        if (seen.has(b.id)) return false
        seen.add(b.id)
        return true
      })
    })
    return true
  }

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error(error.message || 'Failed to delete bookmark')
      return false
    }

    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
    return true
  }

  return {
    bookmarks,
    loading,
    addBookmark,
    deleteBookmark,
  }
}