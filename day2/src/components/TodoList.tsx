import type { Todo } from '@/lib/supabase'
import { TodoItem } from './TodoItem'
import { EmptyState } from './EmptyState'

type TodoListProps = {
  todos: Todo[]
  onUpdate: () => void
}

export function TodoList({ todos, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
