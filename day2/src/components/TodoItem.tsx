import { useState } from 'react'
import type { Todo } from '@/lib/supabase'
import { updateTodo, deleteTodo, toggleTodo } from '@/lib/todos'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, Edit2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type TodoItemProps = {
  todo: Todo
  onUpdate: () => void
  onEdit: (todo: Todo) => void
}

export function TodoItem({ todo, onUpdate, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    try {
      await toggleTodo(todo.id, !todo.completed)
      onUpdate()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTitle = async () => {
    if (editTitle.trim() === '') {
      setEditTitle(todo.title)
      setIsEditing(false)
      return
    }

    if (editTitle === todo.title) {
      setIsEditing(false)
      return
    }

    setLoading(true)
    try {
      await updateTodo(todo.id, { title: editTitle })
      onUpdate()
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update todo:', error)
      setEditTitle(todo.title)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteTodo(todo.id)
      onUpdate()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    } finally {
      setLoading(false)
      setShowDeleteDialog(false)
    }
  }

  const priorityColors = {
    low: 'text-muted-foreground',
    med: 'text-blue-600',
    high: 'text-red-600',
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <>
      <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          disabled={loading}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTitle()
                if (e.key === 'Escape') {
                  setEditTitle(todo.title)
                  setIsEditing(false)
                }
              }}
              maxLength={120}
              autoFocus
              disabled={loading}
              className="h-8"
            />
          ) : (
            <h3
              className={cn(
                'font-medium cursor-pointer hover:text-primary transition-colors',
                todo.completed && 'line-through text-muted-foreground'
              )}
              onClick={() => !loading && setIsEditing(true)}
            >
              {todo.title}
            </h3>
          )}
          
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
          )}
          
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className={cn('font-medium', priorityColors[todo.priority])}>
              {todo.priority.toUpperCase()}
            </span>
            {todo.due_date && (
              <span>Due: {formatDate(todo.due_date)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(todo)}
            disabled={loading}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            disabled={loading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete todo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{todo.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
