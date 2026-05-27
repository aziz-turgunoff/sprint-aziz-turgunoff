import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import type { Todo } from '@/lib/supabase'
import { getTodos } from '@/lib/todos'
import type { TodoFilters } from '@/lib/todos'
import { TodoForm } from '@/components/TodoForm'
import { TodoList } from '@/components/TodoList'
import { TodoEditDialog } from '@/components/TodoEditDialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { LogOut, ListTodo } from 'lucide-react'

export default function TodoApp() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    priority: 'all',
    sortBy: 'created_at',
    sortOrder: 'desc',
  })
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)

  const loadTodos = useCallback(async () => {
    try {
      const data = await getTodos(filters)
      setTodos(data)
    } catch (error) {
      console.error('Failed to load todos:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTodos()
  }, [loadTodos])

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setShowEditDialog(true)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            <h1 className="text-xl font-semibold">My Todos</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Add Todo Form */}
        <div className="mb-8">
          <TodoForm onSuccess={loadTodos} />
        </div>

        {/* Filters and Stats */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{activeCount}</span> active, <span className="font-medium">{completedCount}</span> completed
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <Select
                value={filters.status}
                onValueChange={(v) => setFilters({ ...filters, status: v as 'all' | 'active' | 'completed' })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Priority:</label>
              <Select
                value={filters.priority}
                onValueChange={(v) => setFilters({ ...filters, priority: v as 'low' | 'med' | 'high' | 'all' })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="med">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <Select
                value={filters.sortBy}
                onValueChange={(v) => setFilters({ ...filters, sortBy: v as 'due_date' | 'created_at' })}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Created</SelectItem>
                  <SelectItem value="due_date">Due Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading todos...</div>
        ) : (
          <TodoList todos={todos} onUpdate={loadTodos} onEdit={handleEdit} />
        )}
      </div>

      {/* Edit Dialog */}
      <TodoEditDialog
        key={editingTodo?.id || 'new'}
        todo={editingTodo}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={loadTodos}
      />
    </div>
  )
}
