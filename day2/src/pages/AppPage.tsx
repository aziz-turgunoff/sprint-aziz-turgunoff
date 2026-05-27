import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Plus, Trash2, Edit2, Check, LogOut, Filter } from 'lucide-react'

interface Todo {
  id: string
  title: string
  description: string
  due_date: string | null
  priority: 'low' | 'med' | 'high'
  completed: boolean
  created_at: string
  updated_at: string
}

export function AppPage() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'med' | 'high'>('med')
  const [editingId, setEditingId] = useState<string | null>(null)

  // Filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'med' | 'high'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'due' | 'priority'>('created')

  useEffect(() => {
    if (!session) {
      navigate('/login')
      return
    }
    fetchTodos()
  }, [session, navigate])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('todos')
          .update({
            title,
            description,
            due_date: dueDate || null,
            priority,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId)

        if (error) throw error
        setEditingId(null)
      } else {
        const { error } = await supabase.from('todos').insert([
          {
            title,
            description,
            due_date: dueDate || null,
            priority,
          },
        ])

        if (error) throw error
      }

      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('med')
      fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save todo')
    }
  }

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !completed, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const handleDeleteTodo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this todo?')) return

    try {
      const { error } = await supabase.from('todos').delete().eq('id', id)

      if (error) throw error
      fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  const handleEditTodo = (todo: Todo) => {
    setTitle(todo.title)
    setDescription(todo.description)
    setDueDate(todo.due_date || '')
    setPriority(todo.priority)
    setEditingId(todo.id)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out')
    }
  }

  // Filter and sort todos
  let filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'active' && todo.completed) return false
    if (filterStatus === 'completed' && !todo.completed) return false
    if (filterPriority !== 'all' && todo.priority !== filterPriority) return false
    return true
  })

  if (sortBy === 'due') {
    filteredTodos.sort((a, b) => {
      if (!a.due_date) return 1
      if (!b.due_date) return -1
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    })
  } else if (sortBy === 'priority') {
    const priorityOrder = { high: 0, med: 1, low: 2 }
    filteredTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
            <p className="text-sm text-gray-600">
              {activeCount} active, {completedCount} completed
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session?.user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
            <button
              onClick={() => setError('')}
              className="ml-4 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                maxLength={120}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/120</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'med' | 'high')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="med">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      setTitle('')
                      setDescription('')
                      setDueDate('')
                      setPriority('med')
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-4 h-4 text-gray-600" />

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'completed')}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as 'all' | 'low' | 'med' | 'high')}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="med">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'created' | 'due' | 'priority')}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="created">Created</option>
                <option value="due">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilterStatus('all')
                setFilterPriority('all')
                setSortBy('created')
              }}
              className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Todos List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading todos...</p>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 mb-2">No todos yet</p>
            <p className="text-sm text-gray-500">
              {todos.length === 0 ? 'Create your first todo to get started!' : 'No todos match your filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg border border-gray-200 p-4 flex items-start gap-4 hover:shadow-sm transition ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => handleToggleComplete(todo.id, todo.completed)}
                  className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                    todo.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {todo.due_date && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        Due: {new Date(todo.due_date).toLocaleDateString()}
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        todo.priority === 'high'
                          ? 'bg-red-50 text-red-700'
                          : todo.priority === 'med'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditTodo(todo)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
