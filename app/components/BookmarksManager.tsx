'use client'

import { BookmarkForm } from '@/app/components/BookmarkForm'
import { BookmarkList } from '@/app/components/BookmarkList'
import { useBookmarks } from '@/app/hooks/useBookmarks'

export function BookmarksManager() {
  const { bookmarks, loading, addBookmark, deleteBookmark } = useBookmarks()

  return (
    <>
      <BookmarkList
        bookmarks={bookmarks}
        loading={loading}
        deleteBookmark={deleteBookmark}
      />
      <BookmarkForm addBookmark={addBookmark} />
    </>
  )
}
