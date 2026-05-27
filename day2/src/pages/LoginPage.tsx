import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const { signIn, signInWithMagicLink } = useAuth()
  const navigate = useNavigate()

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    setLoading(true)
    try {
      await signInWithMagicLink(email)
      setMagicLinkSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in to your todo app</p>

          {magicLinkSent ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
              <p className="font-medium mb-2">Check your email</p>
              <p className="text-sm">We sent a magic link to {email}. Click it to sign in.</p>
              <button
                onClick={() => {
                  setMagicLinkSent(false)
                  setUseMagicLink(false)
                  setEmail('')
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Back to sign in
              </button>
            </div>
          ) : (
            <form onSubmit={useMagicLink ? handleMagicLink : handlePasswordSignIn} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {!useMagicLink && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? 'Signing in...' : useMagicLink ? 'Send Magic Link' : 'Sign In'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setUseMagicLink(!useMagicLink)
                  setError('')
                  setPassword('')
                }}
                className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2"
              >
                {useMagicLink ? 'Use password instead' : 'Use magic link instead'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
