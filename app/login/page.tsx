import { LoginButton } from '../components/LoginButton'
import { createServerSupabaseClient } from '../lib/supabase-server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Smart Bookmark App',
  description: 'Login to your Smart Bookmark account',
}

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo and title */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 animate-pulse-slow" />
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-3xl shadow-2xl">
                <svg
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold gradient-text mb-2">
              Smart Bookmarks
            </h1>
            <p className="text-xl text-gray-300">
              Your bookmarks, intelligently organized
            </p>
          </div>

          {/* Login card */}
          <div className="relative">
            {/* Animated border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 animate-pulse-slow" />
            
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800">
              <div className="space-y-6">
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-purple-400 text-2xl mb-1">✨</div>
                    <div className="text-sm text-gray-300">Real-time Sync</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-pink-400 text-2xl mb-1">🔒</div>
                    <div className="text-sm text-gray-300">Private & Secure</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-purple-400 text-2xl mb-1">⚡</div>
                    <div className="text-sm text-gray-300">Instant Access</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-pink-400 text-2xl mb-1">🎨</div>
                    <div className="text-sm text-gray-300">Beautiful UI</div>
                  </div>
                </div>

                {/* Login button */}
                <div className="flex justify-center">
                  <LoginButton />
                </div>

                {/* Footer text */}
                <p className="text-center text-sm text-gray-500 mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
          <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '3s' }} />
        </div>
      </div>
    </main>
  ) 
}