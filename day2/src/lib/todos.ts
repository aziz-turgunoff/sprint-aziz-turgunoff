import { supabase } from './supabase'
import type { Todo } from './supabase'

export type CreateTodoInput = {
  title: string
  description?: string
  due_date?: string
  priority?: 'low' | 'med' | 'high'
}

export type UpdateTodoInput = Partial<CreateTodoInput> & {
  completed?: boolean
}

export type TodoFilters = {
  status?: 'all' | 'active' | 'completed'
  priority?: 'low' | 'med' | 'high' | 'all'
  sortBy?: 'due_date' | 'created_at'
  sortOrder?: 'asc' | 'desc'
}

export async function getTodos(filters: TodoFilters = {}): Promise<Todo[]> {
  let query = supabase
    .from('todos')
    .select('*')

  // Filter by status
  if (filters.status === 'active') {
    query = query.eq('completed', false)
  } else if (filters.status === 'completed') {
    query = query.eq('completed', true)
  }

  // Filter by priority
  if (filters.priority && filters.priority !== 'all') {
    query = query.eq('priority', filters.priority)
  }

  // Sort
  const sortBy = filters.sortBy || 'created_at'
  const sortOrder = filters.sortOrder || 'desc'
  query = query.order(sortBy, { ascending: sortOrder === 'asc', nullsFirst: false })

  const { data, error } = await query

  if (error) throw error
  return data || []
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('todos')
    .insert({
      user_id: user.id,
      title: input.title,
      description: input.description || null,
      due_date: input.due_date || null,
      priority: input.priority || 'med',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function toggleTodo(id: string, completed: boolean): Promise<Todo> {
  return updateTodo(id, { completed })
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) throw error
}
