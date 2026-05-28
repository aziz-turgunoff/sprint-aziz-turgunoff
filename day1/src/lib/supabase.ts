import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WaitlistEntry {
  email: string
  role: string
  company?: string
}

export async function addToWaitlist(data: WaitlistEntry) {
  const { error } = await supabase
    .from('day1_waitlist')
    .insert([data])
  
  if (error) {
    // Check for duplicate email (unique constraint violation)
    if (error.code === '23505') {
      throw new Error('duplicate')
    }
    throw error
  }
}
