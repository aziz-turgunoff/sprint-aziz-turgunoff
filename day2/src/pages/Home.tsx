import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 px-4">
      <div className="text-center space-y-6 max-w-md">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold">Welcome to Todos</h1>
        <p className="text-lg text-muted-foreground">
          A simple, client-focused todo app for freelancers managing multiple projects.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
