'use client'

import { Bookmark } from '@/app/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { TrashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

type BookmarkListProps = {
  bookmarks: Bookmark[]
  loading: boolean
  deleteBookmark: (id: string) => Promise<boolean>
}

export function BookmarkList({ bookmarks, loading, deleteBookmark }: BookmarkListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex gap-2 loading-dots">
          <div />
          <div />
          <div />
        </div>
        <p className="mt-4 text-gray-400 animate-pulse">Loading your bookmarks...</p>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <svg
            className="relative w-24 h-24 text-gray-700 mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-2">No bookmarks yet</h3>
        <p className="text-gray-500">Click the + button to add your first bookmark</p>
      </motion.div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {[...new Map(bookmarks.map(b => [b.id, b])).values()].map((bookmark) => (
          <motion.div
            key={bookmark.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: { type: "spring", bounce: 0.3 },
            }}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
          >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:via-purple-600/5 group-hover:to-pink-600/10 transition-all duration-500" />
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer" />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {bookmark.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 truncate">
                    {bookmark.url}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    setDeletingId(bookmark.id)
                    await deleteBookmark(bookmark.id)
                    setDeletingId(null)
                  }}
                  disabled={deletingId === bookmark.id}
                  className="ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === bookmark.id ? (
                    <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <TrashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {formatDistanceToNow(new Date(bookmark.created_at), { addSuffix: true })}
                </span>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Visit</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}