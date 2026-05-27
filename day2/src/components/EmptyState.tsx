import { CheckCircle2 } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CheckCircle2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground mb-2">
        No todos yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        Get started by adding your first todo above. Stay organized and track your tasks.
      </p>
    </div>
  )
}
