'use client'

import { useSupabase } from './Providers'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function LogoutButton() {
  const { supabase } = useSupabase()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <motion.button
      onClick={handleLogout}
      className="group relative px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl hover:bg-gray-700/50 transition-all duration-300 overflow-hidden border border-gray-700"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-2">
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        <span>Logout</span>
      </div>
    </motion.button>
  )
}