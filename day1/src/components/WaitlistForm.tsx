import { useState } from 'react'
import type { FormEvent } from 'react'
import { addToWaitlist } from '../lib/supabase'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await addToWaitlist({
        email,
        role,
        company: company || undefined,
      })

      setIsSuccess(true)
      setEmail('')
      setRole('')
      setCompany('')

      // Re-enable button after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      if (err instanceof Error && err.message === 'duplicate') {
        setError("You're already on the list!")
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="py-20 sm:py-32 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Join the waitlist
          </h2>
          <p className="text-xl text-gray-600">
            Be the first to know when we launch. No spam, just product updates.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2">
                Role *
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="">Select your role</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Engineering Lead">Engineering Lead</option>
                <option value="Founder/CEO">Founder/CEO</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Company (optional) */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                Company <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Success message */}
            {isSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="text-green-800 text-sm font-semibold">
                  You're on the list! We'll email you when we launch.
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Joined!
                </>
              ) : (
                'Join the waitlist'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
