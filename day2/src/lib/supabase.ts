import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jlyszunqpsdgewnqkdtw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpseXN6dW5xcHNkZ2V3bnFrZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODc2MjAsImV4cCI6MjA5NTQ2MzYyMH0.ee6uhac4UAQGPWfhgDvOPewpdNx3v171PQTQZvbGTzY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
