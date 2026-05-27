import { useState, useEffect } from 'react'
import type { Todo } from '@/lib/supabase'
import { updateTodo } from '@/lib/todos'
import type { UpdateTodoInput } from '@/lib/todos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type TodoEditDialogProps = {
  todo: Todo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function TodoEditDialog({ todo, open, onOpenChange, onSuccess }: TodoEditDialogProps) {
  const [title, setTitle] = useState(todo?.title || '')
  const [description, setDescription] = useState(todo?.description || '')
  const [dueDate, setDueDate] = useState(todo?.due_date || '')
  const [priority, setPriority] = useState<'low' | 'med' | 'high'>(todo?.priority || 'med')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Update form when todo changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title)
      setDescription(todo.description || '')
      setDueDate(todo.due_date || '')
      setPriority(todo.priority)
    }
  }, [todo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo) return

    setError('')

    if (title.trim() === '') {
      setError('Title is required')
      return
    }

    setLoading(true)

    try {
      const input: UpdateTodoInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: dueDate || undefined,
        priority,
      }

      await updateTodo(todo.id, input)
      onSuccess()
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message || 'Failed to update todo')
    } finally {
      setLoading(false)
    }
  }

  if (!todo) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                rows={3}
                placeholder="Add more details..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-due-date">Due Date</Label>
                <Input
                  id="edit-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as any)} disabled={loading}>
                  <SelectTrigger id="edit-priority">
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

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
