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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { LogOut, Plus, Pencil, Trash2, CheckCircle2, Circle, Calendar, Filter, SortAsc } from 'lucide-react'

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
      case 'high': return 'destructive'
      case 'med': return 'default'
      case 'low': return 'secondary'
      default: return 'default'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority'
      case 'med': return 'Medium'
      case 'low': return 'Low Priority'
      default: return priority
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading your todos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My Todos
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                {user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={() => signOut()} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-3xl">{todos.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardDescription>Active</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                {activeCount}
                <Circle className="h-5 w-5 text-amber-500" />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                {completedCount}
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Action Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filters & Sorting</span>
              </div>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2 shadow-md">
                <Plus className="h-4 w-4" />
                New Todo
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-2">
                  <Circle className="h-3 w-3" />
                  Status
                </Label>
                <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as FilterStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tasks</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="completed">Completed Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-2">
                  <Filter className="h-3 w-3" />
                  Priority
                </Label>
                <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v as FilterPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="med">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium flex items-center gap-2">
                  <SortAsc className="h-3 w-3" />
                  Sort by
                </Label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Created Date</SelectItem>
                    <SelectItem value="due">Due Date</SelectItem>
                    <SelectItem value="priority">Priority Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredAndSortedTodos.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No todos found</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {filterStatus !== 'all' || filterPriority !== 'all' 
                    ? 'Try adjusting your filters to see more tasks.'
                    : 'Get started by creating your first todo!'}
                </p>
                {filterStatus === 'all' && filterPriority === 'all' && (
                  <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Todo
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedTodos.map(todo => (
              <Card
                key={todo.id}
                className={`transition-all hover:shadow-md ${
                  todo.completed ? 'opacity-60 bg-muted/30' : 'bg-white'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`text-lg font-semibold leading-tight ${
                              todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                            }`}
                          >
                            {todo.title}
                          </h3>
                          {todo.description && (
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                              {todo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(todo)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingTodo(todo)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getPriorityColor(todo.priority)} className="font-medium">
                          {getPriorityLabel(todo.priority)}
                        </Badge>
                        {todo.due_date && (
                          <Badge variant="outline" className="gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {new Date(todo.due_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Badge>
                        )}
                        {todo.completed && (
                          <Badge variant="secondary" className="gap-1.5">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Create Todo Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={createTodo}>
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Todo</DialogTitle>
              <DialogDescription>
                Add a new task to your list. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value.slice(0, 120))}
                  placeholder="What needs to be done?"
                  maxLength={120}
                  required
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {newTitle.length}/120 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Add more details about this task..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-sm font-medium">
                    Priority Level
                  </Label>
                  <Select value={newPriority} onValueChange={(v) => setNewPriority(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="med">Medium</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating || !newTitle.trim()} className="gap-2">
                {creating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Todo
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Todo Dialog */}
      <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={updateTodo}>
            <DialogHeader>
              <DialogTitle className="text-2xl">Edit Todo</DialogTitle>
              <DialogDescription>
                Update your task details below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-6">
              <div className="space-y-2">
                <Label htmlFor="editTitle" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="editTitle"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value.slice(0, 120))}
                  maxLength={120}
                  required
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {editTitle.length}/120 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editDescription" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editDueDate" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Due Date
                  </Label>
                  <Input
                    id="editDueDate"
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPriority" className="text-sm font-medium">
                    Priority Level
                  </Label>
                  <Select value={editPriority} onValueChange={(v) => setEditPriority(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="med">Medium</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setEditingTodo(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updating || !editTitle.trim()} className="gap-2">
                {updating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4" />
                    Update Todo
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingTodo} onOpenChange={() => setDeletingTodo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Delete this todo?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This action cannot be undone. This will permanently delete{' '}
              <span className="font-semibold text-foreground">"{deletingTodo?.title}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteTodo} className="bg-destructive hover:bg-destructive/90 gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
