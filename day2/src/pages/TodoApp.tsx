import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, type Todo } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Checkbox } from '../components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog'
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react'

type FilterStatus = 'all' | 'active' | 'completed'
type FilterPriority = 'all' | 'low' | 'med' | 'high'
type SortBy = 'created' | 'due' | 'priority'

export function TodoApp() {
  const { user, signOut } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all')
  const [sortBy, setSortBy] = useState<SortBy>('created')
  
  // Create todo form
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newDueDate, setNewDueDate] = useState('')
  const [newPriority, setNewPriority] = useState<'low' | 'med' | 'high'>('med')
  const [creating, setCreating] = useState(false)

  // Edit todo
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDueDate, setEditDueDate] = useState('')
  const [editPriority, setEditPriority] = useState<'low' | 'med' | 'high'>('med')
  const [updating, setUpdating] = useState(false)

  // Delete confirmation
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTodos(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || creating) return

    setCreating(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([
          {
            title: newTitle.trim(),
            description: newDescription.trim() || null,
            due_date: newDueDate || null,
            priority: newPriority,
            user_id: user?.id,
          },
        ])
        .select()
        .single()

      if (error) throw error

      // Optimistic UI update
      setTodos([data, ...todos])
      setNewTitle('')
      setNewDescription('')
      setNewDueDate('')
      setNewPriority('med')
      setShowCreateForm(false)
    } catch (error) {
      console.error('Error creating todo:', error)
      alert('Failed to create todo')
    } finally {
      setCreating(false)
    }
  }

  const toggleComplete = async (todo: Todo) => {
    // Optimistic UI update
    setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))

    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', todo.id)

      if (error) throw error
    } catch (error) {
      console.error('Error toggling todo:', error)
      // Revert on error
      setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: todo.completed } : t))
    }
  }

  const openEditDialog = (todo: Todo) => {
    setEditingTodo(todo)
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditDueDate(todo.due_date || '')
    setEditPriority(todo.priority)
  }

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTodo || !editTitle.trim() || updating) return

    setUpdating(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({
          title: editTitle.trim(),
          description: editDescription.trim() || null,
          due_date: editDueDate || null,
          priority: editPriority,
        })
        .eq('id', editingTodo.id)
        .select()
        .single()

      if (error) throw error

      setTodos(todos.map(t => t.id === editingTodo.id ? data : t))
      setEditingTodo(null)
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Failed to update todo')
    } finally {
      setUpdating(false)
    }
  }

  const deleteTodo = async () => {
    if (!deletingTodo) return

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', deletingTodo.id)

      if (error) throw error

      setTodos(todos.filter(t => t.id !== deletingTodo.id))
      setDeletingTodo(null)
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Failed to delete todo')
    }
  }

  const filteredAndSortedTodos = todos
    .filter(todo => {
      if (filterStatus === 'active' && todo.completed) return false
      if (filterStatus === 'completed' && !todo.completed) return false
      if (filterPriority !== 'all' && todo.priority !== filterPriority) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
      if (sortBy === 'due') {
        if (!a.due_date) return 1
        if (!b.due_date) return -1
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, med: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'med': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return ''
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Todos</h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={() => signOut()}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold">{activeCount}</span> active, {' '}
            <span className="font-semibold">{completedCount}</span> completed
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Todo
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs mb-1 block">Status</Label>
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs mb-1 block">Priority</Label>
              <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v as FilterPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="med">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label className="text-xs mb-1 block">Sort by</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created date</SelectItem>
                  <SelectItem value="due">Due date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredAndSortedTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500">No todos found. Create your first one!</p>
            </div>
          ) : (
            filteredAndSortedTodos.map(todo => (
              <div
                key={todo.id}
                className={`bg-white rounded-lg shadow p-4 flex items-start gap-4 ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleComplete(todo)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-medium ${
                        todo.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(todo)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingTodo(todo)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                    {todo.due_date && (
                      <span className="text-gray-500">
                        Due: {new Date(todo.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Create Todo Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent>
          <form onSubmit={createTodo}>
            <DialogHeader>
              <DialogTitle>Create new todo</DialogTitle>
              <DialogDescription>Add a new task to your list</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value.slice(0, 120))}
                  placeholder="What needs to be done?"
                  maxLength={120}
                  required
                />
                <p className="text-xs text-gray-500">{newTitle.length}/120</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add more details..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="med">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating || !newTitle.trim()}>
                {creating ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Todo Dialog */}
      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        <DialogContent>
          <form onSubmit={updateTodo}>
            <DialogHeader>
              <DialogTitle>Edit todo</DialogTitle>
              <DialogDescription>Update your task details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editTitle">Title *</Label>
                <Input
                  id="editTitle"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value.slice(0, 120))}
                  maxLength={120}
                  required
                />
                <p className="text-xs text-gray-500">{editTitle.length}/120</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDueDate">Due date</Label>
                <Input
                  id="editDueDate"
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPriority">Priority</Label>
                <Select value={editPriority} onValueChange={(v) => setEditPriority(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="med">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingTodo(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updating || !editTitle.trim()}>
                {updating ? 'Updating...' : 'Update'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingTodo} onOpenChange={() => setDeletingTodo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete todo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{deletingTodo?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTodo} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
