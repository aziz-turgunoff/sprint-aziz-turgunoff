import { createClient } from '@supabase/supabase-js'

export type AuthUser = {
  id: string
  email: string
}

export type Todo = {
  id: string
  user_id: string
  title: string
  description: string | null
  due_date: string | null
  priority: 'low' | 'med' | 'high'
  completed: boolean
  created_at: string
  updated_at: string
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
